import React from "react";
import { Navigate,useParams} from "react-router-dom"
import { useSession } from "../Context/UserContext";

const ProfileRedirect = ({Component , ...rest}) =>{
    const {user} = useSession();
    const {id} = useParams();

    if(!user || user.uid!==id){
        return <Navigate to={`/login`} />
    }

    return <Component {...rest}/>
    
}

export default ProfileRedirect;