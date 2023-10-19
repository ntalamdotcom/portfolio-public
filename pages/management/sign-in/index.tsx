import Head from 'next/head';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Container,
  Button,
  Link
} from '@mui/material';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import SidebarLayout from '@/layouts/SidebarLayout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useState } from 'react';
import signInFunction from '@/sign-in-function';
// import { useRouter } from 'next/router';
import NTalaMSnackBar from '@/ntalamSnackbar';
import { GetSessionParams, signIn, useSession } from 'next-auth/react';
import GoogleButtonPortfolio from '@/components/GoogleButtonPortfolio';
import nProgress from 'nprogress';
import { useRouter } from 'next/dist/client/router';
import SignOutButton from '@/layouts/SidebarLayout/Header/Userbox/SignOutButton';


export function SignIn(props: any) {
  // console.log("ThemeContext: ",ThemeContext)
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [isProcessing, setIsProcessing] = useState(false)

  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("info");

  const handleClickSnackBar = (sev: string, msg: string) => {
    setErrorModalMessage(msg)
    setSnackBarSeverity(sev)
    setOpenSnackBar(true);
  };
  const router = useRouter()
  const signInSuccessful = () => {
    handleClickSnackBar("info", "Sign In Successful. Redirecting...")
    // const NEXT_PUBLIC_AFTER_SIGN_IN_PAGE = "management/profile"
    const NEXT_PUBLIC_AFTER_SIGN_IN_PAGE = process.env.NEXT_PUBLIC_AFTER_SIGN_IN_PAGE
    if (!NEXT_PUBLIC_AFTER_SIGN_IN_PAGE) {
      console.log('afterSignInPage is: ', NEXT_PUBLIC_AFTER_SIGN_IN_PAGE)
      return <>missing after signin page</>
    }
    nProgress.start();
    router.push(NEXT_PUBLIC_AFTER_SIGN_IN_PAGE)
  }


  const onloginClick = async (event: { currentTarget: { form: any; }; }) => {

    const form = event.currentTarget.form
    if (!form.reportValidity()) {
      return
    }
    if (username == undefined) {
      handleClickSnackBar('error',
        "Please provide a username")
      return
    }
    setIsProcessing(true)

    signIn("credentials",
      {
        redirect: false,
        username, password,
        callbackUrl: process.env.NEXTAUTH_URL
      })
      .then((data) => {
        signInFunction(data, setIsProcessing,
          handleClickSnackBar,
          signInSuccessful)
      })
      .catch((error) => {
        setIsProcessing(false)
        console.log("*****error adminInitiateAuth: ", error)
        console.log(JSON.stringify(error))
        handleClickSnackBar("error",
          "Unknown Signin Error. Please Contact admin")
        //Some front logic here...
      })
  }

  const { data: session,
    // update 
  } = useSession()

  return (
    <>
      <Head >
        <title>Sign in</title>
      </Head>

      <PageTitleWrapper bgImage='shovel20.jpg'
      >
        <Typography variant="h3" component="h3" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="subtitle2">
          Some welcome message
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
              <form id="loginForm" method="post" action="/api/auth/signin">
                <Grid item xs={12} xl={12}>
                  <Card >
                    <CardHeader
                      title="Credentials" />
                    <Divider />
                    {!session &&
                      <>
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
                              sx={{ width: '100%' }}
                              className='loginTextfield'
                              id="read-only-input"
                              label={"Username"}
                              defaultValue={username}
                              InputProps={{
                                // readOnly: (isEditingState != true),
                              }}
                              required
                              onChange={(e) => {
                                setUsername(e.target.value)
                              }}
                            />
                            <TextField
                              sx={{
                                width: '100%',
                              }}
                              className='loginTextfield'
                              id="outlined-read-only-input"
                              label={"Password"}
                              defaultValue={password}
                              type='password'
                              required
                              InputProps={{
                                // readOnly: (isEditingState != true),
                              }}
                              onChange={(e) => {
                                setPassword(e.target.value)
                              }}
                            />
                          </Box>
                        </CardContent>
                        <CardContent>
                          <Button
                            startIcon={<LoginIcon></LoginIcon>}
                            variant="contained"
                            color="primary"
                            onClick={
                              onloginClick
                            }
                            disabled={isProcessing}
                          >
                            {/* {T5LanguageTranslation({ text: " */}
                            Sign In
                            {/* " })} */}
                          </Button>
                          <Link href='/management/sign-up'>
                            <Button
                              sx={{ margin: 1 }} variant="contained"
                              color="primary"
                              startIcon={<HowToRegIcon />}
                            // onClick={loginInFunction}
                            >
                              Register
                            </Button>
                          </Link>

                        </CardContent>
                        <GoogleButtonPortfolio key={"googleKey"}
                          setIsProcessing={setIsProcessing}
                          handleClickSnackBar={handleClickSnackBar}
                          signInSuccessful={signInSuccessful}
                          props={props}
                        />
                      </>
                    }
                    {session &&
                      <>
                        <CardContent>
                          <p>
                            You are already in. You can sign out anyway
                          </p>
                          <SignOutButton session={session}></SignOutButton>
                        </CardContent>
                      </>

                    }
                  </Card>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {
        NTalaMSnackBar(
          handleClickSnackBar
          , openSnackBar
          , snackBarSeverity
          , errorModalMessage
        )
      }
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