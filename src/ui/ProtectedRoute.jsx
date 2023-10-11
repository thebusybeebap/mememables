import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Loader from "./Loader";

function ProtectedRoute({children}){
    let navigate = useNavigate();
    let {user, isLoading, isAuthenticated} = useUser();

    useEffect(()=>{
        if(!isAuthenticated && !isLoading){
            navigate("/login");
        }
    },[isAuthenticated, isLoading, navigate]);

    if(isLoading) return(
        <Loader />
    );

    if(isAuthenticated) return children;
}

export default ProtectedRoute;