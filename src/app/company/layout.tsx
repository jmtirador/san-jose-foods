import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Company',
  description:
    'Intermediario de comercio internacional de carnes en Hidalgo, TX. Orígenes en EE.UU., Canadá y Brasil, inspección USDA · CFIA · SIF, crédito respaldado por LLC y logística fronteriza.',
}

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children
}
