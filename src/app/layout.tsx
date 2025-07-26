import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProviderWrapper } from '@providers/session-provider';
import { ToastProvider } from '@providers/toast-provider';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Event Booking Platform',
  description: 'Discover and book tickets for amazing events in your area',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <div className="min-h-screen bg-gray-50">
            <main>{children}</main>
          </div>
          <ToastProvider />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
