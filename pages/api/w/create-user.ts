
import checkIfLogged from '@/api-session-validator/sessionChecker';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils'

type Data = {
    name?: string,
    method?: string, // -<- optional
    error?: number,
    msg?: string,
    meta_key?: string,
    meta_value?: string,
}

export default function userByPass(
    req: NextApiRequest,
    res: NextApiResponse<Data>
    // res: NextApiResponse<Data>
) {
    const text = 'What are you trying to do?'
    if (req.method === 'POST') {
        processing(req, res);
        // res.status(401).json({ msg: text })
    } else if (req.method === 'GET') {
        res.status(401).json({ msg: text })
    } else if (req.method === 'GET') {
        res.status(401).json({ msg: text })
    } else {
        res.status(401).json({ name: 'John Doe' })
    }
}
async function processing(req: NextApiRequest,
    res: NextApiResponse<Data>) {
    await checkIfLogged(req, res, createUser)
    // const resp = sqlQuery(res, userId)
}
export function createUser(req: NextApiRequest,
    res: NextApiResponse<Data>) {
    const query = req.query
    if (query["isGoogleSignIn"]) {
        console.info(query["isGoogleSignIn"])
    }
    res.status(200).json({ msg: "yes" })
}