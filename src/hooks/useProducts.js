import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';

/**
 * Custom Hook to fetch product data directly from Supabase
 * Handles loading states, error logging, static image path normalization, and schema mapping.
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsFromSupabase = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Query products table from Supabase ordered by creation date
      const { data, error: queryError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (queryError) {
        console.error('Supabase Query Error fetching products:', queryError);
        throw queryError;
      }

      if (data && data.length > 0) {
        console.log(`Successfully fetched ${data.length} product(s) from Supabase:`, data);
        
        // Normalize product data for UI components
        const normalizedProducts = data.map((item, index) => {
          // Process images array or single image URL string
          let rawImages = item.images || item.image_url || item.image;
          let imageList = [];

          if (Array.isArray(rawImages)) {
            imageList = rawImages
              .filter((img) => typeof img === 'string' && img.trim().length > 0)
              .map((img) =>
                img.trim().startsWith('/public/')
                  ? img.trim().replace('/public/', '/')
                  : img.trim()
              );
          } else if (typeof rawImages === 'string' && rawImages.trim()) {
            const cleanUrl = rawImages.trim().startsWith('/public/')
              ? rawImages.trim().replace('/public/', '/')
              : rawImages.trim();
            imageList = [cleanUrl];
          }

          if (imageList.length === 0) {
            imageList = [
              item.type === 'Bags' || item.title?.toLowerCase().includes('bag') || item.title?.toLowerCase().includes('tote')
                ? '/assets/tote_bag_modern.png'
                : '/assets/crocs_classic_clog.png'
            ];
          }

          // Process target_audience array or single string
          let targetAudience = item.target_audience;
          if (!Array.isArray(targetAudience)) {
            if (typeof targetAudience === 'string' && targetAudience.trim()) {
              targetAudience = targetAudience.split(',').map((s) => s.trim());
            } else {
              targetAudience = ['Women'];
            }
          }

          // Process categories array or single string
          let categories = item.categories;
          if (!Array.isArray(categories)) {
            if (typeof categories === 'string' && categories.trim()) {
              categories = categories.split(',').map((s) => s.trim());
            } else {
              categories = ['General'];
            }
          }

          // Process sizes array directly from database column
          let sizes = item.sizes;
          if (!Array.isArray(sizes) || sizes.length === 0) {
            sizes = item.type === 'Crocs' || item.title?.toLowerCase().includes('croc') || item.title?.toLowerCase().includes('clog')
              ? ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']
              : ['Standard'];
          }

          // Process colors array directly from database column
          let colors = item.colors;
          if (!Array.isArray(colors) || colors.length === 0) {
            colors = ['Default'];
          }

          // Process product variants object
          let variants = item.product_variants || item.variants;
          if (!variants || typeof variants !== 'object') {
            variants = {
              sizes: sizes,
              colors: colors
            };
          } else {
            if (!variants.sizes || !Array.isArray(variants.sizes)) {
              variants.sizes = sizes;
            }
            if (!variants.colors || !Array.isArray(variants.colors)) {
              variants.colors = colors;
            }
          }

          return {
            id: item.id || `sp-${index}`,
            title: item.title || item.name || 'Untitled Product',
            slug: item.slug || (item.title || item.name || 'product').toLowerCase().replace(/\s+/g, '-'),
            price: parseFloat(item.price) || 0,
            original_price: item.original_price != null && !isNaN(parseFloat(item.original_price))
              ? parseFloat(item.original_price)
              : null,
            type: item.type || (item.title?.toLowerCase().includes('bag') ? 'Bags' : 'Crocs'),
            target_audience: targetAudience,
            categories: categories,
            description: item.description || '',
            images: imageList,
            sizes: sizes,
            colors: colors,
            product_variants: variants,
            is_featured: Boolean(item.is_featured ?? item.featured ?? false),
            in_stock: Boolean(item.in_stock ?? true)
          };
        });

        setProducts(normalizedProducts);
      } else {
        console.warn('Supabase query returned 0 products. Using local fallback dataset.');
        setProducts(FALLBACK_PRODUCTS);
      }
    } catch (err) {
      console.error('Failed to load products from Supabase:', err.message || err);
      setError(err.message || 'An error occurred while fetching products from Supabase.');
      setProducts(FALLBACK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsFromSupabase();
  }, [fetchProductsFromSupabase]);

  return {
    products,
    loading,
    error,
    refetch: fetchProductsFromSupabase
  };
};
