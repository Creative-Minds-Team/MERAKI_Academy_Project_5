import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { ToastContainer, toast } from "react-toastify";
import { MDBInput } from "mdb-react-ui-kit";
import { setNotification, cancelNotification } from "../Redux/reducers/noti";
import Toast from 'react-bootstrap/Toast';

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [smShow, setSmShow] = useState(false);
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);

  const { token, userInfo, userId, notifications, userpostId } = useSelector(
    (state) => {
      return {
        token: state.auth.token,
        userInfo: state.auth.userInfo,
        userId: state.auth.userId,
        notifications: state.noti.notification,
        userpostId: state.comments.userpostId,
      };
    }
  );
  const [isCraft, setIsCraft] = useState(userInfo.craft_id)
  const getNotifications = () => {
    axios
      .get(`http://localhost:5000/notifications`, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        console.log(result.data.notification);
        dispatch(setNotification(result.data.notification));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNotivication = (order_id, description, status) => {
    axios
      .get(`http://localhost:5000/orders/order_id/${order_id}`)
      .then((result) => {
        console.log(result);
        axios
          .post(`http://localhost:5000/notifications/${order_id}`, {
            description: description,
            status: status,
            receiver_user_id: result.data.order[0].requester_user_id,
          })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNotificationFn = (id, status) => {
    axios
      .delete(`http://localhost:5000/notifications/${id}`)
      .then((result) => {
        console.log(result);
        dispatch(cancelNotification(id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  // const updateOrderState = (order_id, state_id) => {
  //   axios
  //     .put(
  //       `http://localhost:5000/orders/state/${order_id}`,
  //       { state_id },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     )
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const RateFn = (rate, receiver_user_id, order_id, idNoti) => {
    axios
      .get(`http://localhost:5000/orders/order_id/${order_id}`)
      .then((result) => {
        console.log(result);
        axios
          .post(
            `http://localhost:5000/review`,
            {
              rate,
              receiver_user_id: result.data.order[0].receiver_user_id,
              order_id,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((result) => {
            deleteNotificationFn(idNoti, "order_end");
            setTimeout(() => {
              if(isCraft){navigate("/Dashboard/provider");}
              else{ navigate("/");}
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CreateComment = (receiver_user_id) => {
    axios
      .post(
        `http://localhost:5000/comments/${receiver_user_id}`,
        { description: description },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data.result);
        handleClick();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const handleClick = () => {
    toast.success("Commented Successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  useEffect(() => {
    getNotifications();
    console.log(notifications);
  }, []);
  return (
    
    <div style={{minHeight:"80vh"}}>
      
      {notifications?.map((noti, i) => {
        if (noti.status === "create_order") {
          const value = noti.description.split(":");
          const description = value[1].split("time")[0];
          const time = value[2];
          return (
            <div style={{
              width:"98%",
              margin:"1%",
            }}>
              <Toast style={{
                width:"60%",
                marginLeft:"20%",
                boxShadow: "0px 3px 3px 3px #8a92c2"
                }}>
                <Toast.Header closeButton={false} style={{
                  background:"linear-gradient(to left, #2c3e55, #385075,#2c3e55)",
                  color:"white"
                }}>
                <strong className="me-auto">From: {userInfo.first_name} {userInfo.last_name}</strong>
                </Toast.Header>
                <div class="messages">
                  <div class="messages-content">
                    <Toast.Body>{description}</Toast.Body>
                    <Toast.Body>{time}</Toast.Body>
                  </div>
                </div>
                <Button
                onClick={() => {
                  const info = userInfo;
                  createNotivication(
                    noti.order_id,
                    info.first_name +
                      " " +
                      info.last_name +
                      " " +
                      info.Phone_Number,
                    "accept_order"
                  );
                  deleteNotificationFn(noti.id, "accepted_order_done");
                  deleteNotificationFn(noti.order_id, 2);
                }}
                className="button_noti"
              >
                Accept
              </Button>
              <Button
                onClick={() => {
                  createNotivication(
                    noti.order_id,
                    "your order canceld from provider",
                    "canceld_order"
                  );
                  deleteNotificationFn(noti.id, "order_canceld_done");
                  deleteNotificationFn(noti.order_id, 3);
                }}
                className="button_noti"
              >
                Cancel
              </Button>
              </Toast>
            </div>
          );
        }
    if (noti.status === "accept_order") {
        const value = noti.description.split(" ");
        console.log(noti.description);
        return (
          <div style={{
            width:"98%",
            margin:"1%",
          }}>
            <Toast style={{
                width:"60%",
                marginLeft:"20%",
                boxShadow: "0px 3px 3px 3px #8a92c2"
                }}>
              <Toast.Header closeButton={false} style={{
                  background:"linear-gradient(to left, #2c3e55, #385075,#2c3e55)",
                  color:"white"
                }}>
              <strong className="me-auto">From: {userInfo.first_name} {userInfo.last_name}</strong>
              </Toast.Header>
              <div class="messages">
                  <div class="messages-content">
              <Toast.Body>provider accepted order</Toast.Body>
              <Toast.Body>time:{value[2]}</Toast.Body>
              <Toast.Body>provider {value[0]} accepted your request</Toast.Body></div></div>
              <Button
              onClick={() => {
                setSmShow(true);
                setRate(0);
              }}
              className="me-2 button_noti"
              style={{width:"14%"}}
            >
              Rate
            </Button>
            <Modal
              size="sm"
              show={smShow}
              onHide={() => setSmShow(false)}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  {" "}
                  Rate order{" "}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {rate === 0 ? (
                  <div className="rating">
                    <p>please rate provider</p>
                    <span
                      className="star"
                      data-rating="5"
                      onClick={() => {
                        setRate(5);
                      }}
                    ></span>
                    <span
                      className="star"
                      data-rating="4"
                      onClick={() => {
                        setRate(4);
                      }}
                    ></span>
                    <span
                      className="star"
                      data-rating="3"
                      onClick={() => {
                        setRate(3);
                      }}
                    ></span>
                    <span
                      className="star"
                      data-rating="2"
                      onClick={() => {
                        setRate(2);
                      }}
                    ></span>
                    <span
                      className="star"
                      data-rating="1"
                      onClick={() => {
                        setRate(1);
                      }}
                    ></span>
                  </div>
                ) : (
                  <div>
                    <p>you rate provider {rate} from 5</p>
                    <button
                      onClick={() => {
                        setRate(0);
                      }}
                      className={"button_noti"}
                    >
                      back to rate
                    </button>
                    <ToastContainer />
                    <p>
                      Please share your experience with the service Provider
                    </p>
                    <div className="createComment">
                      <MDBInput
                        wrapperClass="mb"
                        label="+ Add youer comment"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          CreateComment(userpostId);
                          RateFn(
                            rate,
                            noti.receiver_user_id,
                            noti.order_id,
                            noti.id
                          );
                        }}
                      >
                        <IosShareOutlinedIcon />{" "}
                      </Button>
                    </div>
                  </div>
                )}
              </Modal.Body>
            </Modal>
            </Toast>
          </div>
        );
      }
    

    
    if (noti.status === "canceld_order") {
        return (
        <div style={{
          width:"98%",
          margin:"1%",
        }}>
          <Toast style={{
                width:"60%",
                marginLeft:"20%",
                boxShadow: "0px 3px 3px 3px #8a92c2"
                }}>
            <Toast.Header closeButton={false} style={{
                  background:"linear-gradient(to left, #2c3e55, #385075,#2c3e55)",
                  color:"white"
                }}>
            
            <strong className="me-auto">From: {userInfo.first_name} {userInfo.last_name}</strong>
            </Toast.Header>
            <div class="messages">
                  <div class="messages-content">
            <Toast.Body>{noti.description}</Toast.Body>
            <Toast.Body>the provider canceld order</Toast.Body></div></div>
            <Button
              onClick={() => {
                console.log(noti.id);
                deleteNotificationFn(noti.id, "finale_order-canceld");
              }}
              className="button_noti"
            >
              Remove
            </Button>
          </Toast>
        </div>
        );
      }
    
        
      })}
      {notifications.length==0&&<>
        <div className="center-dont-have-yet">
          <div style={{marginTop:"10px",width:"100%",textAlign:"center"}}>
            <h3 style={{color:"white"}}>
              You dont have any notification
            </h3>
          </div>
        </div>
      </>}
    </div>
  );
};

export default Notifications;
