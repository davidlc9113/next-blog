import Footer from "./Footer";

export default function Container({ children }) {
  return (
    <div className="flex flex-col justify-center items-center
      font-sans min-h-svh p-4 mx-auto md:w-1/2">
      {children}
      <Footer />
    </div>
  );
} 