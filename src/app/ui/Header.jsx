import Contact from "./Contact"

export default function Header() {
  return (
    <header className="pb-4 text-center">
      <h1>David Li Blog</h1>
      <p className="text-base">Learning React and watching Netflix</p>
      <Contact />
    </header>
  )
}