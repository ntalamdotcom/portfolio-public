export default function signInFunction(
    data:any,
    setIsProcessing: (arg0: boolean) => void,
    handleClickSnackBar: (arg0: string, arg1: string) => void,
    signInSuccessful: () => void
    ) {
    setIsProcessing(false)
    // console.log("****signin data: ", data)
    if (!data) {
        console.log("data is undefined")
        // return
    } else if (data.error) {
        console.log("error: ", data.error)
        handleClickSnackBar("error", data.error)
        // return
    } else if (data.status && data.status == 401) {
        console.log("wrong credentials")
        handleClickSnackBar("error", "Wrong user or Password")
        // return
    } else if (data.error == null) {
        signInSuccessful()
        // return
    } else if (data.error) {
        console.log("ERRROR: ", data.error)
        if (data.error == "User is disabled.") {
            handleClickSnackBar("error", "User is disabled.")
        } else if (data.error == "Missing required parameter USERNAME") {
            handleClickSnackBar("error", "Missing required parameter USERNAME")
        } else if (data.error == "UserNotFoundException") {
            handleClickSnackBar("error", "User Not Found")
        } else if (data.error == "NotAuthorizedException") {
            handleClickSnackBar("error", "Password Invalid")
        } else {
            handleClickSnackBar("error", data.error)
        }
    }
}