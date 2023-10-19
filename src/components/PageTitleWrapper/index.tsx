import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, styled } from '@mui/material';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4)};
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
  bgImage: string;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children, bgImage }) => {
  return (
    <Box
      sx={{
        "h3.MuiTypography-root.MuiTypography-h3.MuiTypography-gutterBottom": {
          color: "black",
        },
        ".MuiPageTitle-wrapper .MuiTypography-root.MuiTypography-subtitle2": {
          color: "black",
          "text-shadow": " -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;",
          // text-stroke: 2px black;
        },

        '.MuiPageTitle-wrapper': {
          //TODO:put an image in the background
          backgroundImage: "url(/images/" + bgImage + ")",
          backgroundRepeatX: "no-repeat",
          backgroundPositionX: "right",
          backgroundColor: "white",
        }
      }}
    >
      <PageTitle className="MuiPageTitle-wrapper">
        <Container maxWidth="lg">{children}</Container>
      </PageTitle>
    </Box>

  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
