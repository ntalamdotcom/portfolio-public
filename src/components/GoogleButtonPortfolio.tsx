import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { signIn } from "next-auth/react";
// import signInFunction from "../front-end/sign-in-function";
import jwt_decode from "jwt-decode";
import { Dispatch, SetStateAction } from "react";
import signInFunction from "@/sign-in-function";



export type GoogleButtonPortolioType = {
    props: any,
    setIsProcessing: Dispatch<SetStateAction<boolean>>
    handleClickSnackBar: any,
    signInSuccessful: any,
    // NEXTAUTH_URL:string
}

export default function GoogleButtonPortolio(
    props: GoogleButtonPortolioType
) {

    var missingPar = undefined

    if (!props.setIsProcessing) {
        return <>{"setIsProcessing is null"}</>
    }

    async function nextAuthGoogleSignIn(decoded: any) {
        try {
            const callbackUrl = props.props.NEXTAUTH_URL
            console.info("callbackUrl: ", callbackUrl)

            signIn("googlewp",
                {
                    redirect: false,
                    token: decoded,
                    callbackUrl: process.env.NEXT_PUBLIC_GOOGLE_SIGNIN_CALLBACKURL
                })
                .then((data) => {
                    signInFunction(data, props.setIsProcessing,
                        props.handleClickSnackBar,
                        props.signInSuccessful)
                })
                .catch((error) => {
                    props.setIsProcessing(false)
                    console.log("*****error adminInitiateAuth: ", error)
                    console.log(JSON.stringify(error))
                    props.handleClickSnackBar("error",
                        "Unknown Signin Error. Please Contact Termatrac")
                    //Some front logic here...
                })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (<div>
        <div>
            {missingPar}
            <GoogleLogin
                onSuccess={
                    async function (credentialResponse: CredentialResponse): Promise<void> {
                        if (credentialResponse && credentialResponse.credential) {

                            console.log("credentialResponse: ", credentialResponse);

                            var decoded = jwt_decode(credentialResponse.credential);

                            console.log("decoded credentials: ",
                                JSON.stringify(decoded));
                            // checkValidSignIn(credentialResponse);
                            nextAuthGoogleSignIn(credentialResponse.credential);
                            // authGoogleSignIn(credentialResponse);
                        }

                    }
                }
                // offline={true}
                // accessType='offline'

                onError={
                    function (): void {
                        console.log("Error happened");
                        return
                    }
                }
                // auto_select
                useOneTap
            />
        </div>
    </div>)
}