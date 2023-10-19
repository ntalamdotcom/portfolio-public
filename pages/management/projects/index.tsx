import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Projects/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from '@/components/Footer';

import nProgress from 'nprogress';
import { useState, useEffect } from 'react';
import RecentRepositoriesTable from '@/content/Management/Projects/RecentRepositoriesTable';
import { useSession } from 'next-auth/react';


function ApplicationsProjects() {
  const { data: session } = useSession()
  const [recentRepositories, setRecentRepositories] = useState([]);
  const [loadOnce, setLoadOnce] = useState<boolean>(false);

  //@ts-ignore
  const [errorModalMessage, setErrorModalMessage] = useState("");
  //@ts-ignore
  const [openSnackBar, setOpenSnackBar] = useState(false);
//@ts-ignore
  const [snackBarSeverity, setSnackBarSeverity] = useState("info");

  // const [page, setPage] = useState<number>(0);
  // const [limit, setLimit] = useState<number>(5);
  //@ts-ignore
  const [totalProjects, setTotalProjects] = useState<number>(0);

  const handleClickSnackBar = (sev: string, msg: string) => {
    setErrorModalMessage(msg)
    setSnackBarSeverity(sev)
    setOpenSnackBar(true);
  };

  useEffect(() => {
    if (loadOnce == false) {
      nProgress.start();
      requestRepositoriesFromAPI();
      setLoadOnce(true)
    }
  }, [])
  // useEffect(() => {
  //   nProgress.start();
  //   requestRepositoriesFromAPI();
  //   // setLoadOnce(true)
  // }, [limit])

  // useEffect(() => {
  //   nProgress.start();
  //   requestRepositoriesFromAPI();
  //   // setLoadOnce(true)
  // }, [page])
  //TODO:fix pagination
  function requestRepositoriesFromAPI() {
    // var page_p = "&page=" + page
    // var limit_p = "&limit=" + limit
    // fetch('/api/github/list-repositories?' + page_p + limit_p)
    fetch('/api/github/list-repositories?')
      .then(async (response) => {
        console.log("response recentProjects: ", response)
        nProgress.done()
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
        console.log("requestRepositoriesFromAPI data: ", data);
        setRecentRepositories(data.repos);
        setTotalProjects(data.total);
      })
      .catch((error) => {
        nProgress.done()
        console.error('Error:', error)
        handleClickSnackBar("error", "Error Loading Blog")
      });
  }

  return (
    <>
      <Head>
        <title>Projects - Applications</title>
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
            <Card >
              <RecentRepositoriesTable
                session={session}
                repositories={recentRepositories}
              ></RecentRepositoriesTable>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ApplicationsProjects.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsProjects;