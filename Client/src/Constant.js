import { RiHomeLine } from "react-icons/ri";
import { GrAnalytics } from "react-icons/gr";
import { GiArcheryTarget } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiProgress1Line, RiChat1Line } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa";


export const menu = [
  {
    id: 0,
    name: "Home",
    url: "/",
    icon: RiHomeLine,
  },
  {
    id: 0,
    name: "Job Posted",
    url: "/job-board",
    icon: GrAnalytics,
  },
  {
    id: 0,
    name: "Applications",
    url: "/goals",
    icon: GiArcheryTarget,
  },
  {
    id: 0,
    name: "Setting",
    url: "/Setting",
    icon: IoSettingsOutline,
  },
  {
    id: 0,
    name: "Notification",
    url: "/notification",
    icon: IoNotificationsOutline,
  },
  {
    id: 0,
    name: "Response",
    url: "/progress",
    icon: RiProgress1Line,
  },
  {
    id: 0,
    name: "Tips",
    url: "/tip",
    icon: FaRegLightbulb,
  },
  {
    id: 0,
    name: "Messages",
    url: "/",
    icon: RiChat1Line,
  },
];
