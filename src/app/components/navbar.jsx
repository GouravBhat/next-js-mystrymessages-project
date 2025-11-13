'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
    const { data } = useSession()
    
    const router=useRouter()

    async function signouthandler() {
        const result = await signOut({ redirect: false })
       
        if (result.url) {
            toast.success("logout sucessfully")
            router.push("/")
        }
    }


    return (
        <div className="bg-gray-900 text-white flex items-center justify-between px-8 py-4 shadow-md">
  {/* Left: Brand Name */}
  <Link href={"/"}>
  <h1 className="text-2xl font-bold tracking-wide">
    True <span className="text-indigo-400">Feedback</span>
  </h1>
  </Link>

  {/* Center: Welcome message */}
  <p className="text-lg font-medium">
    Welcome,&nbsp;
    <span className="capitalize">{data?.user?.username}</span>
  </p>

  {/* Right: Logout button */}
  
  <button
    onClick={signouthandler}
    className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
  >
    Logout
  </button>
</div>

    )
}

export default Navbar