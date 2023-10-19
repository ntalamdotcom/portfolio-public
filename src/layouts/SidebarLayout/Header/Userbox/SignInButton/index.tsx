
import {
  Button, Link,
} from '@mui/material';

import LockOpenTwoToneIcon from '@mui/icons-material/LockTwoTone';

export default function SignInButton({ session }) {
  if (session && session.user) {
    return <></>
  }

  return (
    <Link
      href="/management/sign-in"
      target="_self"
      // rel="noopener noreferrer"
    >
      <Button color="primary" fullWidth>
        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
        Sign In
      </Button>
    </Link>

  );
} 
