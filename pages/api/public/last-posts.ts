import { NextApiRequest, NextApiResponse } from "next/types";

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
            getMethod(req, res)
            // checkIfLogged(req, res, getMethod)
            break;
        default:
            res.status(400).send({ message: "what are you doing" })
            break;
    }

}

// function postMethod(
//     // req: NextApiRequest, res: NextApiResponse
//     ) {
//     throw new Error("Function not implemented.");
// }


// function putMethod(
//     // req: NextApiRequest, res: NextApiResponse
//     ) {
//     throw new Error("Function not implemented.");
// }


// function deleteMethod(
//     // req: NextApiRequest, res: NextApiResponse
//     ) {
//     throw new Error("Function not implemented.");
// }

function getMethod(
    // @ts-ignore
    req: NextApiRequest,
    res: NextApiResponse,
) {
    fetch('https://ntalam.com/wp-json/wp/v2/posts?per_page=5&order=desc&orderby=date')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // console.log("data last posts: ", data);
            var ret = refine(data)
            res.status(200)
                .json(ret)
        })
        .catch((error) => {
            console.error("error lastposts: ", error)
            res.status(500)
                .json(error)
        }
        );

}


function refine(data: any) {
    var ret = []
    data.forEach(ele => {
        var featuredmedia
        if (ele._links && ele._links["wp:featuredmedia"]) {
            featuredmedia = ele._links["wp:featuredmedia"]
            featuredmedia = featuredmedia[0].href
        }
        ret.push(
            {
                title: ele.title,
                link: ele.link,
                featuredmedia,
            }
        )
    });
    return ret
}