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
  
  const TrainMenuitems = [
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
        title: "Training",
        icon: IconCopy,
        href: "/admin/utilities/shadow",
        items:[
          {
            id: uniqueId(),
            title: "Training Bookings",
            icon: IconAdjustmentsHorizontal,
            href: "/admin/bookings/training",
          },
          {
            id: uniqueId(),
            title: "Trainer List",
            icon: IconAdjustmentsHorizontal,
            href: "/admin/bookings/training/trainerlist",
          },
          {
            id: uniqueId(),
            title: "Training type list",
            icon: IconAdjustmentsHorizontal,
            href: "/admin/bookings/training/trainingtypelist",
          },
          {
            id: uniqueId(),
            title: "Duration list",
            icon: IconAdjustmentsHorizontal,
            href: "/admin/bookings/training/durationlist",
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
  
  export default TrainMenuitems;
  