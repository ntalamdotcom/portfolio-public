
import {
  Button,
} from '@mui/material';

import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { signOut } from 'next-auth/react';

function SignOutButton({ session }) {
  var user = {
    name: 'NO NAME',
    avatar: 'NO AVATAR',
    jobtitle: 'NO JOBTITLE',
  };
  // console.log("session:", session);
  // console.log("user:", session.user);
  if (session && session.user) {
    user = session.user
    console.log("user:", user);
  } else {
    return <></>
  }

  return (
    <Button variant='contained' color="primary" fullWidth
      onClick={() => {
        signOut({ redirect: false, callbackUrl: "/" })
      }}
    >
      <LockOpenTwoToneIcon sx={{ mr: 1 }} />
      Sign out
    </Button>
  );
}

export default SignOutButton;
