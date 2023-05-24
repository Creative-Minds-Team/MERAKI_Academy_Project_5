import "./style.css"
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";//
import Chart from "chart.js/auto";
import UpdateProfile from "../UpdateProfile";


const GraphDashboard = () =>{
  const [orders, setOrders] = useState([]);
  const [completed, setCompleted] = useState(0)
  const [pending, setPending] = useState(0)
  const [canceled, setCanceled] = useState(0)
  const [coulmName,setCoulmName] = useState([])
  const [coulmValue,setCoulmValue] = useState([])
  const state = useSelector((state) => {
    return {
      userId: state.auth.userId,
      token: state.auth.token,
      userInfo: state.auth.userInfo,
      language: state.auth.language
    };
  });
  const [isCraft, setIsCraft] = useState(state.userInfo.craft_id)
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

    const ChartComponent = (props) => {
    const chartRef = useRef(null);
    useEffect(() => {
    const chartCanvas = chartRef.current.getContext("2d");
    const myChart = new Chart(chartCanvas, {
        type: "bar",//bar
        data: {
        labels: ["Total Orders","Pending Orders","Accepted  Orders","Canceled  Orders"],
        datasets: [
            {
            label: "",
            data: [orders.length,pending,completed,canceled],
            // backgroundColor: ["blue", "rgb(170, 46, 37)", "#9ad219", "rgb(0, 0, 0)"],
            // backgroundColor: ["#223D66", "#385075", "#4E6384", "#647793"],
            backgroundColor: ["#9ABEF5", "#aecbf7", "#c2d8f9", "#D6E5FB"],
            
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
    const ChartComponent1 = (props) => {
        const chartRef = useRef(null);
        useEffect(() => {
        const chartCanvas = chartRef.current.getContext("2d");
        const myChart = new Chart(chartCanvas, {
            type: "doughnut", 
            data: {
            labels: coulmName,
            datasets: [
                {
                label: "no: rated",
                data: coulmValue,
                // backgroundColor: ["red", "pink", "#c3e6e1", "green", "blue"],
                // borderColor: "rgba(255, 99, 132, 0.2)",
                // backgroundColor: ["#223D66", "#385075", "#4E6384", "#647793"],
                //9ABEF5         aecbf7                   c2d8f9                        D6E5FB
                backgroundColor: ["#6b85ab", "#9ABEF5", "#aecbf7", "#c2d8f9","#D6E5FB"],
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
    const ChartComponent2 = (props) => {
        const chartRef = useRef(null);
        useEffect(() => {
        const chartCanvas = chartRef.current.getContext("2d");
        const myChart = new Chart(chartCanvas, {
            type: "bar", 
            data: {
            labels: ["مجموع الطلبات","طلبات قيد الانتظار","الطلبات المنجزة","الطلبات الملغاة"],
            datasets: [
                {
                label: "",
                data: [orders.length,pending,completed,canceled],
                // backgroundColor: ["blue", "rgb(170, 46, 37)", "#9ad219", "rgb(0, 0, 0)"],
                backgroundColor: ["#4D8CEA", "#9abef5", "#aecbf7", "#c2d8f9","#D6E5FB"],
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
    const ChartComponent3 = (props) => {
        const chartRef = useRef(null);
        useEffect(() => {
        const chartCanvas = chartRef.current.getContext("2d");
        const myChart = new Chart(chartCanvas, {
            type: "doughnut", 
            data: {
            labels: ["سي جدا","سيء","جيد","جيد جدا","ممتاز"],
            datasets: [
                {
                label: "no: rated",
                data: coulmValue,
                // backgroundColor: ["red", "pink", "#c3e6e1", "green", "blue"],
                // borderColor: "rgba(255, 99, 132, 0.2)",
                // backgroundColor: ["#223D66", "#385075", "#4E6384", "#647793"],
                backgroundColor: ["#4D8CEA", "#9ABEF5", "#aecbf7", "#c2d8f9","#D6E5FB"],
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
        setCoulmName(["Very Poor","Poor","Fair","Good","Excellent"])
        setCoulmValue([rate1,rate2,rate3,rate4,rate5])
    }
    const getRate = () =>{
        axios
        .get(`http://localhost:5000/review/`,{headers: {Authorization: state.token}})
        .then((result)=>{
          fillterRate(result.data.Reviews)
        })
        .catch((err)=>{
          console.log(err);
        })
    }
    useEffect(()=>{
        getAllOrder()
        getRate()
        },[])
    return(
        <div>
        {isCraft!=null?
        <div className="body_container">

            <div className="order_info__cotainer_div">
            {state.language=="ar"?
            <>
                <div className="card_order_info light-red">
                    <h5>الطلبات الملغاة</h5>
                    <p className="number-order">{canceled}</p>
                </div>
                <div className="card_order_info light-green">
                    <h5>الطلبات المنجزة</h5>
                    <p className="number-order">{completed}</p>
                </div>
                <div className="card_order_info light-blue">
                    <h5>طلبات قيد الانتظار</h5>
                    <p className="number-order">{pending}</p>
                </div>
                <div className="card_order_info colorin">
                    <h5>مجموع الطلبات</h5>
                    <p className="number-order">{orders.length}</p>
                </div>
             </>:
            
            <>
                <div className="card_order_info colorin">
                    <h5>Total Orders</h5>
                    <p className="number-order">{orders.length}</p>
                </div>
                <div className="card_order_info light-blue">
                    <h5>Pending Orders</h5>
                    <p className="number-order">{pending}</p>
                </div>
                <div className="card_order_info light-green">
                    <h5>Accepted Orders</h5>
                    <p className="number-order">{completed}</p>
                </div>
                <div className="card_order_info light-red">
                    <h5>Canceled Orders</h5>
                    <p className="number-order">{canceled}</p>
                </div>
            </>}
            </div>
            <hr className="hr2"/>


            <div className="display-flex ChartComponent-div">
                {state.language=="ar"?
                <>
                    <div className="ChartComponent">
                        <h2>الطلبات</h2>
                        <ChartComponent2/>
                    </div>
                    <div className="ChartComponent ChartComponent1">
                        <h2 className="h2">التقيم</h2>
                        <ChartComponent3/>
                    </div>
                </>:
                <>
                    <div className="ChartComponent">
                        <h2>Orders</h2>
                        <ChartComponent/>
                    </div>
                    <div className="ChartComponent ChartComponent1">
                        <h2 className="h2">Rate</h2>
                        <ChartComponent1/>
                    </div>
                </>}
                
           
            </div>
        </div>:<UpdateProfile/>}
        </div>
    )
}
export default GraphDashboard