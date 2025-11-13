'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


const sendmessages = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()
  const id = params.id


  async function sendmessages() {
    setLoading(true)
    const response = await fetch('/api/sendmessages', { method: 'POST', body: JSON.stringify({ id, content }) })
    const res = await response.json()
    toast(res.message)
    setContent('')
    setLoading(false)

  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Public Profile Link</h1>

      <p className="text-gray-700 mb-3">
        Send Anonymous Message to <span className="font-semibold">@{id}</span>
      </p>

      <div className="w-full max-w-xl flex flex-col items-center">
        <input
          type="text"
          placeholder="Write your anonymous message here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-800"
        />
        {
          loading ?
            <button
              disabled
              className="bg-gray-400 text-white px-6 py-2 rounded-lg transition font-medium cursor-not-allowed"
            >
              Sending
            </button>
            :
            <button
              onClick={sendmessages}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Send It
            </button>
        }
        <div className="text-center mt-10">
          <p className="text-gray-600 text-lg mb-6">
            Create an account to send <span className="font-semibold text-indigo-600">anonymous</span> feedback messages.
          </p>

          <button
            onClick={() => router.push("/")}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200 font-semibold tracking-wide"
          >
            Create Account Now!
          </button>
        </div>

      </div>
    </div>

  )
}

export default sendmessages