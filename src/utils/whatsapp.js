/**
 * WhatsApp Order Formatter & Checkout Logic
 * 
 * Target Business WhatsApp Number: +50252506084
 */

export const DEFAULT_WHATSAPP_NUMBER = "50252506084";
export const CURRENCY_SYMBOL = "$";

/**
 * Formats cart items array into a clean, human-readable WhatsApp order message.
 * 
 * @param {Array} cartItems - Array of items in cart [{ id, title, price, quantity, target_audience, selected_variant }]
 * @param {Object} customerDetails - { name, phone, address, notes }
 * @param {number} totalAmount - Calculated total order amount
 * @returns {string} Formatted plain-text string
 */
export const formatWhatsAppOrderMessage = (cartItems = [], customerDetails = {}, totalAmount = 0) => {
  if (!cartItems || cartItems.length === 0) {
    return "";
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  let message = `🛒 *NEW ORDER - CROCBAG STORE*\n`;
  message += `📅 Date: ${currentDate}\n`;
  message += `-------------------------------------------\n\n`;
  message += `📦 *ORDER ITEMS (${cartItems.reduce((acc, item) => acc + item.quantity, 0)}):*\n\n`;

  cartItems.forEach((item, index) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    const audienceTag = item.target_audience ? ` [${item.target_audience.join(", ")}]` : "";
    const variantInfo = item.selected_variant ? ` (${item.selected_variant})` : "";
    
    message += `${index + 1}. *${item.title}*${audienceTag}\n`;
    if (variantInfo) {
      message += `   🔹 Variant: ${variantInfo}\n`;
    }
    message += `   🔹 Qty: ${item.quantity} x ${CURRENCY_SYMBOL}${item.price.toFixed(2)} = *${CURRENCY_SYMBOL}${itemTotal}*\n\n`;
  });

  message += `-------------------------------------------\n`;
  message += `💰 *TOTAL ORDER AMOUNT: ${CURRENCY_SYMBOL}${totalAmount.toFixed(2)}*\n`;
  message += `-------------------------------------------\n\n`;

  // Customer Details Section
  message += `👤 *CUSTOMER DETAILS:*\n`;
  message += `• *Name:* ${customerDetails.name?.trim() || "Customer"}\n`;
  if (customerDetails.phone?.trim()) {
    message += `• *Contact Phone:* ${customerDetails.phone.trim()}\n`;
  }
  if (customerDetails.address?.trim()) {
    message += `• *Delivery Address:* ${customerDetails.address.trim()}\n`;
  }
  if (customerDetails.notes?.trim()) {
    message += `• *Order Notes:* ${customerDetails.notes.trim()}\n`;
  }

  message += `\n✨ *Thank you! Please confirm availability and payment details.*`;

  return message;
};

/**
 * Encodes order message and triggers redirect to WhatsApp API URL.
 * 
 * @param {Array} cartItems 
 * @param {Object} customerDetails 
 * @param {number} totalAmount 
 * @param {string} customPhoneNumber - Optional custom phone override
 */
export const sendOrderToWhatsApp = (cartItems, customerDetails = {}, totalAmount = 0, customPhoneNumber = "") => {
  // Strip non-digit characters from target phone number
  const rawNumber = customPhoneNumber || DEFAULT_WHATSAPP_NUMBER;
  const sanitizedNumber = rawNumber.replace(/\D/g, "");

  const rawMessage = formatWhatsAppOrderMessage(cartItems, customerDetails, totalAmount);
  const encodedMessage = encodeURIComponent(rawMessage);

  const whatsappUrl = `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;

  // Open in new window or redirect
  if (typeof window !== "undefined") {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return whatsappUrl;
};
