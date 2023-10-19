import { NextApiRequest, NextApiResponse } from "next/types";

type Data = {
    name?: string,
    method?: string, // -<- optional
    error?: number,
    message?: string,
    meta_key?: string,
    meta_value?: string,
}

export default async function afterGoogleSignIn(
    req: NextApiRequest,
    res: NextApiResponse
    // res: NextApiResponse<Data>
) {
    const text = 'What are you trying to do?'
    if (req.method === 'POST') {
        await processing(req, res);
        // res.status(401).json({ msg: text })
    } else if (req.method === 'GET') {
        res.status(401).json({ message: text })
    } else if (req.method === 'GET') {
        res.status(401).json({ message: text })
    } else {
        res.status(401).json({ name: 'John Doe' })
    }
}
// async function processing(req: NextApiRequest,
//     res: NextApiResponse<Data>) {

//     await checkIfSession(req, res, createUser)
//     // const resp = sqlQuery(res, userId)
// }
export async function processing(req: NextApiRequest,
    res: NextApiResponse<Data>) {
    const query = req.query
    console.info("query: ", query)
    console.info("body: ", req.body)

    if (req.body && req.body.jti) {

    } else {
        res.statusMessage = "bad request"
        res.status(400)
    }

    const endpoint = process.env.MAIN_WEBSITE_API_PLUGIN + "create-google-user-post"

    var token = req.body.credential
    console.info("token afterGoogleSignIn: ", token)
    console.info("endpoint afterGoogleSignIn: ", endpoint)

    await signInUpWordpress(endpoint, token, res)
}

async function signInUpWordpress(
    endpoint: string, token: any
    , res: NextApiResponse<Data>) {
    await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id_token": token }),
        // body: JSON.stringify({ "id_token": token }),
    }).then(async (data) => {
        // console.debug('data: ', JSON.stringify(data))
        // console.debug('data: ', data)
        const c = await data.json()
        console.info('json signInUpWordpress: ', c)
        // if(c.code)
        res.status(200).json(c)
    })
        .catch((error: Error) => {
            console.log("*****error signInUpWordpress: ", error.stack)
            console.log(JSON.stringify(error))
            res.status(500).json({ message: "afterGoogleSignIn" })
        })
}
export async function signInUpWordpressServerSide(
    token: string) {

    const endpoint = process.env.MAIN_WEBSITE_API_PLUGIN + "create-google-user-post"

    console.info("----------")
    console.info("sending: ", token)
    console.info("endpoint: ", endpoint)
    console.info("----------")
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id_token": token }),
        // body: JSON.stringify({ "id_token": token }),
    }).then(async (data) => {
        // console.info('data: ', JSON.stringify(data))
        // console.info('success return?')
        const c = await data.json()
        console.info('json signInUpWordpressServerSide: ', c)
        return c
    })
        .catch((error: Error) => {
            console.log("*****error signInUpWordpressServerSide: ", error.stack)
            console.log('???: ', JSON.stringify(error))
            return null
        })
    return res
}


