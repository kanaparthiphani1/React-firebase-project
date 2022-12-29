import React from "react";
import { Navigate} from "react-router-dom"
import { useSession } from "../Context/UserContext";

const ProfileRedirect = ({Component , ...rest}) =>{
    const {user} = useSession();

    if(user){
        return <Navigate to={`/profile/${user.uid}`} />
    }

    return <Component {...rest}/>
    
}

export default ProfileRedirect;