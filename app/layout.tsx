import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Provider Map',
  description: 'Interactive map for providers and clinics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}
