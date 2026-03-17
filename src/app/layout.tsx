import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlipBook Cartoon Studio',
  description: 'Create long cartoon animations — the flipbook way',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FFFBF0]">
        {children}
      </body>
    </html>
  )
}
