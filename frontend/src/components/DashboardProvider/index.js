import "./style.css";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react"; //
import { useNavigate } from "react-router-dom";
import {
  BsBorderWidth,
  BsFilePost,
  BsFillHouseGearFill,
  BsFillBellFill,
  BsFillPlusSquareFill,
  BsFillBarChartFill,
} from "react-icons/bs";
import UpdateProfile from "../UpdateProfile";
import GetAllNotification from "../GetNotification";
import GraphDashboard from "../GraphDashboard";
import CreatePost from "../CreatePost";
import GetAllOrders from "../GetAllOrders";
import UserPosts from "../UsersPosts";
import GetAllOrdersRequester from "../GetAllOrdersRequester";
import Notifications from "../Notifications";
const DashboardProvider = () => {
  const [toAccount, setToAccount] = useState(false);
  const [toNotifications, setToNotifications] = useState(false);
  const [toMyPosts, setToMyPosts] = useState(false);
  const [toMyOrder, setToMyOrder] = useState(false);
  const [toMyOrderR, setToMyOrderR] = useState(false);
  const [toCreatePost, setToCreatePost] = useState(false);
  const [toDashboard, setToDashboard] = useState(false);

  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      userId: state.auth.userId,
      token: state.auth.token,
      userInfo: state.auth.userInfo,
      mood: state.Mood.mood,
      language: state.auth.language
    };
  });
  const [isCraft, setIsCraft] = useState(state.userInfo.craft_id);

  const account = () => {
    setToNotifications(false);
    setToMyOrderR(false);
    setToCreatePost(false);
    setToMyOrder(false);
    setToMyPosts(false);
    if (!toAccount) {
      setToAccount(true);
    } else {
      setToAccount(false);
    }
  };
  const Notification = () => {
    setToAccount(false);
    setToMyOrderR(false);
    setToCreatePost(false);
    setToMyOrder(false);
    setToMyPosts(false);
    setToDashboard(false);
    if (!toNotifications) {
      setToNotifications(true);
    } else {
      setToNotifications(false);
    }
  };
  const myPosts = () => {
    setToNotifications(false);
    setToMyOrderR(false);
    setToCreatePost(false);
    setToMyOrder(false);
    setToAccount(false);
    setToDashboard(false);
    if (!toMyPosts) {
      setToMyPosts(true);
    } else {
      setToMyPosts(false);
    }
  };
  const myOrder = () => {
    setToNotifications(false);
    setToCreatePost(false);
    setToAccount(false);
    setToAccount(false);
    setToDashboard(false);
    setToMyPosts(false);
    if (!toMyOrder) {
      setToMyOrder(true);
    } else {
      setToMyOrder(false);
    }
  };
  const createPost = () => {
    setToNotifications(false);
    setToAccount(false);
    setToMyPosts(false);
    setToMyOrderR(false);
    setToMyOrder(false);
    setToDashboard(false);
    if (!toCreatePost) {
      setToCreatePost(true);
    } else {
      setToCreatePost(false);
    }
  };
  const dashboard = () => {
    setToNotifications(false);
    setToAccount(false);
    setToMyPosts(false);
    setToMyOrder(false);
    setToMyOrderR(false);
    setToCreatePost(false);
    if (!toDashboard) {
      setToDashboard(true);
    } else {
      setToDashboard(false);
    }
  };

  const myOrderR = () => {
    setToNotifications(false);
    setToCreatePost(false);
    setToAccount(false);
    setToAccount(false);
    setToDashboard(false);
    setToMyPosts(false);
    if (!toMyOrderR) {
      setToMyOrderR(true);
    } else {
      setToMyOrderR(false);
    }
  };

  return (
    <div>
      {state.language=="ar"?
      <div className={state.language=="ar"?"container_dashboard_provider_ar":"container_dashboard_provider"}>
        <div className="testin-h">
          {toAccount && <UpdateProfile />}
          {toNotifications && <Notifications />}
          {toCreatePost && <CreatePost />}
          {toMyOrder && <GetAllOrders />}
          {toMyPosts && <UserPosts />}
          {toMyOrderR && <GetAllOrdersRequester />}
          {(toAccount ||
            toNotifications ||
            toCreatePost ||
            toMyOrder ||
            toMyPosts ||
            toMyOrderR) !== true && <GraphDashboard />}
        </div>
        <div className="menu">
          <ul className="ul-menu" style={{textAlign:"right",marginRight:"5%"}}>
            القائمة
            
            {state.userInfo.craft_id != null && (
              <li style={{width:"87%"}}>
                <button
                  className="go_to"
                  onClick={() => {
                    dashboard();
                  }}
                  disabled={toDashboard}
                >
                   لوحة المعلومات <BsFillBarChartFill  />
                </button>
              </li>
            )}
            <li style={{textAlign:"right"}}>
              <button
                className="go_to"
                onClick={() => {
                  Notification();
                }}
                disabled={toNotifications}
              >
                 الأشعارات <BsFillBellFill  />
              </button>
            </li>
            <li>
              {state.userInfo.craft_id != null ? (
                <button
                  className="go_to"
                  onClick={() => {
                    createPost();
                  }}
                  disabled={toCreatePost}
                >
                  إعلان جديد <BsFillPlusSquareFill style={{ marginRight: "3%" }} />
                </button>
              ) : (
                <button
                  className="go_to"
                  onClick={() => {
                    navigate("/CreateCraft");
                  }}
                >
                  إنضم إلينا <BsFillPlusSquareFill/>
                </button>
              )}
            </li>
          </ul>
          <ul className="ul-menu" style={{textAlign:"right",marginRight:"5%"}}>
            الاعدادات
            <li style={{width:"105%"}}>
              <button
                className="go_to"
                onClick={() => {
                  account();
                }}
                disabled={toAccount}
              > حسابي <BsFillHouseGearFill/>
              </button>
            </li>
          </ul>
          <ul className="ul-menu" style={{textAlign:"right",marginRight:"5%"}}>
            الأداء
            <li style={{width:"105%"}}>
              {state.userInfo.craft_id != null && (
                <button
                  className="go_to"
                  onClick={() => {
                    myPosts();
                  }}
                  disabled={toMyPosts}
                >
                  إعلاناتي <BsFilePost />
                </button>
              )}
            </li>
            <li style={{width:"105%"}}>
              {state.userInfo.craft_id != null ? (
                <button
                  className="go_to"
                  onClick={() => {
                    myOrder();
                  }}
                  disabled={toMyOrder}
                >
                  الطلبات <BsBorderWidth/>
                  
                </button>
              ) : (
                <button
                  className="go_to"
                  onClick={() => {
                    myOrderR();
                  }}
                  disabled={toMyOrderR}
                >
                  الطلبات <BsBorderWidth/>
                </button>
              )}
            </li>
          </ul>
        </div>
        
      </div>
      :
      <div className={state.language=="ar"?"container_dashboard_provider_ar":"container_dashboard_provider"}
        
      >

      <div className="menu" style={{minHeight:"100vh"}}>
        <ul className="ul-menu">
          MENU
          {state.userInfo.craft_id != null && (
            <li>
              <button
                className="go_to"
                onClick={() => {
                  dashboard();
                }}
                disabled={toDashboard}
              >
                <BsFillBarChartFill style={{ marginRight: "3%" }} /> Dashboard
              </button>
            </li>
          )}
          <li>
            <button
              className="go_to"
              onClick={() => {
                Notification();
              }}
              disabled={toNotifications}
            >
              <BsFillBellFill style={{ marginRight: "3%" }} /> Notifications
            </button>
          </li>
          <li>
            {state.userInfo.craft_id != null ? (
              <button
                className="go_to"
                onClick={() => {
                  createPost();
                }}
                disabled={toCreatePost}
              >
                <BsFillPlusSquareFill style={{ marginRight: "3%" }} /> Post an
                Ad
              </button>
            ) : (
              <button
                className="go_to"
                onClick={() => {
                  navigate("/CreateCraft");
                }}
              >
                <BsFillPlusSquareFill
                  style={{ marginRight: "3%", marginLeft: "-19%" }}
                />{" "}
                Join us
              </button>
            )}
          </li>
        </ul>
        <ul className="ul-menu">
          SETTINGS
          <li>
            <button
              className="go_to"
              onClick={() => {
                account();
              }}
              disabled={toAccount}
            >
              <BsFillHouseGearFill
                style={{ marginRight: "2%", marginLeft: "-12%" }}
              />{" "}
              Account
            </button>
          </li>
        </ul>
        <ul className="ul-menu">
          PERFORMANCE
          <li style={{ marginTop: "3%" }}>
            {state.userInfo.craft_id != null && (
              <button
                className="go_to"
                onClick={() => {
                  myPosts();
                }}
                disabled={toMyPosts}
              >
                <BsFilePost style={{ marginRight: "3%", marginLeft: "-10%" }} />{" "}
                My Posts
              </button>
            )}
          </li>
          <li>
            {state.userInfo.craft_id != null ? (
              <button
                className="go_to"
                onClick={() => {
                  myOrder();
                }}
                disabled={toMyOrder}
              >
                <BsBorderWidth
                  style={{ marginRight: "3%", marginLeft: "-15%" }}
                />{" "}
                Orders
              </button>
            ) : (
              <button
                className="go_to"
                onClick={() => {
                  myOrderR();
                }}
                disabled={toMyOrderR}
              >
                <BsBorderWidth
                  style={{ marginRight: "3%", marginLeft: "-15%" }}
                />{" "}
                Orders
              </button>
            )}
          </li>
        </ul>
      </div>
      <div className="testin-h">
        {toAccount && <UpdateProfile />}
        {toNotifications && <Notifications />}
        {toCreatePost && <CreatePost />}
        {toMyOrder && <GetAllOrders />}
        {toMyPosts && <UserPosts />}
        {toMyOrderR && <GetAllOrdersRequester />}
        {(toAccount ||
          toNotifications ||
          toCreatePost ||
          toMyOrder ||
          toMyPosts ||
          toMyOrderR) !== true && <GraphDashboard />}
      </div>
      </div>
      }
    </div>
  );
};
export default DashboardProvider;
