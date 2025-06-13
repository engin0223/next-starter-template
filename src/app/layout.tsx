/*
 * ----------------------------------------------------------------------
 * FILE: src/app/layout.tsx
 *
 * INSTRUCTIONS:
 * Replace the entire content of your existing 'src/app/layout.tsx'
 * file with the code below. This sets up the main HTML structure,
 * loads the 'Inter' font, and applies the base Tailwind CSS classes.
 * ----------------------------------------------------------------------
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KTÜ Harf Notu Hesaplayıcı',
  description: 'Ders notlarınızı girerek harf notunuzu KTÜ yönetmeliğine göre hesaplayın.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <main className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
