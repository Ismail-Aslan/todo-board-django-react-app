import React,{useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRouter from "./routers/PrivateRouter";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Board from "./pages/Board"

function getToken() {
  const tokenString = localStorage.getItem('Token');
  const userToken = JSON.parse(tokenString);
  return userToken
}

export default function App() {
  const [token, setToken] = useState(() => getToken());

  return (
    <BrowserRouter>
        <Routes>
          <Route path='*' element={<h1>Page Not Found</h1>} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="/register" element={<Register setToken={setToken}/>} />
          
          <Route path="/" element={<PrivateRouter token={token}/>}>
            <Route index element={<Board token={token}/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
