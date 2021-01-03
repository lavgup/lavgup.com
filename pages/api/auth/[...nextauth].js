import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
    providers: [
        Providers.Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        })
    ],

    jwt: {
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
    }
}

export default (req, res) => NextAuth(req, res, options);