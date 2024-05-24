import Intro from "@/components/home/intro";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
  <Header />
  <main className="flex-1 flex justify-center items-center">
    <Intro/>
  </main>
  <Footer />
</div>

  )
}
