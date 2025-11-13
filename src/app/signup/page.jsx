'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function page() {

  const [username, setUsername] = useState('')
  const router = useRouter()

  const [usernamemessages, setUsernameMessages] = useState('')
  const [usernameloading, setUsernameLoading] = useState(false)
  const [formdata, setFormData] = useState({
    username: username,
    email: "",
    password: "",

  })
  const [issubmitting, setIssubmitting] = useState(false)
  function changehandler(e) {
    const { name, value } = e.target
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  async function submithandler(e) {
    e.preventDefault()
    try {
      setIssubmitting(true)
      const response = await fetch('/api/signup', { method: 'POST', body: JSON.stringify(formdata) })
      const res = await response.json()



      if (
        res.message === "user created" ||
        res.message === "user created another time with new username"
      ) {
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        setUsernameMessages("")
        setUsername("")
        toast.success(res.message)
        setTimeout(() => {
          toast(res.emailresult)
        }, 2000);
        router.push(`/verify/${res.userId}`)
      }
      else{
      toast.error(res.message)
      }




    } catch (error) {
      toast.error("something went wrong try again")
    }
    finally {
      setIssubmitting(false)
    }
  }

  async function usernamecheck(name) {

    try {

      setUsernameLoading(true)
      const response = await fetch(`/api/check-username-unique?username=${name}`, { method: 'GET' })


      const res = await response.json()


      setUsernameMessages(res.message)



    } catch (error) {
      setUsernameMessages("error username checking")
    } finally {
      setUsernameLoading(false)
    }
  }
  useEffect(() => {
    if (username.trim() === "") {
      setUsernameMessages('')
      return;
    }
    const debounceusername = setTimeout(() => {
      setFormData((prev) => {
        return {
          ...prev,
          username: username
        }
      })
      usernamecheck(username)

    }, 500);

    return () => clearTimeout(debounceusername)

  }, [username])
  return (
    <>
      <button onClick={() => router.push("/")} className='"absolute  text-3xl mt-5 ml-2.5 font-extrabold tracking-tight text-gray-900 hover:text-indigo-600 transition cursor-pointer"'
        title='go to home'
      >
        TF
      </button>
      <form onSubmit={submithandler}>

        <div className="min-h-screen flex items-center justify-center bg-gray-50">

          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Create Your Mystery Account
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Join and start your anonymous adventure
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
                {usernameloading ? (
                  <p className="text-sm text-gray-500 mt-1">Checking...</p>
                ) : (
                  <p
                    className={`text-sm mt-1 ${usernamemessages === "username is already taken"
                        ? 'text-red-500'
                        : 'text-green-600'
                      }`}
                  >
                    {usernamemessages}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formdata.email}
                  onChange={changehandler}
                  name="email"
                  placeholder="Enter email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={formdata.password}
                  onChange={changehandler}
                  name="password"
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2">
                {issubmitting ? (
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
            </div>

            <p className="text-center text-gray-600 text-sm mt-5">
              Already have an account?{' '}
              <a
                href="/sign-in"
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </form>
    </>

  )
}

export default page