import {
  Typography,
  // Button, 
  Grid
} from '@mui/material';

function PageHeaderProjects() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Projects
        </Typography>
        <Typography variant="subtitle2">
          These are the current projects (repositories) I have been working on
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeaderProjects;
