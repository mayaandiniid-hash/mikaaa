import type {Metadata, Viewport} from 'next';
import './globals.css'; // Global styles

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Earning Reward - Interactive Onboarding',
  description: 'Interactive educational learning and reward dashboard with glowing animated Gemini Star companion, personalized curriculum, and BOT WA rewards.',
  openGraph: {
    title: 'Earning Reward - Interactive Onboarding',
    description: 'Interactive educational learning and reward dashboard with glowing animated Gemini Star companion, personalized curriculum, and BOT WA rewards.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earning Reward - Interactive Onboarding',
    description: 'Interactive educational learning and reward dashboard with glowing animated Gemini Star companion, personalized curriculum, and BOT WA rewards.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
