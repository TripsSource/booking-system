export const notificationBoxData = [
  { className: "primary", title: "Delivery processing", time: "10 min." },
  { className: "success", title: "Order Complete", time: "1 hr" },
  { className: "info", title: "Tickets Generated", time: "3 hr" },
  { className: "danger", title: "Delivery Complete", time: "6 hr" },
];

export const messageBoxesData = [
  { name: "Erica Hughes", time: "58 mins ago", font: "success" },
  { name: "Kori Thomas", time: "1 hr ago", font: "success" },
  { name: "Ain Chavez", time: "32 mins ago", font: "danger", offline: true },
];

interface userProfile {
  icon: "User" | "Mail" | "FileText" | "Settings";
  title: string;
  link:string
 }
 export const userProfileData: userProfile[] = [
  { link:"/setting",icon: "User", title: "Account" },
  { link:"/reviews",icon: "Mail", title: "Inbox" },
  { link:"/booking",icon: "FileText", title: "Taskboard" },
  { link:"/setting",icon: "Settings", title: "Settings" },
 ];
