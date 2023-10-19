/**
 * Returns the credentials JSON
 * @returns 
 */
export function gettingKeyFile() {
    var keys = process.env.GOOGLE_API_KEYS_JSON
    if (keys == undefined) {
        const msg = "Keys not found"
        console.error(msg)
        // throw Error(msg)
    } else {
        const keyFile = JSON.parse(keys)
        return keyFile
    }
}
