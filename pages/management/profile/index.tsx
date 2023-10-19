import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import Footer from '@/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from '@/content/Management/Users/details/ProfileCover';
import RecentActivity from '@/content/Management/Users/details/RecentActivity';
import Feed from '@/content/Management/Users/details/Feed';
import PopularTags from '@/content/Management/Users/details/PopularTags';
import MyCards from '@/content/Management/Users/details/MyCards';
import Addresses from '@/content/Management/Users/details/Addresses';
import { useSession } from 'next-auth/react';
import ProfileCoverNoUser from '@/content/Management/Users/details/ProfileCoverNoUser';

function ManagementUserProfile() {
  var user_aux = undefined
  // {
  // display_name: "Nallib Tala",
  // error: "",
  // exp: 1698480655,
  // iat: 1695888655,
  // id: '0',
  // jti: "64565fe1-92e4-4c09-9fce-59af3e118b4c",
  // user_email: "me@ntalam.com",
  // user_login: "ntalam",
  // user_nicename: "ntalam",
  // user_registered: "2020-02-24T21:56:06.000Z",
  // user_status: 0,
  // user_url: "http://ntalam.com",
  // savedCards: 0,
  // name: 'NO NAME',
  // coverImg: 'NO COVER',
  // avatar: 'NO AVATAR',
  // description: 'NO DESCRIPTION',
  // jobtitle: 'NO JOBTITLE',
  // location: 'NO LOCATION',
  // followers: 'NO FOLLOWERS',
  // image: 'NO FOLLOWERS',
  // };
  const { data: session } = useSession()
  if (session && session.user) {
    // console.log("ManagementUserProfile session: ",session)
    user_aux.name = session.user.user_login
    user_aux.id = session.user.id
    user_aux.image = session.user.image
  }

  return (
    <>
      <Head>
        <title>User Details - Management</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            {user_aux
              && <ProfileCover user={user_aux} />}
            {!user_aux
              && <ProfileCoverNoUser />}

          </Grid>
          {user_aux
            &&
            <>
              <Grid item xs={12} md={4}>
                <RecentActivity />
              </Grid>
              <Grid item xs={12} md={8}>
                <Feed />
              </Grid>
              <Grid item xs={12} md={4}>
                <PopularTags />
              </Grid>
              <Grid item xs={12} md={7}>
                <MyCards />
              </Grid>
              <Grid item xs={12} md={5}>
                <Addresses />
              </Grid>
            </>
          }
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;
