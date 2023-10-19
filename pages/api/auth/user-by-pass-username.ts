import wpConnector from '@/database/wp-connector'
import { User } from 'next-auth/core/types'
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils'
// import  checkIfLogged  from '../../../src/api-session-validator/sessionChecker'
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
        res.status(401).json({ msg: text })
    } else if (req.method === 'GET') {
        res.status(401).json({ msg: text })
    } else if (req.method === 'GET') {
        res.status(401).json({ msg: text })
        // processing(req, res);
    } else {
        res.status(401).json({ name: 'John Doe' })
    }
}
// async function processing(req: NextApiRequest,
//     res: NextApiResponse<Data>) {

//     await checkIfSession(req, res, sqlQueryUserByPass)
//     // const resp = sqlQuery(res, userId)
// }
export function sqlQueryUserByPass(req: NextApiRequest,
    res: NextApiResponse<Data>) {
    // const userId: any = req.query["user-id"]
    const userName: any = req.query["user-name"]
    if (!userName) {
        res.status(401).json({ msg: 'undefined username... I dont know' })
        return
    }
    const userPass: any = req.query["user-pass"]
    if (!userPass) {
        res.status(401).json({ msg: 'undefined user-pass... multipaaaaaaass' })
        return
    }
    dbAccessUserByPass(userName, userPass, res)
    return true
}

export function dbAccessUserByPass(
    userName: string,
    userPass: string,
    res?: NextApiResponse<Data> | null
) {
    const connection = wpConnector()
    connection.connect();
    const q = 'SELECT * FROM wpntalam.wp_users where user_nicename = lower("'
        + userName + '");'
    // ' and user_pass="' + userPass + '";';
    console.log(q);
    connection.query(q,
        // 'SELECT 1 + 1 AS solution',
        function (error: any, results: { solution: any }[], 
            // fields: any
            ) {
            if (error) {
                // throw error;
                if (res) {
                    res.status(400).json(error)
                } else {
                    return null
                }

            } else {
                const obj = JSON.parse(JSON.stringify(results))
                const conditions = [
                    'ID',
                    'user_login',
                    'user_pass',
                    'user_nicename',
                    'user_email',
                    'user_url',
                    'user_registered',
                    // 'user_activation_key': '',
                    'user_status',
                    'display_name',
                ];
                let j: Record<string, any> = {};
                if (obj.length == 0 || obj.length > 1) {
                    if (res) {
                        res.status(401).json({ 'msg': 'error. no username with those credentials' })
                    } else {
                        return null
                    }
                    return
                }
                console.log(obj)
                const d = obj[0]
                for (const key in d) {
                    if (Object.prototype.hasOwnProperty.call(d, key)) {
                        // const element = d[key];
                        if (conditions.some(el => key.includes(el))) {
                            j[key] = d[key]
                        }
                    }
                }
                var hasher = require('wordpress-hash-node');
                var hash = hasher.HashPassword(userPass);
                console.log(hash)
                var checked = hasher.CheckPassword(userPass, j.user_pass); //This will return true;
                console.log(checked)
                if (checked) {
                    if (res) {
                        res.status(200).json(j)
                    } else {
                        return j
                    }

                } else {
                    if (res) {
                        res.status(401).json({ msg: 'wrong password or username... I dont know' })
                    } else {
                        return null
                    }
                }
            }
        });
    connection.end()
}
export async function userByPassNextAuth(
    userName: string,
    userPass: string,
    user: Record<string, any>
) {

    const connection = wpConnector()
    connection.connect();
    const q = 'SELECT * FROM wpntalam.wp_users where user_nicename = lower("'
        + userName + '");'
    console.log('query: ', q);

    return new Promise((resolve, reject) => {
        connection.query(q, function (err: any, result: string | any[]) {
            if (err) {
                console.log("database Error")
                reject(err);
            } else {
                console.log('result: ', result)
                const obj = JSON.parse(JSON.stringify(result))
                const conditions = [
                    'ID',
                    'user_login',
                    'user_pass',
                    'user_nicename',
                    'user_email',
                    'user_url',
                    'user_registered',
                    // 'user_activation_key': '',
                    'user_status',
                    'display_name',
                ];
                // console.log('2')
                // console.log('obj: ', obj)
                if (obj.length == 0 || obj.length > 1) {
                    user['error'] = 'No user with that name'
                    console.error('Result not found: ')
                    resolve(user)
                    return
                }

                const d = obj[0]
                for (const key in d) {
                    if (Object.prototype.hasOwnProperty.call(d, key)) {
                        // const element = d[key];
                        if (conditions.some(el => key.includes(el))) {
                            user[key as keyof User] = d[key]
                        }
                    }
                }
                var hasher = require('wordpress-hash-node');
                var hash = hasher.HashPassword(userPass);
                console.log('hash: ', hash)
                var checked = hasher.CheckPassword(userPass, user.user_pass); //This will return true;
                console.log('checked: ', checked)
                if (checked) {
                    console.log('valid password... returning user')
                } else {
                    user.error = 'Wrong Password'
                }
                resolve(user)
            }

        })
        console.log('disconnected')
        connection.end()
    });
}