"use client"

import { Analytics } from "@vercel/analytics/next"

export default function ClientLayout({ children }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
