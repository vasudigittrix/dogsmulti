import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
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

const Menuitemsemp = [
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
    title: "Bookings",
    icon: IconCalendar,
    href: "/employee/booking-table",
    items: ""
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

export default Menuitemsemp;
