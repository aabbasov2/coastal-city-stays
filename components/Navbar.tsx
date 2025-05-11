'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 h-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-4"
            >
              <Image
                src="/logo.png"
                alt="Coastal City Stays Logo"
                width={80}
                height={40}
                className="object-contain bg-white"
              />
              <span className="text-xl font-display font-bold text-sky-800 hover:text-sky-600 transition-colors">
                Coastal City Stays
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sky-800 hover:text-sky-600 transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-sky-600 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
              </Link>
            ))}
            <Link
              href="/properties"
              className="bg-sky-600 text-white px-6 py-2 rounded-full hover:bg-sky-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-base font-medium"
            >
              Properties
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-sky-800 hover:text-sky-600 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sky-800 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
              <Link
                href="/properties"
                className="block px-3 py-2 bg-sky-600 text-white rounded-full text-center hover:bg-sky-700 transition-all duration-300 hover:shadow-lg text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
