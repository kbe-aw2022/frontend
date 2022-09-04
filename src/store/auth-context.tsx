import React, { useState } from "react";

export type User={
    userName:string,
    token:string|null
}

type authContextObj ={
    currentUser:User|null,
    isLoggedIn:boolean,
    login:(user:User)=>void,
    logout:()=>void
};



export const authContext = React.createContext<authContextObj>({currentUser:{userName:"",token:null}, isLoggedIn:false, login:(user:User)=>{}, logout:()=>{}});
 

const AuthContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const storedUserJson = localStorage.getItem("user");
    const storedUser:User = (storedUserJson !== null) && JSON.parse(storedUserJson);
    const [currentUser,setCurrentUser] = useState<User|null>(storedUser.token?storedUser:null);

    const login = (user:User) => {
        setCurrentUser(user);
        user!==null && user.token!==null && localStorage.setItem("user",JSON.stringify(user));
    }

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("token");
    }

    const isLoggedIn = !!currentUser;
    
    const authContextValue:authContextObj ={
        currentUser,
        isLoggedIn,
        login,
        logout
    }


  return (
    <authContext.Provider value={authContextValue}>{props.children}</authContext.Provider>
  )
}



export default AuthContextProvider;