import Header from "./ui/Header";
import Content from "./ui/Content";
import Footer from "./ui/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-4 font-mono">
      <Header />
      <Content />
      <Footer />
    </main>
  );
}
