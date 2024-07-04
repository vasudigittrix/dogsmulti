import {
    IconCopy,
    IconLayoutDashboard,
    IconCalendar,
    IconAdjustmentsHorizontal,
    IconPaw,
    IconStar,
  } from "@tabler/icons-react";
  
  import { uniqueId } from "lodash";
  
  const DayCareMenuitems = [
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
        title: "DayCare",
        icon: IconCopy,
        href: "/admin/utilities/shadow",
        items:[
          {
            id: uniqueId(),
            title: "DayCare Bookings",
            icon: IconAdjustmentsHorizontal,
            href: "/employee/bookings/daycare",
          },
        ]
      },
    {
      id: uniqueId(),
      title: "Owners And Pets",
      icon: IconPaw,
      href: "/employee/owners",
      items: ""
    },
    {
      id: uniqueId(),
      title: "Reviews",
      icon: IconStar,
      href: "/employee/employees-review",
      items: ""
    },
   
  ];
  
  export default DayCareMenuitems;
  