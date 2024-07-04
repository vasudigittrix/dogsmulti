// mui imports
import React, { useState, useContext} from 'react';
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Button, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BoxShadow } from 'mdi-material-ui';

// type NavGroup = {
//   [x: string]: any;
//   id?: string;
//   navlabel?: boolean;
//   subheader?: string;
//   title?: string;
//   icon?: any;
//   href?: any;
//   onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
// };

// interface ItemType {
//   item: NavGroup;
//   onClick: (event: React.MouseEvent<HTMLElement>) => void;
//   hideMenu?: any;
//   level?: number | any;
//   pathDirect: string;
// }

const MultiNavItem = ({ item, level, pathDirect, onClick , items }) => {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "8px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
  }));
  const AccordionStyled = styled(Accordion)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      borderRadius: "8px",
      BoxShadow: 'none',
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
  }));

  return (
    <>

        <Accordion
          key={item.id}
          expanded={expanded === `panel-${item.id}`}
          onChange={handleAccordionChange(`panel-${item.id}`)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ListItemStyled>
            <ListItemButton>
              <ListItemIcon>
                {itemIcon}
              </ListItemIcon>
              <ListItemText>{item.title}</ListItemText>
            </ListItemButton>
            </ListItemStyled>
          </AccordionSummary>
          <AccordionDetails>
            <List component="div" disablePadding>
              {items.map((subItem) => (
                <ListItem key={subItem.id}>
                  <ListItemButton
                    component={Link}
                    href={subItem.href}
                    disabled={subItem.disabled}
                    selected={pathDirect === subItem.href}
                    target={subItem.external ? "_blank" : ""}
                    onClick={onClick}
                  >
                     <ListItemIcon>
                     <subItem.icon stroke={1.5} size="0.8rem" />
              </ListItemIcon>
                    <ListItemText>{subItem.title}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
    </>
  );
};

export default MultiNavItem;
