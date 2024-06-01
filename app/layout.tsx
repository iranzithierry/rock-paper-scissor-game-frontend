import "@/styles/globals.css";
import { Toaster } from 'sonner'
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { displayFont, monoFont } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers"
import { Analytics } from "@vercel/analytics/react"
import { getSession } from '@/lib/sessions';
import { AuthProvider } from '@/contexts/auth-context'
import { getCookie } from '@/lib/cookies';
import COOKIE_NAMES from '@/constants/cookies-names';

export const metadata: Metadata = {
  title: { default: 'Skizzy', template: `%s - Skizzy` },
  icons: { icon: '/icon.svg' },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background font-sans antialiased", displayFont.variable, monoFont.variable)}>
        <Toaster richColors position="top-center" />
        <AuthProvider
          user={await getSession().then((session) => session?.user ?? null)}
          accessToken={await getCookie(COOKIE_NAMES.ACCESS_TOKEN)}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {process.env.MAINTENANCE == "true" ? (<div>Web Still Under Maintainence</div>) : children}
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
