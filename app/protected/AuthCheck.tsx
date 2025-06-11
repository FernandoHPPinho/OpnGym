'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '../services/auth'

export default function AuthCheck() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const sessionResult = await authService.getSession()
      if (!sessionResult.success || !sessionResult.data) {
        router.push('/auth/sign-in')
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    await authService.signOut()
    window.location.href = '/auth/sign-in'
  }

  if (loading) {
    return null
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-gray-600 hover:text-gray-900"
    >
      Sign Out
    </button>
  )
} 