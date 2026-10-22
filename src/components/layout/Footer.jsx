import site from '../../data/site.json'

export default function Footer() {
  return (
    <footer className="border-t border-line py-8 text-sm text-mut">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-6">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.role}</span>
      </div>
    </footer>
  )
}