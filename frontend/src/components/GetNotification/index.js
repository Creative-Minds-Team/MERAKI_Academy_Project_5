import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const GetAllNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  // const getNotifications = () => {
  //   axios
  //     .get(`http://localhost:5000/notifications`, {
  //       headers: {
  //         Authorization: state.token,
  //       },
  //     })
  //     .then((result) => {
  //       console.log(result.data.notification);
  //       setNotifications(result.data.notification);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

    const getNotifications = ()=>{
        axios
        .get(`http://localhost:5000/notifications`,{headers: {
            Authorization: state.token
            }})
        .then((result)=>{
            console.log(result.data.notification);
            setNotifications(result.data.notification)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getNotifications()
    },[])
    const createNotivication = (order_id,description,status)=>{
        axios
        .get(`http://localhost:5000/orders/order_id/${order_id}`)
        .then((result)=>{
            console.log(result);
            axios
            .post(`http://localhost:5000/notifications/${order_id}`,{description:description,status:status,receiver_user_id:result.data.order[0].requester_user_id})
            .then((result)=>{console.log(result);})
            .catch((err)=>{console.log(err);})

        })
        .catch((err)=>{console.log(err);}) 
        }
    const updateNotificationFn = (id,status) => {
        axios
        .put(`http://localhost:5000/notifications/${id}`,{status:status})
        .then((result)=>{console.log(result);})
        .catch((err)=>{console.log(err);})
    }
    return (    
    <div className="all-notification-div">
        <div className="notification">
            <p>notification create_order</p>
        {
            notifications.map((noti,i)=>{
                if(noti.status==="create_order"){
                return(
                <Card key={i}>
                    <Card.Body>
                        <Card.Title>{noti.description}</Card.Title>
                        <Button onClick={()=>{
                            createNotivication(noti.order_id,"your order accepted from provider","accept_order");
                            updateNotificationFn(noti.id,"accepted_order")}}>Accept</Button>
                        <Button onClick={()=>{
                            createNotivication(noti.order_id,"your order canceld from provider","canceld_order");
                            updateNotificationFn(noti.id,"order_canceld")}}>Cancel</Button>
                    </Card.Body>
                </Card>
                )}
            })
        }
        </div>
        <div className="notification">
            <p>notification accept_order</p>
        {
            notifications.map((noti,i)=>{
                if(noti.status==="accept_order"){
                return(
                <Card key={i}>
                    <Card.Body>
                        <Card.Title>{noti.description}</Card.Title>
                        <p>the provider accepted</p>
                        <p>please rate the provider</p>
                        <Button>rate</Button>
                    </Card.Body>
                </Card>
                )}
            })
        }
        </div>
        <div className="notification">
            <p>notification canceld_order</p>
        {
            notifications.map((noti,i)=>{
                if(noti.status==="canceld_order"){
                return(
                <Card key={i}>
                    <Card.Body>
                        <Card.Title>{noti.description}</Card.Title>
                        <p>the provider canceld order</p>
                        <Button>Cancel</Button>
                    </Card.Body>
                </Card>
                )}
            })
        }
        </div>

  
  {/* useEffect(() => {
    getNotifications();
  }, []);
  return (
    <div className="all-notification-div">
      {notifications.map((noti, i) => {
        return (
          <Card key={i}>
            <Card.Body>
              <Card.Title>{noti.description}</Card.Title>
              <Button>Accept</Button>
              <Button>Cancel</Button>
            </Card.Body>
          </Card>
        );
      })} */}

    </div>
  );
};

export default GetAllNotification;
