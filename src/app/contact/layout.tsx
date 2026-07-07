import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Envíe volumen, corte y punto de entrega. Cotizamos el mismo día y confirmamos por WhatsApp. Respuesta comercial 24/7. Hidalgo, TX.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
