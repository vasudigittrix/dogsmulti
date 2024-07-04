import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import MultiNavItem from "./MultiNavItem";
const SidebarItems = ({ toggleMobileSidebar }) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <>
                {item.items.length > 0 ? (
                  <MultiNavItem
                    item={item}
                    key={item.id}
                    pathDirect={pathDirect}
                    onClick={toggleMobileSidebar}
                    items={item.items}
                  />
                ) : (
                  <NavItem
                    item={item}
                    key={item.id}
                    pathDirect={pathDirect}
                    onClick={toggleMobileSidebar}
                  />
                )}
              </>
            );
            
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
