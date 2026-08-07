'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [catalogDropdown, setCatalogDropdown] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/watchlist', label: 'Watchlist' },
    { href: '/blog', label: 'Blog' },
  ];

  const catalogTypes = [
    { type: 'ANIME', label: 'Anime' },
    { type: 'KANIME', label: 'K-Anime' },
    { type: 'CANIME', label: 'C-Anime' },
    { type: 'JDRAMA', label: 'J-Drama' },
    { type: 'CDRAMA', label: 'C-Drama' },
    { type: 'KDRAMA', label: 'K-Drama' },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-2xl hover:text-purple-300 transition-colors">
              ZingAnime
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Catalog Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCatalogDropdown(!catalogDropdown)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname.startsWith('/catalog')
                    ? 'bg-purple-700 text-white'
                    : 'text-purple-100 hover:bg-purple-700 hover:text-white'
                }`}
              >
                Catalog ▼
              </button>
              {catalogDropdown && (
                <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                  <Link
                    href="/catalog"
                    className="block px-4 py-2 text-sm text-purple-900 dark:text-purple-100 hover:bg-purple-100 dark:hover:bg-purple-700"
                    onClick={() => setCatalogDropdown(false)}
                  >
                    All Content
                  </Link>
                  {catalogTypes.map((item) => (
                    <Link
                      key={item.type}
                      href={`/catalog?type=${item.type}`}
                      className="block px-4 py-2 text-sm text-purple-900 dark:text-purple-100 hover:bg-purple-100 dark:hover:bg-purple-700"
                      onClick={() => setCatalogDropdown(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-purple-700 text-white'
                    : 'text-purple-100 hover:bg-purple-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Auth Buttons */}
            {status === 'loading' ? (
              <div className="text-purple-200 text-sm">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <span className="text-purple-100 text-sm">{session.user.name || session.user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-purple-700 text-white hover:bg-purple-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-purple-100 hover:bg-purple-700 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-500 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}