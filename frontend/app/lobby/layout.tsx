import Header from '@/components/lobby/header'
import { getSession } from '@/lib/sessions';
import { AuthProvider } from '@/contexts/auth-context'
import { getCookie } from '@/lib/cookies';
import COOKIE_NAMES from '@/constants/cookies-names';

export default async function DashboardLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <div className="h-screen  w-full">
      <div className="flex flex-col">
        <AuthProvider
          user={await getSession().then((session) => session?.user ?? null)}
          accessToken={await getCookie(COOKIE_NAMES.ACCESS_TOKEN)}>
            <Header />
            <section className="flex flex-col flex-1 p-4 h-full dark:bg-muted">
              {children}
            </section>
        </AuthProvider>
      </div>
    </div >
  )
}
