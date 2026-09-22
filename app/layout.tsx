import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Earning Reward - Interactive Onboarding',
  description: 'Interactive educational game onboarding with 3D blue bird mascot and personalized curriculum for Earning Reward.',
  openGraph: {
    title: 'Earning Reward - Interactive Onboarding',
    description: 'Interactive educational game onboarding with 3D blue bird mascot and personalized curriculum for Earning Reward.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earning Reward - Interactive Onboarding',
    description: 'Interactive educational game onboarding with 3D blue bird mascot and personalized curriculum for Earning Reward.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
