/* eslint-disable import/no-anonymous-default-export */
//@ts-ignore
export default function () {
    return <>
        <h1>Portfolio (public version) wiki!</h1>
        <h2>Environment Variables configuration:</h2>
        <ul>
            <li><p><b>DB_HOST:</b> Part of a wordpress DB connection</p></li>
            <li><p><b>DB_USER:</b> Part of a wordpress DB connection</p></li>
            <li><p><b>DB_PASS:</b> Part of a wordpress DB connection</p></li>
            <li><p><b>DB_SCHEMA:</b> Part of a wordpress DB connection</p></li>
            <li><p><b>NEXTAUTH_URL:</b> Nextauth params</p></li>
            <li><p><b>NEXTAUTH_SECRET:</b>  Nextauth params</p></li>
            <li><p><b>NEXT_PUBLIC_AFTER_SIGN_IN_PAGE:</b></p></li>
            <li><p><b>CLOCKIFY_API_KEY:</b> not needed yet (TODO)</p></li>
            <li><p><b>NEXT_PUBLIC_SIGN_IN_PAGE:</b> After signed in where is the user redirected. just a "/" for the home address</p></li>
            <li><p><b>NEXT_PUBLIC_GOOGLE_CLIENT_ID:</b> To use the Google API</p></li>
            <li><p><b>NEXT_PUBLIC_WP_API_PLUGIN:</b> The wordpress website API. Example: https://somewebsite.com/wp-json/v1/. Ends with a "/"</p></li>
            <li><p><b>GITHUB_ACCESS_TOKEN:</b> details from the github account. To list projects and repositories</p></li>
            <li><p><b>GITHUB_USERNAME:</b> details from the github account. To list projects and repositories</p></li>
            <li><p><b>GITHUB_PASSWORD:</b> details from the github account. To list projects and repositories</p></li>
        </ul>
    </>
}