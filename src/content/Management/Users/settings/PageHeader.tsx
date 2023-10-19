import { Typography } from '@mui/material';

function PageHeader({ user }) {

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        User Settings
      </Typography>
      <Typography variant="subtitle2">
        {user.name || user.user_nicename}, this is user settings panel.
      </Typography>
    </>
  );
}

export default PageHeader;