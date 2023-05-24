import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { createBrowserHistory } from "history";
import { useLocation, useNavigate } from "react-router-dom";
import { setPooster } from "../Redux/reducers/auth";
import "./style.css";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBCardImage,
  MDBFile,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import Comments from "../Comments/Comments";
const CreateOrder = () => {
  const [timer, setTimer] = useState(false);

  setTimeout(() => {
    setTimer(true);
  }, 1000);

  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      userInfo: state.auth.userInfo,
    };
  });
  const [isCraft, setIsCraft] = useState(state.userInfo.craft_id)
  const [schedule_date, setSchedule_date] = useState("");
  const [order_desc, setOrder_desc] = useState("");
  const [postInfo, setPostInfo] = useState({});
  const [userId, setUserId] = useState("");
  const [userPhoneNo, setUserPhoneNo] = useState("");
  const [show, setShow] = useState(false);
  const [coulmValueRate,setCoulmValueRate] = useState([])
  const [coulmNameRate,setCoulmNameRate] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const successNotify = () => {
    toast.success("order created Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };
  const falseNotify = () => {
    toast.error("you need login fitst", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };
  const errorNotify = () => {
    toast.error("please enter all required fildes");
  };
  const sendSmsNotifaction = () => {
    axios
      .post("http://localhost:5000/orders/sms", {
        schedule_date,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPostById = () => {
    console.log(location.state);
    axios
      .get(`http://localhost:5000/posts/post/${location.state.id}`)
      .then((result) => {
        setUserId(result.data.posts[0].user_id);
        setPostInfo(result.data.posts[0]);
        console.log(result.data.posts);
        dispatch(setPooster(result.data.posts[0].user_id));
      })
      .catch((err) => {
        console.log("err:",err);
      });
  };
  const getuserInfoById = () => {
        axios
      .get(`http://localhost:5000/users/phone/${location.state.user_id}`)
      .then((result) => {
        console.log(result.data.user[0].phone_no);
        setUserPhoneNo(result.data.user[0].phone_no)
      })
      .catch((err) => {
        console.log("err:",err);
      });
  };
  const fillterRate = (array) =>{
    let rate1 = 0;
    let rate2 = 0;
    let rate3 = 0;
    let rate4 = 0;
    let rate5 = 0;
    for (let i = 0; i < array.length; i++) {
      if(array[i].rate === 5){rate5++}
      if(array[i].rate === 4){rate4++}
      if(array[i].rate === 3){rate3++}
      if(array[i].rate === 2){rate2++}
      if(array[i].rate === 1){rate1++}
    }
    setCoulmNameRate(["Very Poor","Poor","Fair","Good","Excellent"])
    setCoulmValueRate([rate1,rate2,rate3,rate4,rate5])
}
  const getUserRate = ()=>{
    axios
      .get(`http://localhost:5000/review/post/${location.state.user_id}`)
      .then((result) => {
        fillterRate(result.data.Reviews)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getuserInfoById();
    getPostById();
    getUserRate();
  }, []);
  const submitFn = () => {
    axios
      .post(
        `http://localhost:5000/orders`,
        { schedule_date, order_desc, receiver_user_id: postInfo.user_id },
        {
          headers: {
            Authorization: state.token,
          },
        }
      )
      .then((result) => {
        successNotify();
        createNotivication(
          result.data.order[0].id,
          result.data.order[0].order_desc,
          result.data.order[0].schedule_date
        );
        sendSmsNotifaction();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        falseNotify()
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        console.log(err);
      });
  };
  const createNotivication = (order_id, order_desc, order_schedule) => {
    let newTime = order_schedule.split("T").splice(0, 1);
    axios
      .post(`http://localhost:5000/notifications/${order_id}`, {
        description: `description:${order_desc} time:${newTime}`,
        status: "create_order",
        receiver_user_id: location.state.user_id,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className="containe-create-order" style={{paddingTop:60,minHeight:"80vh"}}>

      <button id="myButton1" onClick={()=>{
        window.location.href = `https://api.whatsapp.com/send?phone=962${userPhoneNo}`;
      }}></button>

      <div className="inpust-post">
        <div className="container-div">
          <div className="user-card">
            <img className="image" src={postInfo.post_image} />
            <div>
            
              <h2>{postInfo.title}</h2>
              <p>{postInfo.description}</p>
            </div>
          </div>
        </div>
        <div className="inputCreteOrder">
          <MDBContainer className="p-2 my-2 flex-column w-40">
            <Form>
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput1"
              >
                <label className="labelCreatOrder">
                  Schedule a date with the service provider{" "}
                </label>

                <MDBInput
                  type="datetime-local"
                  min="2023-05"
                   max="2023-06-14T00:00"
                  placeholder="Enter Title"
                  onChange={(e) => {
                    setSchedule_date(e.target.value);
                  }}
                />
              </Form.Group>
              <br></br>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlTextarea1"
              >
                <label className="labelCreatOrder">
                  Your Order Description
                </label>
                <Form.Control
                  className="mb-1"
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  onChange={(e) => {
                    setOrder_desc(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </MDBContainer>
          <MDBBtn
            size="lg"
            className="btnSubmitOrder"
            wrapperclass="mb-4 mt-4"
            onClick={(e) => {
              const value = schedule_date;
              const desValue = order_desc;
              if (!value.trim() || !desValue.trim()) {
                errorNotify();
              } else if(isCraft){
                console.log("ssssss");
                handleShow();

                // navigate("/Dashboard/provider");
                // submitFn();
              }else{
                handleShow();
                // navigate("/");
                submitFn();
              }
            }}
            style={{backgroundColor:"rgb(34, 61, 102)",borderRadius:"18px"}}
          >
            Submit Order
          </MDBBtn>
        </div>
      </div>
      <div>{timer && <Comments value={userId} />}</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign:"left"}}>Are you sure you want to confirm this order</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}
          style={{borderRadius:"18px"}}
          >
            Close
          </Button>
          <Button
            variant="success"
            onClick={(e) => {
              handleClose();
              submitFn();
            }}
            style={{backgroundColor:"rgb(34, 61, 102)",borderRadius:"18px"}}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
      
    </div>
  );
};
export default CreateOrder;
