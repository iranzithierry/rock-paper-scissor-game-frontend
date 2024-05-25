import Header from '@/components/lobby/header'

export default function DashboardLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <div className="h-screen  w-full">
      <div className="flex flex-col">
        <Header />
        <section className="flex flex-col flex-1 h-full dark:bg-muted">
          {children}
        </section>
      </div>
    </div >
  )
}
