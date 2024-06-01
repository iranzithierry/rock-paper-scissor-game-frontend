import Link from 'next/link'
import React from 'react'
import { ServerIcon } from './icons'
import { ScissorsIcon, ScissorsSquareDashedBottom } from 'lucide-react'

export default function Logo() {
    return (
        <Link className="flex items-center justify-center" href="/lobby">
            <ScissorsSquareDashedBottom className="h-8 w-10" />
            <h1 className="text-3xl -mb-1.5 font-bold text-gray-900 dark:text-gray-100">Skizzy</h1>
        </Link>
    )
}
