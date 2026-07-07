import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products & Sourcing',
  description:
    'Res, cerdo y pollo de mayoreo de plantas USDA, CFIA y SIF en EE.UU., Canadá y Brasil. Cortes por especificación, fresco o congelado, cotización por WhatsApp.',
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
