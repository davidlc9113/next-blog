import "./globals.css";
import GithubCat from "./ui/GithubCat";
import Analytics from "./lib/Analytics";

export const metadata = {
  title: "David Li's Blog",
  description: "Learning React and watching Netflix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <GithubCat />
        {children}
        { process.env.NODE_ENV === "production" && <Analytics /> }
      </body>
    </html>
  );
}
