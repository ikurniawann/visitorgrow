import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BNI GROW Visitor Dashboard',
  description: 'Weekly Meeting Visitor List Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}