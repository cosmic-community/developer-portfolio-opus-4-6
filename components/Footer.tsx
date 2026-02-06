export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-800/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {currentYear} Developer Portfolio. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="/#projects"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="/#skills"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Skills
          </a>
          <a
            href="/#experience"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Experience
          </a>
          <a
            href="/contact"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}