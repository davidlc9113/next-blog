import Footer from "./Footer";

export default function Container({ children }) {
  return (
    <main className="flex flex-col justify-center items-center min-h-svh p-4 font-sans">
      {children}
      <Footer />
    </main>
  );
} 