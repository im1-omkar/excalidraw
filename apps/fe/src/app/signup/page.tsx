'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const Signup = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const result = await axios.post("http://localhost:3001/api/auth/signup", {
        email,
        userName,
        password
      })

      if (result.data.success === "true") {
        setMessage("Signup successful  Redirecting...")

        setTimeout(() => {
          router.push('/signin')
        }, 1200)

      } else {
        setError("Invalid credentials")
      }

    } catch (err) {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen bg-linear-to-br from-gray-900 to-black flex items-center justify-center text-white">

      <div className="w-full max-w-md p-8 rounded-2xl border border-gray-700 bg-white/5 backdrop-blur-md shadow-xl">

        <h1 className="text-4xl font-bold text-center mb-6">
          Create Account
        </h1>


        <div className="flex flex-col gap-4">


          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />


          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
            className="px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />


          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />


          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {message && (
            <p className="text-green-400 text-sm text-center">{message}</p>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className={`mt-2 py-3 rounded-xl font-semibold transition ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? "Creating account..." : "Sign Up "}
          </button>
          

        </div>
      </div>
    </div>
  )
}

export default Signup