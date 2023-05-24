import React from "react";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import posts, { setPost } from "../Redux/reducers/posts";
import Dropdown from "react-bootstrap/Dropdown";
import { setuserpostId } from "../Redux/reducers/comment";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import Accordion from 'react-bootstrap/Accordion';

const Home = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [value, setValue] = useState("Fillter")
  const [valueAr, setValueAr] = useState("فلتر")
  const [textSearch, setTextSearch] = useState("")
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      posts: state.post.posts,
      mood: state.Mood.mood,
      totalPages: state.post.totalPages,
      currentPage: state.post.currentPage,
      language: state.auth.language
    };
  });
  const Desc = ()=>{
    axios
      .get(`http://localhost:5000/posts/fillter/desc`)
      .then((res) => {
        dispatch(setPost(res.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const asc = ()=>{
    axios
      .get(`http://localhost:5000/posts/fillter/asc`)
      .then((res) => {
        dispatch(setPost(res.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const date = ()=>{
    axios
      .get(`http://localhost:5000/posts/fillter/date`)
      .then((res) => {
        dispatch(setPost(res.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const search = ()=>{
    axios
      .get(`http://localhost:5000/posts/search/${textSearch}`)
      .then((res) => {
    console.log(res.data.posts);
    dispatch(setPost(res.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const toOrder = (id, user_id) => {
    navigate("/CreateOrder", { state: { id, user_id } });
  };
  useEffect(()=>{
    dispatch(setPost([]))
  },[])
  const mood = state.mood;
  const testARcraft = (string)=>{
    if (string=="Blacksmith") {
      return "حداد"
    }
    if (string=="Tailor") {
      return "خياط"
    }
    if (string=="Painter") {
      return "دهان"
    }
    if (string=="Plumber") {
      return "سباك"
    }
    if (string=="Electrician") {
      return "فني كهرباء"
    }
    if (string=="mason") {
      return "عامل بناء"
    }
    if (string=="Carpenter") {
      return "نجار"
    }
  }
  return (
    <>
      {
      state.language == "ar"?

        <div className="header-search">
          <p> 
          <button className="but-search but-search-ar" onClick={()=>{
            search()
          }}>بحث</button>
          <input type="text" placeholder="ادخل نص البحث بالانجليزية" onChange={(e)=>{setTextSearch(e.target.value)}} style={{
            textAlign:"right",
            borderRadius:"18px",
            border:"none"
          }}/>{`   `}
          
          </p>
          
          <Dropdown as={ButtonGroup} >
        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: '30%',
      borderRadius:"3px",
      backgroundColor:"#223d66"
    }}></Dropdown.Toggle>
    <Button style={{backgroundColor:"#223d66",textAlign:"right"}}>فلتر</Button>
            <Dropdown.Menu style={{ width: '20%' ,marginLeft:"-10%"}}>
              <Dropdown.Item style={{textAlign:"right"}} id="dItem" onClick={(e)=>{setValueAr("الاكثر سعرا");Desc()}}>الاكثر سعرا</Dropdown.Item>
              <Dropdown.Item style={{textAlign:"right"}} id="dItem" onClick={(e)=>{setValueAr("الاقل سعرا");asc()}}>الاقل سعرا</Dropdown.Item>
              <Dropdown.Item style={{textAlign:"right"}} id="dItem" onClick={(e)=>{setValueAr("المضاف حديثا");date()}}>المضاف حديثا</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        :
       
      <div className="header-search">
      <p> <input type="text" placeholder="Enter search text" onChange={(e)=>{setTextSearch(e.target.value)}}
        style={{borderRadius:"18px",border:"none"}}
      />{`   `}
      <button className="but-search" onClick={()=>{
        search()
      }}>Search</button>
      </p>
      <Dropdown as={ButtonGroup} >
      <Button style={{backgroundColor:"#223d66"}}>Fillter</Button>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: '20%',
      borderRadius:"3px",
      backgroundColor:"#223d66"
        }}></Dropdown.Toggle>
        <Dropdown.Menu style={{ marginLeft:"-70%"}}>
          <Dropdown.Item id="dItem"onClick={(e)=>{setValue("most expensive");Desc()}}>most expensive</Dropdown.Item>
          <Dropdown.Item id="dItem"onClick={(e)=>{setValue("lowest price");asc()}}>lowest price</Dropdown.Item>
          <Dropdown.Item id="dItem"onClick={(e)=>{setValue("Recently added");date()}}>Recently added</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>
        
      }
      <p></p>
      {state.language=="ar"?
      <h2 style={{color:"#223d66"}}>{valueAr!="فلتر"&&`ستشاهد العناصر ${valueAr} اولا`}</h2>
      :
      <h2 style={{color:"#223d66"}}>{value!="Fillter"&&`You will see the ${value} first`}</h2>
      }
      <div className="container1" style={{}}>
      {state.posts.map((post, i) => {
            console.log(post);
            return (
              <div key={i}>
                <MDBCard className="car">
                  <MDBCardTitle style={{backgroundColor:"#223d66",color:"white"}}>             
                    <p className="titleInPost"style={{color:"white",marginTop:"-2%",marginBottom:"1%"}}>
                    {state.language=="ar"?
                      testARcraft(post.name)
                      :
                      post.name
                    }
                    </p>
                  
                  </MDBCardTitle>
                  
                  <MDBCardImage
                    className="imgecard"
                    src={post.post_image}
                    position="top"
                    alt="..."
                  />
                  <MDBCardBody>
                  <MDBCardText className="nameCard"> {post.first_name} {post.last_name}</MDBCardText>              
                    <MDBCardText>{post.pricing} $/h</MDBCardText>
                    <MDBBtn
                      onClick={() => {
                        toOrder(post.id, post.user_id);
                        dispatch(setuserpostId(post.user_id));
                        console.log(post.user_id);
                      }}
                      style={{backgroundColor:"#223d66",borderRadius:"18px"}}
                    >
                      {state.language == "ar"?"اطلب الان":"order now"}
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </div>
            );
          })}
      </div>
      
    </>
  );
};
export default Home;
