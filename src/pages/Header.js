import React from 'react'
import Button from 'react-bootstrap/Button';
import  {logout} from "../firebase/auth"
import {useNavigate} from "react-router-dom"
import { useSession } from '../Context/UserContext';

const Header = () => {
    const navigate = useNavigate();
    const {user} = useSession()

    const onHandleLogout = async() =>{
        await logout();
        navigate('/signup')
    }

  return (
    <div style={{width: "100%",backgroundColor:"blue",padding:"10px",color:"white",fontWeight:"700",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        React Dashbaord
        {user && <Button style={{float:"right"}} onClick={onHandleLogout} variant="outline-danger">Logout</Button>}
    </div>
  )
}

export default Header