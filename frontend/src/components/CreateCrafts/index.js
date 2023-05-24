import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { setCrafts } from "../Redux/reducers/crafts";
import Dropdown from "react-bootstrap/Dropdown";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { setLogout } from "../Redux/reducers/auth";
import { ToastContainer, toast } from "react-toastify";
const CreateCraft = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [craft, setCraft] = useState({});
  const [value, setValue] = useState("Select your maintenance");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const state = useSelector((state) => {
    console.log(state.auth.userInfo);
    return {
      userId: state.auth.userId,
      token: state.auth.token,
      crafts: state.craft.craft,
      userInfo: state.auth.userInfo,
    };
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/crafts/")
      .then((result) => {
        dispatch(setCrafts(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitFn = () => {
    axios
      .put(
        `http://localhost:5000/crafts/${state.userId}`,
        { craft_id: craft.id },
        {
          headers: {
            Authorization: state.token,
          },
        }
      )
      .then((result) => {
        handleClick();
        setTimeout(() => {
          dispatch(setLogout());
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = () => {
    toast.success("Craft selected Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };
  return (
    <div className="create-craft-container" style={{minHeight:"80vh"}}>
      <p>Hello Mr : {state.userInfo.first_name}</p>
      <p>
        This is your phone number that customers will contact you through :{" "}
        {state.userInfo.Phone_Number}
      </p>
      <p>Please Select your maintenance from list : </p>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{backgroundColor:"#223d66",borderRadius:"10px"}}>
          {value}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {state.crafts.map((craft, id) => {
            return (
              <Dropdown.Item
                onClick={() => {
                  setValue(craft.name);
                  setCraft(craft);
                  console.log(value);
                }}
                key={id}
              >
                {craft.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
        {value != "Select your maintenance" && (
          <p style={{ marginTop: "3%" }}>
            Please click Confirm to confirm the profession
          </p>
        )}
      </Dropdown>
      <>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ backgroundColor:"#223d66",margin: "3%", borderRadius: "30px" }}
        >
          Submit
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>submit craft</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure of your choice : {value}</Modal.Body>
          <Modal.Body>
            Click on Confirm the process and you will be automatically taken to
            the login page
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
                submitFn();
              }}
            >
              confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <ToastContainer />
    </div>
  );
};
export default CreateCraft;
