'use client'
import { useParams, usePathname, useRouter } from 'next/navigation'

import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Verifyaccount = () => {
   const pathname = usePathname();
  const id = pathname.split("/").pop();
    const router=useRouter()
    let[otp,setOtp]=useState('')
    const params=useParams()
   const username=params.username
    async function verifyhandler() {
        const response=await fetch('/api/verify',{method:'POST',body:JSON.stringify({username,otp})})
        const res=await response.json()
        if (res.message==="user verified successfully") {
            setOtp('')
            router.push("/")
        }

        toast(res.message)
        
    }
    async function resendhandler(){
      const response=await fetch('/api/resendemail',{method:'POST',body:JSON.stringify({id:id})})
      const res=await response.json()
      toast(res.messages)
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Verify Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit code we sent to your email
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-center tracking-widest text-lg"
            maxLength={6}
            required
          />

          <button
            onClick={verifyhandler}
            className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Verify Account
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Didn’t receive the code?{' '}
            <a
              onClick={resendhandler}
              className="text-indigo-600 font-medium hover:underline"
            >
              Resend OTP
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Verifyaccount