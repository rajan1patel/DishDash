import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add.jsx";
import List from "./pages/list/List";
import Order from "./pages/order/Order";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar></Navbar>
      <hr />
      <div className="app-content">
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/add" element={<Add></Add>} />
          <Route path="/list" element={<List></List>} />
          <Route path="/order" element={<Order></Order>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
