import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers: { GET, POST }, auth, signIn } = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [GitHub],
    callbacks: {},
})