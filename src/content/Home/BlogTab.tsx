import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Button,
  CardActions,
  Link,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import Text from '@/components/Text';
import { useEffect } from 'react';
// import React from 'react';
import Carousel from 'react-material-ui-carousel';
import nProgress from 'nprogress';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};
`
);
function Item(props) {
  var style
  const item = props.item
  if (item.featuredmedia) {
    const featuredmedia = item.featuredmedia
    style = {
      backgroundImage: featuredmedia,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
  return (
    <Box px={6} pb={1}>
      <Paper
        style={style}
      >
        <Link href={JSON.stringify(props.item.link)}>
          <h2>{JSON.stringify(props.item.title.rendered)}</h2>
        </Link>

        <p>{props.item.description}</p>

        <p>{JSON.stringify(item.featuredmedia)}</p>

        <Button className="CheckButton">
          Check it out!
        </Button>
      </Paper>
    </Box>

  )
}
function BlogTab({
  isLoading,setIsLoading,
  handleClickSnackBar,
  loadOnce,
  setLoadOnce, listOfPosts,
  setListOfPosts }) {

  useEffect(() => {
    if (loadOnce == false) {
      nProgress.start();
      setIsLoading(true);
      fetch('/api/public/last-posts')
        .then(async (response) => {
          console.log("response BlogTab: ", response)
          nProgress.done()
          setIsLoading(false);
          if (response.ok) {
            const ret = await response.json()
            handleClickSnackBar("info", "blog loaded successfully")
            return ret
          } else {
            handleClickSnackBar("error", "Error Loading Blog")
          }

        })
        .then((data) => {
          // setPosts(data);
          console.log("BlogTab data: ", data);
          setListOfPosts(data);
        })
        .catch((error) => {
          nProgress.done()
          setIsLoading(false);
          console.error('Error:', error)
          handleClickSnackBar("error", "Error Loading Blog")
        });
      setLoadOnce(true)
    }
  }, [])
  console.log("listOfPosts: ", listOfPosts)
  return (
    <Card>
      <CardHeader
        // avatar={<Avatar src="/static/images/avatars/5.jpg" />}
        action={
          <IconButton color="primary">
            <MoreHorizTwoToneIcon fontSize="medium" />
          </IconButton>
        }
        titleTypographyProps={{ variant: 'h4' }}
        subheaderTypographyProps={{ variant: 'subtitle2' }}
        title="Latest Articles from ntalam.com"
        subheader={
          <>
            {/* Managing Partner,{' '}
            <Link
              href="@/content/Management/Users/settings/BlogTab#"
              underline="hover"
            >
              #software
            </Link>
            ,{' '}
            <Link
              href="@/content/Management/Users/settings/BlogTab#"
              underline="hover"
            >
              #managers
            </Link>
            , Google Inc. */}
          </>
        }
      />
      {/* {JSON.stringify()} */}
      <Carousel navButtonsAlwaysVisible >
        {listOfPosts != null &&
          listOfPosts.map((item, i) => <Item key={i} item={item} />)
        }
      </Carousel>
      {/* </Box> */}

      {/* <div>{JSON.stringify(listOfPosts)}</div> */}


      <Divider />
      <CardActionsWrapper
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Button startIcon={<ThumbUpAltTwoToneIcon />} variant="contained">
            Like
          </Button>
          <Button
            startIcon={<CommentTwoToneIcon />}
            variant="outlined"
            sx={{ mx: 2 }}
          >
            Comment
          </Button>
          <Button startIcon={<ShareTwoToneIcon />} variant="outlined">
            Share
          </Button>
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 } }}>
          <Typography variant="subtitle2" component="span">
            <Text color="black">
              <b>485</b>
            </Text>{' '}
            reactions •{' '}
            <Text color="black">
              <b>63</b>
            </Text>{' '}
            comments
          </Typography>
        </Box>
      </CardActionsWrapper>
    </Card >
  );
}

export default BlogTab;
