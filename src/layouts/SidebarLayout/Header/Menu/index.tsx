import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  styled
} from '@mui/material';
import { useRef, useState } from 'react';
import Link from 'src/components/Link';

import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);
const menuTabTree = [
  {
    label: "Home", link: "/",
  },
  {
    label: "Buttons", link: "/components/buttons",
  },
  {
    label: "Forms", link: "/components/forms",
  },
]

function createTopMenuTabs(
  // ref, handleClose, isOpen, handleOpen
) {
  var container = []
  var tabNew = <></>
  menuTabTree.forEach(element => {

    tabNew = <ListItem
      classes={{ root: 'MuiListItem-indicators' }}
      component={Link}
      href={element.link}
    >
      <ListItemText
        primaryTypographyProps={{ noWrap: true }}
        primary={element.label}
      />
    </ListItem>
    // }
    container.push(tabNew)
  });
  return container
}

function HeaderMenu() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <ListWrapper
        id="listWrapper"
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
            md: 'block',
            lg: 'block',
            xl: 'block',
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          {
            createTopMenuTabs()
          }
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  Others
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </List>
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem
          onClick={handleClose}
          sx={{ px: 3 }}
          component={Link}
          href="/">
          Overview
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ px: 3 }}
          component={Link}
          href="/components/tabs">
          Tabs
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ px: 3 }}
          component={Link}
          href="/components/cards">
          Cards
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ px: 3 }}
          component={Link}
          href="/components/modals">
          Modals
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;
