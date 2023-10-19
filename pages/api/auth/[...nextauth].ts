// import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { User } from "next-auth"
// import { userByPassNextAuth } from "../user-by-pass-username"
import CredentialsProvider from "next-auth/providers/credentials";
// import { signInUpWordpressServerSide } from "../w/after-google-signin";
import { userByPassNextAuth } from "./user-by-pass-username";
import { NextApiRequest, NextApiResponse } from "next/types";
import { signInUpWordpressServerSide } from "../w/after-google-signin";

export default async function auth(
  req: NextApiRequest, res: NextApiResponse) {

  if (req.query.nextauth && req.query.nextauth.includes("callback") && req.method === "POST") {
    console.log(
      "Handling callback request from my Identity Provider",
      req.body
    )
  }

  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider(
        {
          id: "googlewp",
          name: "googlewp",
          credentials: {
            // token: {},
            token: { label: "googleToken", type: "text", placeholder: "miser google" },
          },
          async authorize(credentials) {
            console.log('authorize??')
            if (credentials && credentials.token) {
              console.log("credentials google: ", credentials)
            } else {
              console.log('no credentials')
              return null
            }
            const tok = credentials.token
            console.log('toke: ', tok)
            const useResponse: any = await signInUpWordpressServerSide(tok)
              .then(async (data) => {
                const c = await data
                console.info('json CredentialsProvider: ', c)
                return c
              })
              .catch((error: Error) => {
                console.error("*****error signInUpWordpressServerSide: ", error.stack)
                console.error('???: ', JSON.stringify(error))
                return null
              })
            console.log("**************userResponse: ", useResponse)
            var user: User = {
              user_login: "",
              user_pass: "",
              user_nicename: "",
              user_email: "",
              user_url: "",
              user_registered: "",
              user_status: 0,
              display_name: "",
              error: "",
              ID: "",
              id: "",
              image: "",
            }
            if (useResponse == null || useResponse == undefined) {
              throw new Error("Error signing in. Contact support")
            } else {
              const success = useResponse.success
              if (success) {
                const wpUser = useResponse.wpUser
                user = wpUser.data
                user.id = wpUser.ID
                if (useResponse.userinfo) {
                  const userInfo = useResponse.userinfo
                  user.image = userInfo.picture
                }

                return user
              } else {
                throw new Error(useResponse.message)
              }
            }
          }
        }),

      CredentialsProvider(
        {
          id: "credentials",
          name: "credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          //
          // authorize: (credentials: Record<keyof C, string> |
          //  undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) => 
          //  Awaitable<User | null>;
          async authorize(credentials
            // , req
          ) {
            console.log('authorize??')
            // if(credentialsPost(req)){

            // }

            // Add logic here to look up the user from the credentials supplied
            // let user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
            if (!credentials) {
              console.log('no credentials')
              return null
            }
            const user: User = {
              user_login: "",
              user_pass: "",
              user_nicename: "",
              user_email: "",
              user_url: "",
              user_registered: "",
              user_status: 0,
              display_name: "",
              error: "",
              ID: "",
              id: ""
            }
            // const user = await 
            await userByPassNextAuth(credentials.username, credentials.password, user)
            // const user = await userByPassNextAuth(credentials.username, credentials.password)
            // let userR: UserNtalam = {
            //   id: "",
            //   user_login: "",
            //   user_pass: "",
            //   user_nicename: "",
            //   user_email: "",
            //   user_url: "",
            //   user_registered: "",
            //   user_status: 0,
            //   display_name: ""
            // }

            // console.log('credentials: ', credentials)
            // console.log('userR: ', userR)
            // console.log('user: ', user)

            if (user.error) {
              throw new Error(JSON.stringify(user.error))
            } else {
              user.id = user.ID
              // userR.user_login = user.user_login
              return user
            }
          }
        },)
    ],
    callbacks: {

      async jwt({ token, trigger, user, session,
        // account, profile, isNewUser 
      }) {
        // console.log("jwt: ", token)
        if (trigger === "update" && session.access_token) {
          console.log('jwt session updated: ', session)
          console.log('jwt token updated: ', token)
          token.access_token = session.access_token
        } else if (trigger === "update" && session.access_token == "") {
          console.log('jwt session updated: ', session)
          console.log('jwt token updated: ', token)
          token.access_token = undefined
        }
        if (user) {
          // console.log('jwt token: ', token)
          console.log('jwt user 2: ', user)
          console.log('jwt token 2: ', token)
          for (const key in user) {
            token[key] = user[key as keyof User]
          }
        } else {

        }
        // console.log('jwt token: ', token)
        return token
      },

      async signIn({
        // user, account, profile, email, credentials
      }) {
        console.log('YES')
        return true
      },
      // async signOut(params: any) {
      //   return true
      // },
      async redirect({
        // url, 
        baseUrl }) {

        return baseUrl
      },
      async session({ session,
        // user, 
        token
        // , profile 
      }) {

        if (token && session && session.user) {
          const us = session.user
          // console.log('session token: ', token)
          // console.log('session session: ', session)
          // console.log('session token: ', token)
          for (const key in token) {
            if (key == 'user_pass'
              || key == 'sub'
              || key == 'email'
              || key == 'image'
              || key == 'email' //old User type
              || key == 'ID'
            ) {
              continue
            }
            us[key] = token[key as keyof User]
          }
        }

        // console.log('session user: ', user)
        // console.log('session token: ', token)
        // console.log('session session: ', session)

        return session
      }
    },
    pages: {
      //  signIn: '/auth/signin',
      error: '/auth/error',
    },
  })
}