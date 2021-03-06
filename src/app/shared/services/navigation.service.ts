import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  constructor() { }
  AdminDash: IMenuItem[] = [
    {
      name: "HOME",
      type: "icon",
      tooltip: "Home",
      icon: "home",
      state: "home"
    },
    {
      name: "PROFILE",
      type: "icon",
      tooltip: "Profile",
      icon: "person",
      state: "profile/overview"
    },
    {
      name: "TOUR",
      type: "icon",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      type: "separator",
      name: "Main Items"
    },
    {
      name: "DASHBOARD",
      type: "link",
      tooltip: "Dashboard",
      icon: "dashboard",
      state: "dashboard/Admin",

    },
    {
      name: "Manage Society",
      type: "dropDown",
      tooltip: "Manage Society",
      icon: "view_carousel",
      sub: [
        { name: "Group", state: "Group/List" },
      ]
    }
  ];
  GroupDash: IMenuItem[] = [
    {
      name: "HOME",
      type: "icon",
      tooltip: "Home",
      icon: "home",
      state: "home"
    },
    {
      name: "PROFILE",
      type: "icon",
      tooltip: "Profile",
      icon: "person",
      state: "profile/overview"
    },
    {
      name: "TOUR",
      type: "icon",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      type: "separator",
      name: "Main Items"
    },
    {
      name: "DASHBOARD",
      type: "link",
      tooltip: "Dashboard",
      icon: "dashboard",
      state: "dashboard/Group",

    },
    {
      name: "Manage Society",
      type: "dropDown",
      tooltip: "Manage Society",
      icon: "view_carousel",
      sub: [
        { name: "Society", state: "society/List" },
      ]
    }
  ];
  societyDash: IMenuItem[] = [
    {
      name: "HOME",
      type: "icon",
      tooltip: "Home",
      icon: "home",
      state: "home"
    },
    {
      name: "PROFILE",
      type: "icon",
      tooltip: "Profile",
      icon: "person",
      state: "profile/overview"
    },
    {
      name: "TOUR",
      type: "icon",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      type: "separator",
      name: "Main Items"
    },
    {
      name: "DASHBOARD",
      tooltip: "Dashboard",
      icon: "dashboard",

      type: "dropDown",

      sub: [
        { name: "Sodality Dash", state: "dashboard/Society" },
        { name: "facility Dashboard", state: "dashboard/facility" },
      ]
    },
    {
      name: "Manage Society",
      type: "dropDown",
      tooltip: "Manage Society",
      icon: "view_carousel",
      sub: [
        { name: "Society Info", state: "society/Update" },
        { name: "Tower", state: "Tower" },
        { name: "Unit Type", state: "UnitType/List" },

        { name: "Unit", state: "Unit" },
        { name: "Resident", state: "Resident" },
        { name: "Category", state: "Category" },
        { name: "Staff", state: "Staff" },

      ]
    },
    {
      name: "Complain Management",
      type: "dropDown",
      tooltip: "Manage Society",
      icon: "view_carousel",
      sub: [
        { name: "Complain", state: "SocietyComplain" },
        { name: "Notice", state: "Notice" },

      ]
    },
    // state: "state: "Report/DailyFlatWise" "
    {
      name: "Report Management",
      type: "dropDown",
      tooltip: "Manage Society",
      icon: "view_carousel",
      sub: [
        {
          name: "Coupon Related Report", type: "dropDown",
          icon: "view_carousel",
          sub: [
            { name: "Recharged Coupon", state: "Report/RechargedCoupen" },
            { name: "Coupon Request", state: "Report/CouponRequest" },
            { name: "Printed Coupon", state: "Report/PrintedCoupon" },
          ]

        },
        {
          name: "Analytic Report", type: "dropDown",
          icon: "view_carousel", sub: [
            { name: "Daily (Flat-Wise)", state: "Report/DailyFlatWise" },
            { name: "Daily (Date-Wise)", state: "Report/DailyDateWise" },
            { name: "Monthly (Flat-Wise)", state: "Report/MonthlyFlatWise" },
            { name: "Monthly (Month-Wise)", state: "Report/MonthlyDateWise" },
 
          ]
        },  {
          name: "Misc/Utility", type: "dropDown",
          icon: "view_carousel", sub: [
            { name: "Detailed DG Running", state: "Report/DetailedDgRunning" },
            { name: "Member Details(Tower-Wise)", state: "Report/MemberDetailsTowerWise" },
            { name: "Meter Status", state: "Report/MeterStatus" },
            { name: "Alarming Balance", state: "Report/AlarmingBalance" },

          ]},  {
            name: "Billing Reports", type: "dropDown",
            icon: "view_carousel", sub: [
              { name: "Monthly Bill", state: "Report/MonthlyBill" },
              { name: "Flat Debit/Credit", state: "Report/FlatDebitCredit" },

            ]}, {
              name: "CSV Reports", type: "dropDown",
              icon: "view_carousel", sub: [
                { name: "Daily Data", state: "Report/DailyData" },
                { name: "Monthly Data(Flat-Wise)", state: "Report/MonthlyDataFlatWise" },
                { name: "Monthly Data(Date-Wise)", state: "Report/MonthlyDataDateWise" },
                { name: "Coupon Recharge Data", state: "Report/CouponRecharge" },
                { name: "Coupon Generation Data", state: "Report/CouponGeneration" },]
        },
      ]
    }
  ];
  ResidentDash: IMenuItem[] = [
    {
      name: "HOME",
      type: "icon",
      tooltip: "Home",
      icon: "home",
      state: "home"
    },
    {
      name: "PROFILE",
      type: "icon",
      tooltip: "Profile",
      icon: "person",
      state: "profile/overview"
    },
    {
      name: "TOUR",
      type: "icon",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      type: "separator",
      name: "Main Items"
    },

    {
      name: "DASHBOARD",
      tooltip: "Dashboard",
      icon: "dashboard",

      type: "dropDown",

      sub: [
        { name: "Dashboard", state: "dashboard/Resident" },
        { name: "Home", state: "dashboard/myxenius" },
      ]
    },
    {
      name: "Manage Society",
      type: "dropDown",
      tooltip: "Manage Society",
      icon: "view_carousel",
      sub: [
        { name: "Complain", state: "Complain/List" },
      ]
    }
    // {
    //   name: "CHARTS",
    //   type: "link",
    //   tooltip: "Charts",
    //   icon: "show_chart",
    //   state: "charts"
    // },

  ];
  staffDash: IMenuItem[] = [
    {
      name: "HOME",
      type: "icon",
      tooltip: "Home",
      icon: "home",
      state: "home"
    },
    {
      name: "PROFILE",
      type: "icon",
      tooltip: "Profile",
      icon: "person",
      state: "profile/overview"
    },
    {
      name: "TOUR",
      type: "icon",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      type: "separator",
      name: "Main Items"
    },
    {
      name: "DASHBOARD",
      type: "link",
      tooltip: "Dashboard",
      icon: "dashboard",
      state: "dashboard/Staff",

    },
    {
      name: "Manage Society",
      type: "dropDown",
      tooltip: "Manage Society",
      icon: "view_carousel",
      sub: [
        { name: "Complain", state: "StaffComplain/List" },
      ]
    }
    // {
    //   name: "CHARTS",
    //   type: "link",
    //   tooltip: "Charts",
    //   icon: "show_chart",
    //   state: "charts"
    // },

  ];
  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = "Frequently Accessed";
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.AdminDash);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case "SuperAdmin":
        this.menuItems.next(this.AdminDash);
        break;
      case "Admin":
        this.menuItems.next(this.GroupDash);
        break;
      case "Society":
        this.menuItems.next(this.societyDash);
        break;
      case "Resident":
        this.menuItems.next(this.ResidentDash);
        break;
      case "Staff":
        this.menuItems.next(this.staffDash);
        break;
      default:
      // this.menuItems.next(this.AdminDash);
    }
  }
}
