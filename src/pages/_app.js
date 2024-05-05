/* eslint-disable max-lines-per-function */
import "@/styles/globals.css"
import Link from "next/link"
// Import Image from "next/image"
import { useState } from "react"

export default function App({ Component, pageProps }) {
  const [filter, setFilter] = useState("")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Link href="/">
            <img src="/boeing.png" alt="Logo" width="120" height="120" />
          </Link>
          <Link
            className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
            href="/"
          >
            PLACES
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
            href="/search/results"
          >
            SEARCH
          </Link>
          <input
            type="text"
            placeholder="Search places..."
            className="search-input px-2 py-1 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <nav>
          <Link
            className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
            href="/search/filters"
          >
            FILTERS{" "}
          </Link>
          <Link
            className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
            href="/addPlace"
          >
            ADD{" "}
          </Link>
        </nav>
      </header>
      <main className="max-w-xl mx-auto p-4">
        <Component {...pageProps} filter={filter} />
      </main>
    </div>
  )
}
