import React, { useState } from "react";
import UserContext from "./UserContext.js";

const UserContextProvider = ({children}) =>{

    const [isLoggedin,setisLoggedin] = useState(false);

    return (
        <UserContext.Provider value={{isLoggedin,setisLoggedin}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;