
import { BotIcon } from "@/components/icons"
import { LinkButton } from "@/components/ui/link-button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[100dvh] gap-6">
            <BotIcon className="w-32 h-32 text-gray-500 dark:text-gray-400" />
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Oops! Page not found.</h1>
                <p className="text-gray-500 dark:text-gray-400">The page you&apos;re looking for doesn&apos;t exist.</p>
            </div>
            <LinkButton linkTo="/lobby">
                Go to Home
            </LinkButton>
        </div>
    )
}
