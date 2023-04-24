import React, { useEffect, useState } from "react";
import "./Comment.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBInput,
} from "mdb-react-ui-kit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Button from "react-bootstrap/Button";
import IosShareIcon from "@mui/icons-material/IosShare";
import ReplyIcon from "@mui/icons-material/Reply";

const Comments = () => {
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      userInfo: state.auth.userInfo,
      userId: state.auth.userId,
      mood: state.Mood.mood,
    };
  });
  const dispath = useDispatch();
  const [comments, setComments] = useState([]);
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useState(false);
  const token = state.token;
  const userId = state.userId;
  const mood = state.mood;
  const getComment = (id) => {
    axios
      .get(`http://localhost:5000/comments/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        // console.log(result.data.result);
        setComments(result.data.result);
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
        // console.log(result.data.result);
        const newresult = result.data.result[0];
        const newComment = [...comments, newresult];
        console.log(newComment);
        setComments(newComment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:5000/comments/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        const newresult = comments.filter((comment) => {
          return result.data.result.id !== comment.id;
        });

        console.log("newresult: ", newresult);
        setComments(newresult);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateComment = (id) => {
    axios
      .put(
        `http://localhost:5000/comments/${id}`,
        { description: description },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data.comment);
        const newComments = comments.map((comment) => {
          if (comment.id == result.data.comment[0].id) {
            comment.description = result.data.comment[0].description;
          }
          return comment;
        });
        setComments(newComments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getComment(3);
  }, []);

  return (
    <div>
      <h1>COMMENT</h1>

      <div>{console.log(mood)}</div>
      <MDBContainer className="mt-5" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="8" lg="6">
            <MDBCard
              className="shadow-0 border"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <MDBCardBody>
                <MDBInput
                  wrapperClass="mb"
                  placeholder="Type comment..."
                  label="+ Add youer comment"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDescription(e.target.value);
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    CreateComment(3);
                  }}
                >
                  send{" "}
                </Button>
                {comments &&
                  comments.map((comment) => {
                    return (
                      <MDBCard className="mb-4" key={comment.id}>
                        <div
                          className={
                            mood === "darkMood"
                              ? "darkMood comment"
                              : "lightMood comment"
                          }
                        >
                          <MDBCardBody>
                            <p>{comment.description}</p>

                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <MDBCardImage
                                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                                  alt="avatar"
                                  width="25"
                                  height="25"
                                />
                                <p className="small mb-0 ms-2">
                                  {state.userInfo.first_name}
                                </p>
                              </div>

                              <div className="d-flex flex-row align-items-center">
                                {/* <p className="small text-muted mb-0">created_on</p> */}
                                {/* <MDBIcon
                        far
                        icon="thumbs-up mx-2 fa-xs text-black"
                        style={{ marginTop: "-0.16rem" }}
                      /> */}
                                <p className="small text-muted mb-4 created_on">
                                  {comment.created_on &&
                                    comment.created_on.split("").splice(0, 10)}
                                </p>
                              </div>
                              <div className="small text-muted mb-4 created_on">
                                {userId == comment.requester_user_id ? (
                                  <>
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      onClick={() => {
                                        deleteComment(comment.id);
                                      }}
                                    >
                                      {<DeleteForeverOutlinedIcon />}
                                    </Button>{" "}
                                    <Button
                                      variant="outline-warning"
                                      size="sm"
                                      onClick={() => {
                                        setUpdate(!update);
                                      }}
                                    >
                                      <ReplyIcon />
                                    </Button>{" "}
                                    {update ? (
                                      <>
                                        <MDBInput
                                          wrapperClass="mb-4"
                                          label="new comment"
                                          id="formControlLg"
                                          type="text"
                                          size="sm"
                                          onChange={(e) => {
                                            setDescription(e.target.value);
                                          }}
                                        />{" "}
                                        <Button
                                          variant="outline-primary"
                                          size="sm"
                                          onClick={() => {
                                            updateComment(comment.id);
                                          }}
                                        >
                                          <IosShareIcon />
                                        </Button>{" "}
                                      </>
                                    ) : (
                                      <></>
                                    )}{" "}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </MDBCardBody>
                        </div>
                      </MDBCard>
                    );
                  })}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Comments;
