/**
 * EmailJS client configuration.
 * The Public Key is designed for browser use. Never put a Private Key, Gmail
 * password, or App Password in this file or any frontend file.
 */
export const EMAILJS_CONFIG = Object.freeze({
  publicKey: 'a0huUIkxjcm77ZbA3',
  serviceId: 'service_5z62wte',
  templateId: 'template_hnu9luv'
});

export const CONTACT = Object.freeze({
  phoneDisplay: '+91 80819 15068',
  whatsappNumber: '918081915068',
  email: 'synegrodigisolutions@gmail.com',
  instagram: 'https://instagram.com/synegro.digital',
  // Preserve the requested pre-filled message for the business WhatsApp chat.
  whatsappMessage: 'i am intrested in your services and i want to know more !'
});

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
