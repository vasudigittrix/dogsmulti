import React, {useEffect, useState} from "react";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
// import NavItem from "./NavItem";
// import NavGroup from "./NavGroup";
import NavItem from "@/components/sidebar/NavItem";
import NavGroup from "@/components/sidebar/NavGroup";
import MultiNavItem from "@/components/sidebar/MultiNavItem";
import Menuitemsemp from "./MenuItems";
import { useSession } from 'next-auth/react';
import BoardMenuitems from "./BoardMenuItems";
import VetMenuitems from "./VetMenuItems";
import GroomMenuitems from "./GroomMenuItems";
import TrainMenuitems from "./TrainMenuItems";
import WalkMenuitems from "./WalkMenuItems";
import DayCareMenuitems from "./DaycareMenuItems";
const SidebarItems = ({ toggleMobileSidebar }) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const { data: session, status } = useSession();
  const [role, setRole]= useState(null);
  useEffect(()=>{
    console.log(session ,' esessop sidebar');
    setRole(session?.user.type);
    console.log(session?.user.type);
  },[session]);
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {role === 'boarder' && 
            BoardMenuitems.map((item) => {
              if (item.subheader) {
                return <NavGroup item={item} key={item.subheader} />;
    
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
          {role === 'veterinarian' && 
            VetMenuitems.map((item) => {
              if (item.subheader) {
                return <NavGroup item={item} key={item.subheader} />;
    
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
          {role === 'groomer' && 
            GroomMenuitems.map((item) => {
              if (item.subheader) {
                return <NavGroup item={item} key={item.subheader} />;
    
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
        {role === 'trainer' && 
            TrainMenuitems.map((item) => {
              if (item.subheader) {
                return <NavGroup item={item} key={item.subheader} />;
    
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
             {role === 'walker' && 
            WalkMenuitems.map((item) => {
              if (item.subheader) {
                return <NavGroup item={item} key={item.subheader} />;
    
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
            {role === 'daycaretaker' && 
            DayCareMenuitems.map((item) => {
              if (item.subheader) {
                return <NavGroup item={item} key={item.subheader} />;
    
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
