'use client'

import Link from 'next/link'
import { useAuth } from './contexts/AuthContext'

export default function LandingPage() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            {user ? (
              // Authenticated user content
              <>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Bem-vindo de volta ao OpnGym!
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Olá, {user.email}! Continue sua jornada fitness.
                </p>
                
                {/* Navigation Cards for authenticated users */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
                  {/* Meus Treinos Card */}
                  <Link href="/protected/workouts" className="group">
                    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Meus Treinos</h3>
                        <p className="text-gray-600">Visualize seu histórico de treinos e acompanhe seu progresso.</p>
                      </div>
                    </div>
                  </Link>

                  {/* Novo Treino Card */}
                  <Link href="/protected/workouts/new" className="group">
                    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Novo Treino</h3>
                        <p className="text-gray-600">Crie um novo treino personalizado com exercícios, séries e repetições.</p>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Sign out button */}
                <button
                  onClick={signOut}
                  className="text-gray-500 hover:text-gray-700 text-sm underline"
                >
                  Sair da conta
                </button>
              </>
            ) : (
              // Non-authenticated user content
              <>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Registre seus treinos e defina suas metas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/auth/sign-up" className="btn btn-primary text-lg px-8 py-4">
                    Se registre agora
                  </Link>
                  <Link href="/auth/sign-in" className="btn btn-primary text-lg px-8 py-4">
                    Entrar na sua conta
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}