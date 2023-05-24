import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import CreateCraft from "./components/CreateCrafts";
import CreateOrder from "./components/CreateOrder";
import Comments from "./components/Comments/Comments";
import GetAllOrders from "./components/GetAllOrders";
import UserPosts from "./components/UsersPosts";
import DashboardProvider from "./components/DashboardProvider";
import GetAllNotification from "./components/GetNotification";
import Footer from "./components/Footer";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import Chat from "./components/Chat/Chat";
import Aboutus from "./components/Aboutus";
import Support from "./components/Support";
import UpdateProfile from "./components/UpdateProfile";
import GraphDashboard from "./components/GraphDashboard";
import GetAllOrdersRequester from "./components/GetAllOrdersRequester";
import { useSelector } from "react-redux";
import Navbarar from "./components/Navbarar/Navbar";
import Footerar from "./components/Footerar";
import Notifications from "./components/Notifications";
import FillterAndSearch from "./components/FillterAndSearch";
function App() {
  const state = useSelector((state) => {
    return {
      language:state.auth.language
    };
  });
  return (
    <div className="App">
      {state.language=="ar"?
      <Navbarar/>:<Navbar />
      }
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/posts" element={<CreatePost />} />
        <Route path="/CreateOrder" element={<CreateOrder />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/CreateCraft" element={<CreateCraft />} />
        <Route path="/" element={<><Home /></>} />
        <Route path="/Comment" element={<Comments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/mypost" element={<UserPosts />} />
        <Route path="/Dashboard/provider" element={<DashboardProvider />} />
        <Route path="/getAllNotification" element={<GetAllNotification />} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/orders" element={<GetAllOrders />} />
        <Route path="/myorder" element={<GetAllOrdersRequester />} />
        <Route path="/Update" element={<UpdateUser />} />
        <Route path="/Chat" element={<Chat/>} />
        <Route path="/aboutus" element={<Aboutus/>}/>
        <Route path="/support" element={<Support/>}/>
        <Route path="/update/profile" element={<UpdateProfile/>}/>
        <Route path="/dashboard/graph" element={<GraphDashboard/>}/>
        <Route path="/home/fillter" element={<FillterAndSearch/>}/>
      </Routes>
      {state.language=="ar"?
      <Footerar/>:<Footer/>
      }
    </div>
  );
}

export default App;
