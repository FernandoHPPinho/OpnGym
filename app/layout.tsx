import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OpenGym - Workout Tracker',
  description: 'Track your workouts and progress',
}

export default function RootLayout({
  children,
}: {
  children: any
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
} 