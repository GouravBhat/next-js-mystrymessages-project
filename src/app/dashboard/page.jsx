'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { useSession } from 'next-auth/react';
import { NextURL } from 'next/dist/server/web/next-url';
import { useParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';


const dashboard = () => {
    const { data } = useSession()




    const [acceptmessages, setAcceptmessages] = useState(true)
    const [allmessages, setAllMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [loaderacceptmessages, setLoadingacceptmessages] = useState(false)
    const [DeletingId, setsetDeletingId] = useState(null)
    const [sharelink,setShareLink]=useState('')



    async function acceptMessages() {
        const newvalue = !acceptmessages

        try {
            setLoadingacceptmessages(true)
            const response = await fetch('/api/acceptmessages', {
                method: 'POST', body: JSON.stringify({ acceptmessages: newvalue })
            })
            const res = await response.json()
            if (res.message === 'user updated sucessfully') {
                setAcceptmessages(newvalue)
                toast.success(res.message)

            }
            else {
                toast.error(res.message)
            }
        } catch (error) {
            alert(error)
        }
        finally {
            setLoadingacceptmessages(false)
        }



    }
    async function getmessages() {
        setLoading(true)

        const response = await fetch('/api/getmessages', { method: 'GET' })
        const res = await response.json()
       
        if (res.allmessage) {
            setAllMessages(res.allmessage)
        }
        else {
            toast(res.message)
            setAllMessages([])
        }
        setLoading(false)


    }
    async function deletehandler(id) {

        alert("are you sure want to delete this message")

        try {
            setsetDeletingId(id); // show loading only for this button

            const response = await fetch(`/api/delete/${id}`, { method: 'DELETE' });
            const res = await response.json();

            if (res.message === "message deleted sucessfully") {
                // Remove deleted message from state
                setAllMessages((prevMessages) => prevMessages.filter((m) => m._id !== id));
                toast.success(res.message);
            } else {
                toast.error(res.message || "Failed to delete message");
            }
        } catch (error) {
            
            toast.error("Something went wrong");
        } finally {
            setsetDeletingId(null); // stop loading state
        }

    }
    useEffect(() => {
    if (typeof window !== "undefined" && data?.user?._id) {
        const link = `${window.location.protocol}//${window.location.host}/sendmessages/${data.user._id}`;
        setShareLink(link);
    }
}, [data]);

    useEffect(() => {
        getmessages()
    }, [])



    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">User Dashboard</h1>

                    <p className="text-gray-600 mb-2">Copy your unique link</p>
                    <div className='flex items-center gap-2 mb-6'>
                        <input className="flex-1 border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 focus:outline-none "
                            type="text" readOnly value={sharelink} />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(sharelink)
                                
                                toast.success('Link copied!')
                            }}
                            className="bg-gray-900 text-white px-5 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-200"
                        >
                            Copy
                        </button>
                    </div>


                    <div className="flex items-center gap-3 mb-8">
                        <button
                            onClick={acceptMessages}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${acceptmessages ? 'bg-indigo-600' : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${acceptmessages ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                        <span className="text-gray-700 font-medium">
                            Accept Messages: {loaderacceptmessages ? "loading.." : acceptmessages ? 'On' : 'Off'}
                        </span>
                    </div>
                    <hr className="border-gray-300 mb-6" />
                    <button
                        onClick={getmessages}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition mb-3"
                        title="Refresh"
                    >
                        🔄
                    </button>
                    <hr className="border-gray-300 mb-6 w-xl" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">

                        {loading ? ("loading... ") : allmessages.length > 0 ? (
                            allmessages.map((m) => (
                                <div
                                    key={m._id}
                                    className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                                >
                                    <p className="text-gray-900 font-medium mb-2">{m.content}</p>
                                    <p className="text-sm text-gray-500 mb-3">
                                        {new Date(m.CreatedAt).toLocaleString()}
                                    </p>

                                    {
                                        DeletingId === m._id ?
                                            (<button disabled

                                                className="bg-red-200 text-white px-3 py-1 rounded-lg text-sm font-semibold cursor-not-allowed"
                                            >
                                                Loading ..
                                            </button>)
                                            :
                                            (<button onClick={() => deletehandler(m._id)}

                                                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold cursor-pointer"
                                            >
                                                Delete
                                            </button>)


                                    }
                                </div>
                            ))
                        )
                            : (
                                <p className="text-gray-500 text-center col-span-2">
                                    No messages found 😔
                                </p>
                            )}

                    </div>
                </div>
            </div>

        </>
    )
}

export default dashboard