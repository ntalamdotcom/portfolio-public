import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Home/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid, LinearProgress } from '@mui/material';
import Footer from '@/components/Footer';
import { styled } from '@mui/material/styles';

import ActivityTab from '@/content/Home/ActivityTab';
import { useSession } from 'next-auth/react';
import BlogTab from '@/content/Home/BlogTab';
// import React from 'react';
import { NTalaMSnackBarX } from '@/ntalamSnackbar';
const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function Home() {
  const [currentTab, setCurrentTab] = useState<string>('blog');

  const handleClickSnackBar = (sev: string, msg: string) => {
    setErrorModalMessage(msg)
    setSnackBarSeverity(sev)
    setOpenSnackBar(true);
  };
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("info");

  const tabs = [
    { value: 'blog', label: 'The Blog' },
    { value: 'activity', label: 'Activity' },
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  const { data: session } = useSession()
  if (session) {
    console.log("session: ", session)
  }

  const [listOfPosts, setListOfPosts] = useState<[]>(null);
  const [loadOnce, setLoadOnce] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
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
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {isLoading &&
              <LinearProgress />
            }
            {currentTab === 'blog'
              && <BlogTab
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                handleClickSnackBar={handleClickSnackBar}
                loadOnce={loadOnce} setLoadOnce={setLoadOnce}
                listOfPosts={listOfPosts} setListOfPosts={setListOfPosts} />}
            {currentTab === 'activity' && <ActivityTab />}
          </Grid>
        </Grid>
        <NTalaMSnackBarX
          openSnackBar={openSnackBar}
          snackBarSeverity={snackBarSeverity}
          setOpenSnackBar={setOpenSnackBar}
          errorModalMessage={errorModalMessage}

        />
      </Container>
      <Footer />

    </>
  );
}

Home.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default Home;