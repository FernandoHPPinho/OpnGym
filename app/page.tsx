import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-blue-500">OpenGym</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Track your workouts, set goals, and achieve your fitness dreams. Your personal fitness companion.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/auth/sign-up"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
            <Link
              href="/auth/sign-in"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">Track Workouts</h3>
              <p className="mt-2 text-gray-300">
                Log your exercises, sets, and reps. Keep a detailed history of your progress.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">Set Goals</h3>
              <p className="mt-2 text-gray-300">
                Define your fitness goals and track your progress towards achieving them.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">View Progress</h3>
              <p className="mt-2 text-gray-300">
                Visualize your improvement over time with detailed statistics and charts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}