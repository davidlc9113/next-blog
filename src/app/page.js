import Header from "./ui/Header";
import Footer from "./ui/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-4 font-mono">
      <Header />
      <p className="flex-grow pb-4">Hello blog!</p>
      <Footer />
    </main>
  );
}
