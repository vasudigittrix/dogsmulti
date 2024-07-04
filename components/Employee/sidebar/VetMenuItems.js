import {
    IconCopy,
    IconLayoutDashboard,
    IconCalendar,
    IconAdjustmentsHorizontal,
    IconPaw,
    IconStar,
  } from "@tabler/icons-react";
  
  import { uniqueId } from "lodash";
  
  const VetMenuitems = [
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
      title: "Veterinary",
      icon: IconCopy,
      href: "/utilities/shadow",
      items:[
        {
          id: uniqueId(),
          title: "Veterinary Bookings",
          icon: IconAdjustmentsHorizontal,
          href: "/employee/bookings/veterinary",
        },
        {
          id: uniqueId(),
          title: "Service List",
          icon: IconAdjustmentsHorizontal,
          href: "/employee/bookings/veterinary/servicelist",
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
  
  export default VetMenuitems;
  