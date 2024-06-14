import { Route, Routes, Navigate } from "react-router-dom"
import Home from "./components/Home"
import Register  from "./components/Register"
import Login from "./components/Login"
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const user = localStorage.getItem("token")
    
    return (
        <Navbar />
        <Routes>
            {user && <Route path="/" exact element={<Home />} />}
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
    )
}

export default App