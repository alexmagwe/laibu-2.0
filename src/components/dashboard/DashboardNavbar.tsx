'use client'
import React from 'react'
import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Search } from 'lucide-react'
import ThemeSwitch from '../ui/ThemeSwitch'
import UserAvatar from '../ui/UserProfile'

export default function DashboardNavbar() {
    const [menuState, setMenuState] = useState(false)

    // Replace javascript:void(0) path with your path
    const navigation = [
        { title: 'Home', path: '/' },
        // { title: 'Store', path: '/store' },
    ]
    return (
        <nav className=" border-b">
            <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex-1 flex items-center justify-between">
                    <div
                        className={`  w-full top-16 left-0 p-4 border-b  lg:static lg:block lg:border-none ${
                            menuState ? '' : 'hidden'
                        }`}
                    >
                        <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                            {navigation.map((item, idx) => (
                                <li key={idx} className=" hover:itext-gray-900">
                                    <a href={item.path}>{item.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
                        <form className="relative shadow-md flex items-center  border rounded-md ">
                            <span>
                                <Search
                                    className=" absolute right-2 top-50 -translate-y-[50%]"
                                    size={15}
                                />
                            </span>
                            <input
                                className="w-full p-2 rounded-md outline-none appearance-none placeholder-gray-500  sm:w-auto"
                                type="text"
                                placeholder="Search"
                            />
                        </form>
                        <ThemeSwitch />
                        <div className="flex items-center gap-x-4">
                            <UserAvatar />
                        </div>

                        <button
                            className="outline-none text-gray-400 block md:hidden"
                            onClick={() => setMenuState(!menuState)}
                        >
                            {menuState ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
