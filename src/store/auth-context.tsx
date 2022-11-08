import React, { useState } from "react";

export type User={
    userName:string,
    exp:string
}

type authContextObj ={
    currentUser:User|null,
    isLoggedIn:boolean,
    login:(user:User)=>void,
    logout:()=>void
};



export const authContext = React.createContext<authContextObj>({currentUser:{userName:"",exp:""}, isLoggedIn:false, login:(user:User)=>{}, logout:()=>{}});
 

const AuthContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const storedUserJson = localStorage.getItem("user");
    const storedUser:User = (storedUserJson !== null) && JSON.parse(storedUserJson);
    const [currentUser,setCurrentUser] = useState<User|null>(storedUser ? storedUser : null);
    

    const login = (user:User) => {
        if(user!==null && user.exp!==null)
        {
            setCurrentUser(user);
            localStorage.setItem("user",JSON.stringify(user));
            const loggedInDuration = parseFloat(user.exp)*1000 - Date.now();
            console.log(loggedInDuration/1000);
            setTimeout(logout,loggedInDuration);
        }
    }

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
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