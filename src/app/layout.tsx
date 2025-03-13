import './globals.css'; // If you have global styles
import NavigationBar from '@/components/NavigationBar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'My Online Learning',
  description: 'A Next.js 13 demo for an online learning platform',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        <main style={{ margin: '1rem 2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
