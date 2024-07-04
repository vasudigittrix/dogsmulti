import {
    IconCopy,
    IconLayoutDashboard,
    IconCalendar,
    IconAdjustmentsHorizontal,
    IconPaw,
    IconStar,
  } from "@tabler/icons-react";
  
  import { uniqueId } from "lodash";
  
  const WalkMenuitems = [
    {
      navlabel: true,
      subheader: "Home",
    },
  
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/employee",
      items: ""
    },
    
    {
      navlabel: true,
      subheader: "SERVICES",
    },
    {
        id: uniqueId(),
        title: "Walking",
        icon: IconCopy,
        href: "/admin/utilities/shadow",
        items:[
          {
            id: uniqueId(),
            title: "Walkings Bookings",
            icon: IconAdjustmentsHorizontal,
            href: "/employee/bookings/walking",
          },
        ]
      },
    {
      id: uniqueId(),
      title: "Owners And Pets",
      icon: IconPaw,
      href: "/admin/owners",
      items: ""
    },
    {
      id: uniqueId(),
      title: "Reviews",
      icon: IconStar,
      href: "/admin/employees-review",
      items: ""
    },
   
  ];
  
  export default WalkMenuitems;
  