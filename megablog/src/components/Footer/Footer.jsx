import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  const linkClass = "text-sm font-medium text-gray-400 transition hover:text-white"

  const columns = [
    {
      title: 'Company',
      links: ['Features', 'Pricing', 'Affiliate Program', 'Press Kit'],
    },
    {
      title: 'Support',
      links: ['Account', 'Help', 'Contact Us', 'Customer Support'],
    },
    {
      title: 'Legals',
      links: ['Terms & Conditions', 'Privacy Policy', 'Licensing'],
    },
  ]

  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-10 text-gray-300">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap gap-8">
          <div className="w-full md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <Logo width="100px" />
              <p className="mt-4 text-sm text-gray-500">
                &copy; 2026 DevUI. All rights reserved.
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="w-full md:w-1/4 lg:w-2/12">
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((label) => (
                  <li key={label}>
                    <Link to="/" className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer