import Contact from "@/app/ui/Contact"
import { METADATA } from "@/app/lib/constants"

export default function Header() {
  return (
    <header className="pb-4 text-center">
      <h1 className="mb-0">{METADATA.title}</h1>
      <p className="text-base">{METADATA.description}</p>
      <Contact />
    </header>
  )
}