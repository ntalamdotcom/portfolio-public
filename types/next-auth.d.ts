import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    export interface Session {
        user?: User;
        // user?: Record<string, any>;
        expires: ISODateString;
        // user: {
        //     user_login: string,
        //     user_pass: string,
        //     user_nicename: string,
        //     user_email: string,
        //     user_url: string,
        //     user_registered: string,
        //     user_status: number,
        //     display_name: string,
        //     error: string,
        //     ID: string,
        //     id: string,
        // }
    }
    export interface User {

        user_login: string,
        user_pass: string,
        user_nicename: string,
        user_email: string,
        user_url: string,
        user_registered: string,
        user_status: number,
        display_name: string,
        error: string,
        ID: string,
        id: string,

    }

}