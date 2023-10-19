import { NextApiRequest, NextApiResponse } from "next/types";
// import JiraApi from 'jira-client';
export default function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        // case "POST":
        //     postMethod(req, res)
        //     break;
        // case "PUT":
        //     putMethod(req, res)
        //     break;
        // case "DELETE":
        //     deleteMethod(req, res)
        //     break;
        case "GET":
            getMethod(req, 
                // res
                )
            // checkIfLogged(req, res, getMethod)
            break;
        default:
            res.status(400).send({ message: "what are you doing" })
            break;
    }

}

function getMethod(
    // @ts-ignore
    req: NextApiRequest,
    // res: NextApiResponse,
) {

    // // Initialize
    // var jira = new JiraApi({
    //     protocol: 'https',
    //     host: 'jira.somehost.com',
    //     username: 'username',
    //     password: 'password',
    //     apiVersion: '2',
    //     strictSSL: true
    // });

    // var jira = new JiraApi({
    //     protocol: 'https',
    //     host: 'jira.somehost.com',
    //     username: 'username',
    //     password: 'password',
    //     apiVersion: '2',
    //     strictSSL: true
    //   });

    // fetch('https://ntalam.com/wp-json/wp/v2/posts?per_page=5&order=desc&orderby=date')
    //     .then((response) => {
    //         return response.json()
    //     })
    //     .then((data) => {
    //         // console.log("data last posts: ", data);
    //         var ret = refine(data)
    //         res.status(200)
    //             .json(ret)
    //     })
    //     .catch((error) => {
    //         console.error("error lastposts: ", error)
    //         res.status(500)
    //             .json(error)
    //     }
    //     );

}