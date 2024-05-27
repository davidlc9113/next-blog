import "./globals.css";
import GithubCat from "./ui/GithubCat";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
