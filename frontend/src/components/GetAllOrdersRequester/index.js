import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import "axios";

import "./style.css";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

const GetAllOrdersRequester = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([])
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      userId: state.auth.userId
    };
  });
  useEffect(()=>{
    axios
    .get(
      `http://localhost:5000/orders/my_order`,
      {
        headers: {
          Authorization: state.token,
        },
      }
    )
    .then((result) => {
      console.log(result);
      setOrders(result.data.order)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  return (
    <div className="all-orders-div">
      <MDBContainer className="mt-5" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="8" lg="10">
            <MDBCard
              className="shadow-0 border"
            >
              <MDBCardBody className="">
                {orders.map((order, i) => {
                  return (
                    <div key={order.id}>
                      <MDBCard className="mb-4 cardOrderBody">
                        <h5 className="cardOrderheader">
                          order number : {i + 1}
                        </h5>
                        <MDBCardBody>
                          <p>{order.order_desc}</p>
                          <Card.Title>
                            state : {order.state_id === 1 && "Pending"}
                            {order.state_id === 2 && "Completed"}
                            {order.state_id === 3 && "Canceled"}
                          </Card.Title>
                        </MDBCardBody>
                        <Card.Title>
                          {order.schedule_date &&
                            order.schedule_date.split("").splice(0, 10)}
                        </Card.Title>
                      </MDBCard>
                    </div>
                  );
                })}
                {orders.length==0&&<>
                  <h3 style={{color:"white"}}>You dont have any order yet</h3>
                </>}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default GetAllOrdersRequester;
