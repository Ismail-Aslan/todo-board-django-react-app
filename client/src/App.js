import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRouter from "./routers/PrivateRouter";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Board from "./pages/Board"

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='*' element={<h1>Page Not Found</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<PrivateRouter />}>
            <Route index element={<Board/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
