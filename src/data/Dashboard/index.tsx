interface growthCard {
  color: string;
  title: string;
  counter: number;
  growth?: boolean;
  number:string
  icon: "Database" | "ShoppingBag" | "ShoppingBag" | "ShoppingBag" |"MessageCircle" |"UserPlus"; 
}
export const growthCardData: growthCard[] = [
  {
    color: "primary",
    title: "Total Earnings",
    counter: 6659,
    icon: "Database",
    growth: true,
    number: "1-bg",
  },
  {
    color: "danger",
    title: "Total Booking",
    counter: 9856,
    icon: "ShoppingBag",
    number: "2-bg",
  },
  {
    color: "secondary",
    title: "Reviews",
    counter: 893,
    icon: "MessageCircle",     
    growth: true,
    number: "3-bg",
  },
  {  
    color: "success",
    title: "Total User",
    counter: 45631,
    icon: "UserPlus",
    number: "4-bg",
  },
];

export const flightTakeOff = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <title>flight_takeoff</title>
      <path d="M22.078 9.656q0.141 0.609-0.164 1.125t-0.914 0.703q-5.813 1.547-9.656 2.578l-5.297 1.406-1.594 0.469-2.625-4.5 1.453-0.375 1.969 1.5 4.969-1.313-4.125-7.172 1.922-0.516 6.891 6.422 5.344-1.406q0.609-0.188 1.148 0.141t0.68 0.938zM2.484 18.984h19.031v2.016h-19.031v-2.016z"></path>
    </svg>
  );
};
export const flightLand = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <title>flight_land</title>
      <path d="M14.016 14.438q-3.844-1.078-9.656-2.578l-1.594-0.469v-5.156l1.453 0.375 0.938 2.344 4.969 1.313v-8.25l1.922 0.516 2.766 9 5.297 1.406q0.609 0.188 0.914 0.727t0.164 1.148q-0.188 0.609-0.703 0.891t-1.125 0.141zM2.484 18.984h19.031v2.016h-19.031v-2.016z"></path>
    </svg>
  );
};

export const bookingHistoryTableData = [
  {
    imgSrc: "../assets/images/tours/1.jpg",
    title: "Hot Air Balloon",
    airline: "Egyptair",
    nights: "10 Night",
    departureDate: "02 November",
    departureDetails: "25h 10m (2 stop)",
    arrivalDate: "03 November",
    status: "Active",
    price: "$900",
  },
  {
    imgSrc: "../assets/images/tours/2.jpg",
    title: "Cool Water Ride",
    airline: "Chine",
    nights: "25 Night",
    departureDate: "04 March",
    departureDetails: "10h 20m (1 stop)",
    arrivalDate: "05 March",
    status: "Booked",
    price: "$900",
  },
  {
    imgSrc: "../assets/images/tours/3.jpg",
    title: "Tour of Shimala",
    airline: "India",
    nights: "15 Night",
    departureDate: "03 November",
    departureDetails: "30h 20m (2 stop)",
    arrivalDate: "03 November",
    status: "Active",
    price: "$1500",
  },
  {
    imgSrc: "../assets/images/tours/4.jpg",
    title: "Beautiful Bali",
    airline: "Us",
    nights: "14 Night",
    departureDate: "02 November",
    departureDetails: "30h 20m (1 stop)",
    arrivalDate: "02 November",
    status: "Booked",
    price: "$1200",
  },
];
