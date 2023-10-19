import { Tabs, Tab, Card, Grid, Box, Divider } from "@mui/material";
// import tabs from "pages/components/tabs";
import Checklist from "./Checklist";
import Profile from "./Profile";
import Projects from "./Projects";
import TaskSearch from "./TaskSearch";
import TasksAnalytics from "./TasksAnalytics";
import TeamOverview from "./TeamOverview";
import Performance from '@/content/Dashboards/Tasks/Performance';


export default function PageContentWithSession(
    {
        tabs,
        handleTabsChange,
        currentTab,
        TabsContainerWrapper,
        theme,
        // Performance,
    }
) {

    return <>
        <TabsContainerWrapper>
            <Tabs
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
            </Tabs>
        </TabsContainerWrapper>
        <Card variant="outlined">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={0}
            >
                {currentTab === 'analytics' && (
                    <>
                        <Grid item xs={12}>
                            <Box p={4}>
                                <TeamOverview />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                            <Box
                                p={4}
                                sx={{
                                    background: `${theme.colors.alpha.black[5]}`
                                }}
                            >
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6} md={8}>
                                        <TasksAnalytics />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Performance />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Box p={4}>
                                <Projects />
                            </Box>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    background: `${theme.colors.alpha.black[5]}`
                                }}
                            >
                                <Grid container spacing={0}>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                            p={4}
                                            sx={{
                                                background: `${theme.colors.alpha.white[70]}`
                                            }}
                                        >
                                            <Checklist />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box p={4}>
                                            <Profile />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </>
                )}
                {currentTab === 'taskSearch' && (
                    <Grid item xs={12}>
                        <Box p={4}>
                            <TaskSearch />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Card>
    </>
}