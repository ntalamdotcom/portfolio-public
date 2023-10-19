import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

/**
 * @deprecated
 * @param {*} param0 
 * @returns 
 */

export default function NTalaMSnackBar(
    handleCloseSnackBar: any,
    openSnackBar: boolean,
    snackBarSeverity: string,
    errorModalMessage: string,
) {
    let sev: AlertColor
    if (snackBarSeverity == 'success'
        || snackBarSeverity == 'info'
        || snackBarSeverity == 'warning'
        || snackBarSeverity == 'error'
    ) {
        sev = snackBarSeverity
    } else {
        return
        // return <>ERROR SNACKBAR severity</>
    }

    return <>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={openSnackBar}
                onClose={handleCloseSnackBar}>
                <Alert
                    // className=""
                    onClose={handleCloseSnackBar}
                    severity={sev} sx={{ width: '100%' }}>
                    {errorModalMessage}
                </Alert>
            </Snackbar>

        </Stack>
    </>
}

/**

 * @param sev 
 * @param msg 
 */


export function NTalaMSnackBarX(
    { openSnackBar,
        // handleCloseSnackBar: (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void,
        snackBarSeverity,
        setOpenSnackBar,
        // snackBarSeverity: AlertColor,
        errorModalMessage, }
) {
    let sev: AlertColor
    if (snackBarSeverity == 'success'
        || snackBarSeverity == 'info'
        || snackBarSeverity == 'warning'
        || snackBarSeverity == 'error'
    ) {
        sev = snackBarSeverity
    } else {
        return <>ERROR SNACKBAR severity</>
    }
    const handleClose = (
        // @ts-ignore
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    return <>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    severity={sev}
                    sx={{ width: '100%' }}>
                    {errorModalMessage}
                </Alert>
            </Snackbar>
        </Stack>
    </>
}