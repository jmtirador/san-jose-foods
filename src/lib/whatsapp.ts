// Single source of truth for the WhatsApp conversion path. Deals in this trade
// close on WhatsApp, so every "quote" action funnels here with a prefilled message.
export const WHATSAPP_NUMBER = '528180163885'

/** Build a wa.me deep link with a URL-encoded prefilled message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
