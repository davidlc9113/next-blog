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
        url: BASE_URL,
        images: [
          {
            url: `${BASE_URL}/favicon.ico`
          }
        ]
      }
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
