import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Storyboard KI ',
  description: 'Erstelle dir die Bilder eines Storyboards mit hilfe von DALL-E 2',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children} </body>
    </html>
  )
}
