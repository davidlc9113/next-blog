import Footer from "./Footer";

export default function Container({ children }) {
  return (
    <main className="flex flex-col min-h-screen p-4 font-mono">
      {children}
      <Footer />
    </main>
  );
} 