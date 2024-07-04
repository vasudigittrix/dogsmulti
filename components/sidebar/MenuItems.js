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

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/admin",
    items: ""
  },
  {
    id: uniqueId(),
    title: "Bookings",
    icon: IconCalendar,
    href: "/admin/bookings",
    items: ""
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: IconShoppingBag,
    href: "/admin/orders",
    items: ""
  },
  
  {
    navlabel: true,
    subheader: "SERVICES",
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
        href: "/admin/bookings/boarding"
      },
      {
        id: uniqueId(),
        title: "Boarder List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/boarding/boarderlist",
      },
      {
        id: uniqueId(),
        title: "Facility List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/boarding/facilitylist",
      },
    ]
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
        href: "/admin/bookings/veterinary",
      },
      {
        id: uniqueId(),
        title: "veterinarian List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/veterinary/veterinarianlist",
      },
      {
        id: uniqueId(),
        title: "Category List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/veterinary/categorylist",
      },{
        id: uniqueId(),
        title: "Service List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/veterinary/servicelist",
      },
    ]
  },
  {
    id: uniqueId(),
    title: "Grooming",
    icon: IconCopy,
    href: "/admin/utilities/shadow",
    items:[
      {
        id: uniqueId(),
        title: "Grooming Bookings",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/grooming",
      },
      {
        id: uniqueId(),
        title: "Groomer List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/grooming/groomerlist",
      },
      {
        id: uniqueId(),
        title: "Category List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/grooming/categorylist",
      },
      {
        id: uniqueId(),
        title: "Service List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/grooming/servicelist",
      },
    ]
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
    title: "Walking",
    icon: IconCopy,
    href: "/admin/utilities/shadow",
    items:[
      {
        id: uniqueId(),
        title: "Walkings Bookings",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/walking",
      },
      {
        id: uniqueId(),
        title: "Walker List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/walking/walkerlist",
      },
      {
        id: uniqueId(),
        title: "Duration List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/walking/durationlist",
      },
    ]
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
        href: "/admin/bookings/daycare",
      },
      {
        id: uniqueId(),
        title: "Day Caretaker List",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/bookings/daycare/caretakerlist",
      },
    ]
  },
  {
    id: uniqueId(),
    title: "Pet Sitter List",
    icon: IconTypography,
    href: "/admin/petsitterlist",
    items: ""
  },
  {
    navlabel: true,
    subheader: "SHOP",
  },
  {
    id: uniqueId(),
    title: "Product",
    icon: IconShoppingCart,
    href: "/admin/utilities/shadow",
    items:[
      {
        id: uniqueId(),
        title: "All products",
        icon: IconCircleFilled,
        href: "/admin/products",
      },
      {
        id: uniqueId(),
        title: "Brand",
        icon: IconCircleFilled,
        href: "/admin/products/brands",
      },
      {
        id: uniqueId(),
        title: "Categories",
        icon: IconCircleFilled,
        href: "/admin/products/categories",
      },
      {
        id: uniqueId(),
        title: "Units",
        icon: IconCircleFilled,
        href: "/admin/products/units",
      },
      {
        id: uniqueId(),
        title: "Tags",
        icon: IconCircleFilled,
        href: "/admin/products/tags",
      },
    ]
  },
  {
    id: uniqueId(),
    title: "ProductVariations",
    icon: IconAdjustmentsHorizontal,
    href: "/admin/variations",
    items:[]
  },
  {
    id: uniqueId(),
    title: "Supply",
    icon: IconTruck,
    href: "/admin/utilities/shadow",
    items:[
      {
        id: uniqueId(),
        title: "Logistics",
        icon: IconCircleFilled,
        href: "/admin/logistics",
      },
      {
        id: uniqueId(),
        title: "Shipping zones",
        icon: IconCircleFilled,
        href: "/admin/logistic-zones",
      }
    ]
  },
  {
    navlabel: true,
    subheader: "USERS",
  },
  {
    id: uniqueId(),
    title: "Employees",
    icon: IconBriefcase,
    href: "/admin/employees",
    items: ""
  },
  {
    id: uniqueId(),
    title: "Employees Request List",
    icon: IconBriefcase,
    href: "/admin/employeerequest",
    items: ""
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
  {
    id: uniqueId(),
    title: "Order Reviews",
    icon: IconStar,
    href: "/admin/order-review",
    items: ""
  },
 
  {
    navlabel: true,
    subheader: "FINANCE",
  },
  {
    id: uniqueId(),
    title: "Tax",
    icon: IconReceiptTax,
    href: "/admin/tax",
    items: ""
  },
  {
    id: uniqueId(),
    title: "Employee Earnings",
    icon: IconWallet,
    href: "/admin/earnings",
    items: ""
  },
  {
    id: uniqueId(),
    title: "Employee Order Earnings",
    icon: IconWallet ,
    href: "/admin/order-earnings",
    items: ""
  },
  {
    navlabel: true,
    subheader: "REPORTS",
  },
  {
    id: uniqueId(),
    title: "Daily Bookings",
    icon: IconCalendar,
    href: "/admin/daily-booking-report",
    items: ""
  },
  {
    id: uniqueId(),
    title: "Overall Bookings",
    icon: IconCalendarMonth,
    href: "/admin/overall-booking-report",
    items: ""
  },
  {
    id: uniqueId(),
    title: "Employee Payouts",
    icon: IconCash ,
    href: "/admin/payouts",
    items: ""
  },
  {
    id: uniqueId(),
    title: "Order Report",
    icon: IconReport ,
    href: "/admin/order-report",
    items: ""
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Pet",
    icon: IconMoodHappy,
    href: "/admin/icons",
    items: [
      {
        id: uniqueId(),
        title: "Pet type",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/pet/pettype",
      },
      {
        id: uniqueId(),
        title: "Breed",
        icon: IconAdjustmentsHorizontal,
        href: "/admin/pet/breed",
      },
    ]
  },
  {
    id: uniqueId(),
    title: "Pages",
    icon: IconAperture,
    href: "/admin/pages",
    items: ""
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/admin/sample-page",
    items: ""
  },
];

export default Menuitems;
