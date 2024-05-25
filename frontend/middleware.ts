import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession, updateAccessToken } from './lib/sessions';
import COOKIE_NAMES from './constants/cookies-names';
import { createGame } from './lib/game';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    if(process.env.MAINTENANCE != "true"){
        const session = await getSession()
        if (path.startsWith('/lobby') && !session?.user) {  
            return NextResponse.redirect(new URL(`/login?redirect_back=${path}`, request.nextUrl))
        }
        if(path.startsWith('/refresh')){
            const redirectTo = request.nextUrl.searchParams.get("redirect_back") 
            return NextResponse.redirect(new URL(redirectTo ?? path, request.nextUrl))
        }
        if(path == '/lobby/create'){
            const newGameId =  await createGame({ token: request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value })
            return NextResponse.redirect(new URL(`/lobby/game/${newGameId}`, request.nextUrl))
        }
        return await updateAccessToken(request)
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};