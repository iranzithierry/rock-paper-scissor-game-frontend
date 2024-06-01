import React from 'react'
import Link from 'next/link'
import { LinkButton } from '../ui/link-button'
import { Gamepad2Icon } from 'lucide-react'

export default function Intro() {
    return (
        <section className="w-full py-12">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Welcome  to Skizzy
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Play with your friends online pair and scissor game
                        </p>
                    </div>
                    <div className="space-x-4">
                        <LinkButton size={'lg'} linkTo='/lobby'>
                            Play now <Gamepad2Icon height={20} width={20} className='ml-1'/>
                        </LinkButton>
                        {/* <Link
                            className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                            href="#"
                        >
                            Learn More
                        </Link> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
