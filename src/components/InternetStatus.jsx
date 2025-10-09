import React from "react";
import { useState, useEffect } from "react";
import NoInternet from "../effects/NoInternet.jsx";

const InternetStatus = ({children}) => {
    const [networkStatus, setNetworkStatus]= useState(navigator.onLine);
    useEffect(()=>{
        const handleOnlineStatus=()=> setNetworkStatus(true);
        const handleOfflineStatus=()=> setNetworkStatus(false);

        window.addEventListener('online',handleOnlineStatus);
        window.addEventListener('offline',handleOfflineStatus);

        return ()=>{
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline',handleOfflineStatus);
        }
    },[]);

    if(!networkStatus){
        return <NoInternet/>;
    }
    return children;
}
export default InternetStatus;
