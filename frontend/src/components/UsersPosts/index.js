import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setMyPost, deletePost, updatePost } from "../Redux/reducers/posts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./index.css"
const UserPosts = () => {
  const [show, setShow] = useState(false);
  const [deleteshow, setDeleteshow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [id, setId] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleDeleteClose = () => setDeleteshow(false);
  const handleDeleteShow = () => setDeleteshow(true);

  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      posts: state.post.myPosts,
      userId: state.auth.userId,
    };
  });

  const dispatch = useDispatch();

  const getUserPosts = () => {
    axios
      .get(`http://localhost:5000/posts/user/myposts`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        dispatch(setMyPost(res.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSelectedPost = (id) => {
    
    axios
      .delete(`http://localhost:5000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          dispatch(deletePost(id));
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateSelectedPost = (id) => {
    axios
      .put(`http://localhost:5000/posts/${id}`,{ title, description } ,{
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
    console.log(res.data);
    if (res.data.success === true) {
          dispatch(updatePost(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <div style={{marginLeft:"100px"}}>
    <div className="container-user-posts1">
      {state.posts.map((post, i) => {
      //  setId(post.id)
        return (
          <div key={i}>
                <MDBCard className="car">
                  <MDBCardTitle style={{backgroundColor:"#223d66",color:"white"}}>             
                    <p className="titleInPost"style={{color:"white",marginTop:"-2%",marginBottom:"1%"}}>{post.title}
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
                      <div className="btn_user_post">
                        <MDBBtn 
                          onClick={(e) => {
                            setId(post.id)
                            handleDeleteShow()
                          }}
                          style={{backgroundColor:"rgb(34, 61, 102)",borderRadius:"18px",marginLeft:"11%"}}
                        >
                          delete post
                        </MDBBtn>
                        {" "}
                        <MDBBtn
                          onClick={(e) => {
                            setId(post.id)
                            handleShow();
                          }}
                          style={{backgroundColor:"rgb(34, 61, 102)",borderRadius:"18px"}}
                        >
                          update post
                        </MDBBtn>
                      </div> 
                      <p>{post.id}</p>
                  </MDBCardBody>
                </MDBCard>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title
                style={{color:"white",backgroundColor:"rgb(34, 61, 102)",width:"100%",borderRadius:"18px"}}
                >Update Post</Modal.Title>

              </Modal.Header>
              <Modal.Body>
                <Form.Control
                className="mb-2"
                  type="text"
                  id="text"
                  placeholder="new title"
                  onChange={(e)=>{setTitle(e.target.value)}}
                />
                <Form.Control
                  type="text"
                  id="text"
                  placeholder="new description"
                  onChange={(e)=>{setDescription(e.target.value)}}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} 
                style={{borderRadius:"18px"}}>
                  Close
                </Button>
                <Button variant="primary" onClick={
                    (e)=>{
                        handleClose()
                        updateSelectedPost(id)
                    }
                }
                style={{backgroundColor:"rgb(34, 61, 102)",borderRadius:"18px"}}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={deleteshow} onHide={handleDeleteClose}>
              <Modal.Header closeButton>
                <Modal.Title
                style={{color:"white",backgroundColor:"rgb(34, 61, 102)",width:"100%",borderRadius:"15px"}}
                >Are sure you want to delete post</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}
                style={{borderRadius:"18px"}}>
                  Close
                </Button>
                <Button variant="danger" onClick={
                    (e)=>{
                        handleDeleteClose()
                        // console.log(id);
                        deleteSelectedPost(id)
                    }
                }
                style={{backgroundColor:"rgb(34, 61, 102)",borderRadius:"18px"}}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
              </div>
        );
      })}
    </div>
    </div>
  );
};

export default UserPosts;
