import "./globals.css";
import GithubCat from "./ui/GithubCat";

export const metadata = {
  title: "David Li Blog",
  description: "Learning React and watching Netflix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <GithubCat />
        {children}
      </body>
    </html>
  );
}
