import Head from 'next/head';
import { useState } from 'react';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Container
} from '@mui/material';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import SidebarLayout from '@/layouts/SidebarLayout';
import GoogleButtonPortfolio from '@/components/GoogleButtonPortfolio';
// import { CheckSignInPageServerSide } from '@/CheckSignInPage';
import { GetSessionParams } from 'next-auth/react';
import { useRouter } from 'next/router';

export function SignIn(props) {
  const router = useRouter()
  // @ts-ignore
  const [isProcessing, setIsProcessing] = useState(false)
  // const [isProcessing, setIsProcessing] = useState(false)
  // @ts-ignore
  const [errorModalMessage, setErrorModalMessage] = useState("");
  // @ts-ignore
  const [openSnackBar, setOpenSnackBar] = useState(false);
  // @ts-ignore
  const [snackBarSeverity, setSnackBarSeverity] = useState("info");

  const handleClickSnackBar = (sev: string, msg: string) => {
    setErrorModalMessage(msg)
    setSnackBarSeverity(sev)
    setOpenSnackBar(true);
  };

  const signInSuccessful = () => {
    console.log("info", "Sign In Successful. Redirecting...")
    const NEXT_PUBLIC_AFTER_SIGN_IN_PAGE = process.env.NEXT_PUBLIC_AFTER_SIGN_IN_PAGE
    if (NEXT_PUBLIC_AFTER_SIGN_IN_PAGE!) {
      console.log('afterSignInPage is: ', NEXT_PUBLIC_AFTER_SIGN_IN_PAGE)
      return <>missing after signin page</>
    }
    router.push(NEXT_PUBLIC_AFTER_SIGN_IN_PAGE)
  }

  return (
    <>
      <Head>
        <title>Forms - Components</title>
      </Head>
      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="subtitle2">
          Some welcome Sign up message
        </Typography>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Box display="flex" mb={3}>
              <Box>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader
                      title="Please fill up the form" />
                    <Divider />
                    <CardContent>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' }
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          required
                          id="outlined-required"
                          label="User Name"
                          defaultValue="Username"
                        />
                        <TextField
                          id="outlined-password-input"
                          label="Password"
                          type="password"
                          autoComplete="current-password"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                  <GoogleButtonPortfolio 
                  //key={"googleKey"}
                    setIsProcessing={setIsProcessing}
                    handleClickSnackBar={handleClickSnackBar}
                    signInSuccessful={signInSuccessful}
                    props={props}
                  // NEXTAUTH_URL={''} 
                  />
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

SignIn.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default SignIn;

export async function getServerSideProps(context: GetSessionParams | undefined) {

  var host = null;
  var protocol = null;

  if (context && context.req) {

    if (context.req.headers) {
      host = context.req.headers.host
      protocol = context.req.headers['x-forwarded-proto'] || 'http'
    }
  }

  const HOME_URL = `${protocol}://${host}`;
  const NEXTAUTH_URL = HOME_URL + "/api/auth/[...nextauth]"

  return {
    props: {
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
      host,
      protocol,
      HOME_URL,
      NEXTAUTH_URL,
    }
  }
}