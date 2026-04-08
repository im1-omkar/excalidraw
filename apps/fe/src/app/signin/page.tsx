'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Signin = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string | null>('')
  const [password, setPassword] = useState<string | null>('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSignin = async () => {
    let result: any = null

    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      result = await axios.post("http://localhost:3001/api/auth/signin", {
        email: email,
        password: password
      },
      {
        withCredentials: true 
      }
    )

      if (result.data.successs == "true") {
        setMessage("Login successful Redirecting...")

        setTimeout(() => {
          router.push('/dashboard')
        }, 1200)

      } else {
        setError("Unsuccessful signin")
      }
    }
    catch (err) {
      setError("Error while sending request to backend")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen bg-linear-to-br from-gray-900 to-black flex items-center justify-center text-white">

      <div className="w-full max-w-md p-8 rounded-2xl border border-gray-700 bg-white/5 backdrop-blur-md shadow-xl">

        <h1 className="text-4xl font-bold text-center mb-6 tracking-tight">
          Welcome Back
        </h1>

        <div className="flex flex-col gap-4">

          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {message && (
            <p className="text-green-400 text-sm text-center">{message}</p>
          )}

          <button
            onClick={handleSignin}
            disabled={loading}
            className={`mt-2 py-3 rounded-xl font-semibold transition ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? "Signing in..." : "Sign In "}
          </button>

        </div>

        <p className="text-sm text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-500 hover:underline cursor-pointer">
              Sign up
            </span>
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Signin