import React from "react";
import "./App.css";
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


const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route element={<NavBar />}>
        <Route path="/" element={<HomePage />} />
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;