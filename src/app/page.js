'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import toast from "react-hot-toast";


export default function Home() {
  const { data } = useSession()


  async function signouthandler() {
    const result = await signOut({ redirect: false })
   
    if (result.url) {
      toast.success("logout sucessfully")
    }
  }

  return (
    <div>
      <div className="bg-gray-900 text-white flex items-center justify-between px-8 py-4 shadow-md">
        {/* Left: Brand */}
        <div className="text-2xl font-bold tracking-wide">
          True <span className="text-indigo-400">Feedback</span>
        </div>

        {/* Center: welcome */}
        <div className="text-center">
          <p className="text-sm text-gray-300">welcome back</p>
          <h1 className="text-lg font-medium capitalize">{data?.user.username ?? 'user'}</h1>
        </div>

        {/* Right: Login button */}
        <div>
          {data ?
            
              <button onClick={signouthandler} className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-150">
                Logout
              </button>
              
           

            :
            <Link href="/signup" className="ml-4">
              <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-150">
                Login
              </button>
            </Link>
          }
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center mt-24 px-6">
        <h1 className="text-4xl font-bold mb-4">
          Share Your <span className="text-indigo-500">True Feedback</span>
        </h1>
        <p className="text-gray-400 max-w-xl">
          Get honest, anonymous feedback from your friends and followers. Improve yourself with genuine responses — privately and securely.
        </p>
        <Link href="/dashboard">
          <button className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition">
            Go to Dashboard
          </button>
        </Link>
      </div>

    </div >
    
  );
}
