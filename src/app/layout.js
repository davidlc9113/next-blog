import "./globals.css";
import GithubCat from "./ui/GithubCat";
import { GoogleAnalytics } from '@next/third-parties/google'

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
      <GoogleAnalytics gaId={process.env.GA_ID} />
    </html>
  );
}
