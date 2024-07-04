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
  
  const BoardMenuitems = [
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
        title: "Boarding",
        icon: IconTypography,
        href: "",
        items:[
          {
            id: uniqueId(),
            title: "Boarding Bookings",
            icon: IconAdjustmentsHorizontal,
            href: "/employee/bookings/boarding"
          }
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
  
  export default BoardMenuitems;