import Contact from "./Contact"

export default function Header() {
  return (
    <header className="pb-4 text-center">
      <h1 className="mb-0">{`David Li's Blog`}</h1>
      <p className="text-base">Learning React and watching Netflix</p>
      <Contact />
    </header>
  )
}