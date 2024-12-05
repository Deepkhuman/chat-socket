import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axiosClient from "../Axios/axiosClient";
import { handleError, handleSuccess } from "../../utils";
import Sidebar from "../../Mui Components/Sidebar";

const Home = () => {
  const [loggedinuser, setloggedinUser] = useState("");
  const navigate = useNavigate();
  const [toastShow, SetToastshow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedinUSer");

    if (!token) {
      navigate("/login");
      handleError("You must be logged in to access this page");
    } else {
      setloggedinUser(user);
      verifyToken(token);
      // if (!toastShow) {
      //   SetToastshow(true);
      //   handleSuccess("LoggedIn Success");
      // }
    }
  }, [navigate]);

  async function verifyToken(token) {
    try {
      const response = await axiosClient.get("/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
    } catch (error) {
      handleError("Invalid session. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("loggedinUSer");
      navigate("/login");
    }
  }

  async function handlelogout() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedinUSer");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <Sidebar
          button={
            <button className="bg-red-400 p-3 " onClick={handlelogout}>
              Logout
            </button>
          }
        />
      </div>
    </>
  );
};

export default Home;
