import { Logo, LogoutBtn, Container } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur shadow-md">
      <Container>
        <nav className="flex items-center py-3">
          <Link to="/" className="mr-4 flex items-center">
            <Logo width="70px" />
          </Link>

          {/* Desktop nav */}
          <ul className="ml-auto hidden items-center gap-1 md:flex">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="rounded-full px-5 py-2 text-sm font-medium text-gray-200
                      transition duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile menu toggle */}
          <button
            className="ml-auto rounded-md p-2 text-gray-200 hover:bg-gray-700 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile nav */}
        {menuOpen && (
          <ul className="flex flex-col gap-1 border-t border-gray-800 py-3 md:hidden">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug)
                      setMenuOpen(false)
                    }}
                    className="w-full rounded-md px-4 py-2 text-left text-sm font-medium text-gray-200
                      transition duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  )
}

export default Header