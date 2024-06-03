import "./globals.css";
import GithubCat from "./ui/GithubCat";
import Analytics from "./lib/Analytics";
import { BASE_URL, METADATA } from "./lib/constants";

export const metadata = {
  ...METADATA,
  ...{
    openGraph: {
      ...METADATA,
      ...{
        type: "website",
        url: BASE_URL
      }
    },
    twitter: {
      card: "summary_large_image"
    }
  }
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
