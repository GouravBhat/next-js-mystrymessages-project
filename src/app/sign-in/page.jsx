'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    async function Loginhandler(e) {
        e.preventDefault()
        setSubmitting(true)
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success('Logged in successfully')
            router.push('/dashboard')
        }
        setSubmitting(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Link
                href="/"
                className="absolute top-6 left-6 text-3xl font-extrabold tracking-tight text-gray-900 hover:text-indigo-600 transition"
                title="Go to Home"
            >
                TF
            </Link>

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                    Join Mystery Message
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Sign in to start your anonymous adventure
                </p>

                <form onSubmit={Loginhandler} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email/Username</label>
                        <input
                            type="text"
                            placeholder="email/username"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="pt-2">
                        {submitting ? (
                            <button
                                disabled
                                className="w-full bg-gray-400 text-white font-semibold py-3 rounded-lg cursor-not-allowed"
                            >
                                Loading...
                            </button>
                        ) : (
                            <button

                                className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition duration-200"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </form>

                <p className="text-center text-gray-600 text-sm mt-5">
                    not a member?{' '}
                    <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
