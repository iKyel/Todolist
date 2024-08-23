import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import "./App.css";
import { WorkContext } from "./components/WorkContext";
import { workStore } from "./components/WorkStore";
import { UserContext } from "./components/User/UserContext";
import { userStore } from "./components/User/UserStore";

import NavBar from "./layout/NavBar";
import HomePage from "./components/HomePage";
import WorkList from "./components/WorkList";
import CreateWork from "./components/CreateWork";
import {
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
} from "react-router-dom";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import Login from "./components/User/Login";


const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route element={<NavBar />}>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/list" element={<WorkList />} />
        {/* Pass the addTask function as a prop to CreateWork */}
        <Route path="/create" element={<CreateWork />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <div className="container">
      <UserContext.Provider value={userStore}>
        <WorkContext.Provider value={workStore}>
          <RouterProvider router={router} />
        </WorkContext.Provider>
      </UserContext.Provider>

    </div>
  );
}

export default App;
