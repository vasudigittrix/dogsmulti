import {
    IconAperture,
    IconCopy,
    IconLayoutDashboard,
    IconLogin,
    IconMoodHappy,
    IconTypography,
    IconCalendar,
    IconShoppingBag,
    IconAdjustmentsHorizontal,
    IconCircleFilled,
    IconShoppingCart,
    IconBriefcase,
    IconPaw,
    IconStar,
    IconReceiptTax,
    IconWallet,
    IconTruck,
    IconCalendarMonth,
    IconCash,
    IconReport
  } from "@tabler/icons-react";
  
  import { uniqueId } from "lodash";
  
  const GroomMenuitems = [
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
        id: uniqueId(),
        title: "Grooming",
        icon: IconCopy,
        href: "/employee/utilities/shadow",
        items:[
          {
            id: uniqueId(),
            title: "Grooming Bookings",
            icon: IconAdjustmentsHorizontal,
            href: "/employee/bookings/grooming",
          },
         {
            id: uniqueId(),
            title: "Service List",
            icon: IconAdjustmentsHorizontal,
            href: "/employee/bookings/grooming/servicelist",
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
  
  export default GroomMenuitems;
  