import "./globals.css";
import GithubCat from "./ui/GithubCat";
import Analytics from "./lib/Analytics";
import { BASE_URL, METADATA } from "./lib/constants";

const title = `${METADATA.title} - ${METADATA.description}`;
export const metadata = {
  title: title,
  description: METADATA.description,
  openGraph: {
    title: title,
    description: METADATA.description,
    type: "website",
    url: BASE_URL
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
