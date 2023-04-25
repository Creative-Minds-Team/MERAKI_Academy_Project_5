import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import axios from "axios";
import Form from "react-bootstrap/Form";
import { createBrowserHistory } from "history";
import { useLocation, useNavigate } from "react-router-dom";

const CreateOrder = () =>{
    const location = useLocation();
    const state = useSelector((state) => {
        return {
            token:state.auth.token,
        };
    });
    const [schedule_date, setSchedule_date] = useState("")
    const [order_desc, setOrder_desc] = useState("")
    const [postInfo, setPostInfo] = useState({})
    const getPostById = ()=>{
        // console.log(location);
        axios
        .get(`http://localhost:5000/posts/post/${location.state.id}`)
        .then((result)=>{
            setPostInfo(result.data.posts[0])
        })
        .catch((err)=>{
            console.log("err");
        })
    }
    useEffect(()=>{
        getPostById()
    },[])
    const submitFn = ()=>{
        axios
        .post(`http://localhost:5000/orders`,{schedule_date,order_desc,receiver_user_id:postInfo.user_id},{headers: {
            Authorization: state.token
            }})
        .then((result)=>{
            // console.log(result.data.order[0]);
            createNotivication(
                result.data.order[0].id,
                result.data.order[0].order_desc,
                result.data.order[0].schedule_date)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const createNotivication = (order_id,order_desc,order_schedule)=>{
        let newTime =order_schedule.split("T").splice(0,1)
        console.log(newTime);
        axios
        .post(`http://localhost:5000/notifications/${order_id}`,{description:`description:${order_desc} time:${newTime}`,status:"create_order",receiver_user_id:location.state.user_id})
        .then((result)=>{console.log(result);})
        .catch((err)=>{console.log(err);})
    }
    return(
        <div className="inpust-post">
            
        <h3>title: {postInfo.title}</h3>
        <p>description: {postInfo.description}</p>
        <p>date created: {postInfo.created_on}</p>
         <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>schedule_date</Form.Label>
                <Form.Control type="date" placeholder="Enter Title" onChange={(e)=>{setSchedule_date(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description order</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" onChange={(e)=>{setOrder_desc(e.target.value)}}/>
            </Form.Group>
         </Form>
        <button onClick={submitFn}>Submit</button>
         </div>
    )
}
export default CreateOrder

// const CreateOrder = () => {
//   const location = useLocation();
//   const state = useSelector((state) => {
//     return {
//       token: state.auth.token,
//     };
//   });
//   const [schedule_date, setSchedule_date] = useState("");
//   const [order_desc, setOrder_desc] = useState("");
//   const [postInfo, setPostInfo] = useState({});
//   const getPostById = () => {
//     // console.log(location);
//     axios
//       .get(`http://localhost:5000/posts/post/${location.state.id}`)
//       .then((result) => {
//         setPostInfo(result.data.posts[0]);
//       })
//       .catch((err) => {
//         console.log("err");
//       });
//   };
//   useEffect(() => {
//     getPostById();
//   }, []);
//   const submitFn = () => {
//     axios
//       .post(
//         `http://localhost:5000/orders`,
//         { schedule_date, order_desc, receiver_user_id: postInfo.user_id },
//         {
//           headers: {
//             Authorization: state.token,
//           },
//         }
//       )
//       .then((result) => {
//         // console.log(result.data.order[0]);
//         createNotivication(
//           result.data.order[0].id,
//           result.data.order[0].order_desc,
//           result.data.order[0].schedule_date
//         );
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const createNotivication = (order_id, order_desc, order_schedule) => {
//     let newTime = order_schedule.split("T").splice(0, 1);
//     console.log(newTime);
//     axios
//       .post(`http://localhost:5000/notifications/${order_id}`, {
//         description: `description:${order_desc} time:${newTime}`,
//         status: 1,
//         receiver_user_id: location.state.user_id,
//       })
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div className="inpust-post">
//       <h3>title: {postInfo.title}</h3>
//       <p>description: {postInfo.description}</p>
//       <p>date created: {postInfo.created_on}</p>
//       <Form>
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//           <Form.Label>schedule_date</Form.Label>
//           <Form.Control
//             type="date"
//             placeholder="Enter Title"
//             onChange={(e) => {
//               setSchedule_date(e.target.value);
//             }}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//           <Form.Label>Description order</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter description"
//             onChange={(e) => {
//               setOrder_desc(e.target.value);
//             }}
//           />
//         </Form.Group>
//       </Form>
//       <button onClick={submitFn}>Submit</button>
//     </div>
//   );
// };
// export default CreateOrder;

