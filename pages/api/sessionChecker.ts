
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function checkIfLogged(
    req: NextApiRequest,
    res: NextApiResponse,
    callback: {
        (req: NextApiRequest,
            res: NextApiResponse
            , session: Session | null): any;
    }) {

    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (session) {
            callback(req, res, session)
        } else {
            const msg = 'Unauthorized post. Come on!'
            res.statusMessage = msg
            res.status(401).send({ msg })
        }
        return
    }

    await getSession({ req })
        .then(async (response) => {
            // console.log("session value : ", response)
            const session = response

            if (!session) {
                const msg = 'Unauthorized. Come on!'
                res.statusMessage = msg
                res.status(401).send({ msg })
                return
            }
            callback(req, res, session)
        })
        .catch(async (error) => {
            const msg = "error no session"
            console.log(msg, error)
            res.status(400).json({
                msg
            })
        }
        );
}
