import "./style.css";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { useNavigate } from "react-router-dom";


  
  
    

const DashboardProvider = () => {
  const [orders, setOrders] = useState([]);
  const [completed, setCompleted] = useState(0)
  const [pending, setPending] = useState(0)
  const [canceled, setCanceled] = useState(0)
    const navigate = useNavigate();
    const state = useSelector((state)=>{
    return{
      userId:state.auth.userId,
      token:state.auth.token,
      userInfo:state.auth.userInfo
    }
})


  

  const ChartComponent = (props) => {
    const chartRef = useRef(null);

    useEffect(() => {
      const chartCanvas = chartRef.current.getContext("2d");
      const myChart = new Chart(chartCanvas, {
        type: "bar", //bar,
        data: {
          labels: ["sada", "dasdasd"],
          datasets: [
            {
              label: "My First Dataset",
              data: [3, 4],
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        },
        options: { scales: { y: { beginAtZero: true } } },
      });

      return () => {
        myChart.destroy();
      };
    }, [props]);

    return <canvas ref={chartRef} />;
  };

  const descOrder = (array)=>{
    let a = 0;
    let b = 0;
    let c = 0;
    for (let i = 0; i < array.length; i++) {
      if(array[i].state_id==1){a++;setPending(a)}
      if(array[i].state_id==2){b++;setCompleted(b)}
      if(array[i].state_id==3){c++;setCanceled(c)}
    }
  } 
  const getAllOrder = () =>{
    axios
    .get(`http://localhost:5000/orders/${state.userId}`, {headers: {Authorization: state.token}})
    .then((result)=>{
      setOrders(result.data.order)
      descOrder(result.data.order)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
  getAllOrder()
  },[])
  const to_notification = ()=>{
    navigate('/getAllNotification')
  }


  // const getAllOrder = () => {
  //   axios
  //     .get(`http://localhost:5000/orders/${state.userId}`, {
  //       headers: { Authorization: state.token },
  //     })
  //     .then((result) => {
  //       setOrders(result.data.order);
  //       console.log(orders);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  useEffect(() => {
    getAllOrder();
  }, []);
  // const to_notification = () => {
  //   navigate("/getAllNotification");
  // };

  return (
    <div className="container_dashboard_provider">
      <div className="menu">
        <p>
          <button className="go_to">menu</button>
        </p>
        <p>
          <button className="go_to">profile</button>
        </p>
        <p>
          <button className="go_to">posts</button>
        </p>
        <p>
          <button className="go_to">order</button>
        </p>
        <p>
          <button className="go_to" onClick={to_notification}>
            notification
          </button>
        </p>
        <p>
          <button className="go_to">createPost</button>
        </p>
      </div>
      <div className="body_container">
        <div className="order_info__cotainer_div">
          <div className="card_order_info">
            <h3>no: of order Completed</h3>
            <p>All order : {orders.length}</p>
            <p>Completed : {completed}</p>
          </div>
          <div className="card_order_info">
            <h3>no: of order Pending</h3>
            <p>All order : {orders.length}</p>
            <p>Pending : {pending}</p>
          </div>
          <div className="card_order_info">
            <h3>no: of order Canceled</h3>
            <p>All order : {orders.length}</p>
            <p>Canceled : {canceled}</p>
          </div>
        </div>
      </div>
      {/* <ChartComponent/>  */}
    </div>
  );
};
export default DashboardProvider