import NavClient from "./NavClient"

const links = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" },
]

export default function Nav() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded z-50">Skip to content</a>
      <NavClient links={links} />
    </>
  )
}