import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import BrightHotel from "../bright-hotel/Components/BrightHotel.jsx";
import RoomList from "../bright-hotel/Components/RoomPage.jsx";
import ServiceList from "../bright-hotel/Components/ServicePage.jsx";
import SearchResult from "../bright-hotel/Components/SearchResult";

const indexRoutes = [
  { path: "/landing-page", name: "LandingPage", component: LandingPage },
  { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/home", name: "BrightHotel", component: BrightHotel },
  { path: "/rooms", name: "RoomList", component: RoomList },
  { path: "/services", name: "ServiceList", component: ServiceList },
  { path: `/search`, component: SearchResult}
];

export default indexRoutes;
