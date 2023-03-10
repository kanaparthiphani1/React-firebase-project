import React, {useState,useEffect,useContext} from "react";
import firebase from "firebase/compat/app";

const UserContext = React.createContext();

export const UserProvider = (props)=>{
    const [session,setSession] = useState({user:null,loading:true});

    useEffect(()=>{
        const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
            setSession({user,loading:false});
        })

        return ()=>unsubscribe()
    },[])


    return (
        <UserContext.Provider value={session}>
        {
            !session.loading  && props.children
        }
        </UserContext.Provider>
    )
}


export const useSession = () =>{
    const session = useContext(UserContext);
    return session;
}