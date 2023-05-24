import "./Navbar.css";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { setLogout, setNotification } from "../Redux/reducers/auth";
import { setCounterNotification } from "../Redux/reducers/noti";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { changeMood } from "../Redux/reducers/mood";
import { setLanguage } from "../Redux/reducers/auth";
import {
  BsFillHouseGearFill,
  BsFillBarChartFill,
  BsChatDotsFill,
  BsFillPlusSquareFill,
  BsFillPlusCircleFill,
  BsBoxArrowInLeft,
  BsSpellcheck
} from "react-icons/bs";
import GetAllNotification from "../GetNotification";
const Navbars = () => {
  const [moodstate, setMoodstate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notiShow, setNotiShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    setIsLoading(true);
    setNotificationsCount(0);
    navigate(`/login`);
    dispatch(setLogout());
  };
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      token: state.auth.token,
      user_image: state.auth.user_image,
      craft: state.auth.userInfo.craft_id,
      noNotification: state.noti.counterNotification,
      mood: state.Mood.mood,
    };
  });
  const mood = state.mood;

  const [notificationsCount, setNotificationsCount] = useState(
    state.noNotification
  );

  let newTheme = moodstate ? "lightMood" : "darkMood";
  const notificationsCountApi = ()=>{
    axios
          .get(`http://localhost:5000/notifications`, {
            headers: {
              Authorization: state.token,
            },
          })
          .then((result) => {
            dispatch(setCounterNotification(result.data.notification));
          })
          .catch((err) => {
            console.log(err);
          });
  }
  useEffect(()=>{
    notificationsCountApi()
  },[])
  return (
    <div className= "navBar-container">
      <div
        className={
          mood === "darkMood"
            ? "darkMood navBar-container"
            : "lightMood navBar-container"
        }
      >
        <Navbar collapseOnSelect expand="lg" className="background-navbar" style={{boxShadow:"none"}}>
          <Navbar.Brand style={{ marginLeft: "5%" }}>
            <h3
              className="header-logo"
              style={{
                display: "flex",
                fontFamily: "Roboto",
                letterSpacing: "0.8px",
                lineHeight: "1",
                fontSize: "40px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              {/* <img className="imgLogoNew" src="./media/Screenshot_7.png" ></img> */}
              Tas<h3 className="the-L-letter">L</h3>ee7
              <span className="for-the-dot">.</span>
            </h3>{" "}
          </Navbar.Brand>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{ justifyContent: "flex-end" ,marginTop:'-3vh'}}

          >
            <Nav>
              {state.isLoggedIn ? (
                <>
                  <div></div>
                  <Nav.Link
                    style={{
                      fontSize: "18px",
                      marginLeft: "-30%",
                      color: "white",
                    }}
                    onClick={() => {
                      navigate(`/`);
                    }}
                    className="each-navbar"
                  >
                    Home
                    {/* Home{" "} */}
                  </Nav.Link>

                  <Nav.Link
                    style={{ fontSize: "18px", color: "white" }}
                    className="each-navbar"
                    onClick={() => {
                      navigate("/support");
                    }}
                  >
                    Support{" "}
                  </Nav.Link>
                  <Nav.Link
                    style={{ fontSize: "18px", color: "white" }}
                    onClick={() => {
                      navigate(`/aboutus`);
                    }}
                    className="each-navbar darkss"
                  >
                    About us{" "}
                  </Nav.Link>
                  <NavDropdown  menualign="left" id="collasible-nav-dropdown" style={{color:"red"}}>
                  {/* <NavDropdown.Item style={{justifyContent: "flex-end",marginLeft:"-25%",background: "none", border: "none"}}> */}
                    
                    <GetAllNotification/>
                    
                  {/* </NavDropdown.Item> */}

                  </NavDropdown>
                  <div
                    style={{ color: "white" }}
                    onClick={() => {
                      navigate("/Notifications");
                    }}
                  >
                    <FaBell
                      size={22}
                      color="gray"
                      style={{ color: "white", marginTop: "12px" }}
                    />
                    
                    <span style={{ marginTop: "12px" }}>
                      {state.noNotification}
                    </span>
                  </div>

                  <NavDropdown menualign="center" id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/Dashboard/provider");
                      }}
                    >
                      <BsFillBarChartFill /> Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/update/profile");
                      }}
                    >
                      <BsFillHouseGearFill /> Account
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/Chat");
                      }}
                    >
                      <BsChatDotsFill /> Chat AI
                    </NavDropdown.Item>
                    {state.craft ? (
                      <NavDropdown.Item
                        onClick={() => {
                          navigate("/CreatePost");
                        }}
                      >
                        <BsFillPlusSquareFill /> Post an Ad
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item
                        onClick={() => {
                          navigate("/CreateCraft");
                        }}
                      >
                        <BsFillPlusCircleFill /> Join us
                      </NavDropdown.Item>
                    )}
                    
                    <NavDropdown.Item onClick={()=>{dispatch(setLanguage("ar"))}} >
                      <BsSpellcheck /> Arabic 
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>
                      <BsBoxArrowInLeft /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  <img
                    src={state.user_image}
                    alt="Profile Pic"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "20px",
                    }}
                  />
                </>
              ) : (
                <div className="countainer-each-navbar">
                  <p className="eache-navbar-1"onClick={() => {
                      navigate(`/`);
                    }}
                    // style={{marginLeft:"-30%"}}
                    >Home</p>
                  <p className="eache-navbar-1"style={{ opacity: 0 }}>ss</p>
                  <p className="eache-navbar-1" onClick={() => {
                      navigate(`/register`);
                    }}>Register</p>
                  <p className="eache-navbar-1" style={{ opacity: 0 }}>ss</p>
                  <p className="eache-navbar-1" onClick={() => {
                      navigate(`/login`);
                    }}>login</p>
                  <p className="eache-navbar-1" style={{ opacity: 0 }}>ss</p>
                  <p className="eache-navbar-1"onClick={() => {
                      navigate("/support");
                    }}>support</p>
                  <p className="eache-navbar-1" style={{ opacity: 0 }}>ss</p>
                  <p className="eache-navbar-1"onClick={() => {
                      navigate(`/aboutus`);
                    }}>About us</p>
                  <p className="eache-navbar-1" style={{ opacity: 0 }}>ss</p>
                  <p className="eache-navbar-1"onClick={()=>{dispatch(setLanguage("ar"))}}>Arabic</p>
                  <p className="eache-navbar-1" style={{ opacity: 0 }}>ss</p>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Navbars;
