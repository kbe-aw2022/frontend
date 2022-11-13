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
    const [currentUser,setCurrentUser] = useState<User|null>(null);

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
    }

    const login = (user:User) => {
        if(user!==null && user.exp!==null)
        {
            const toBeLoggedInDuration = parseFloat(user.exp)*1000 - Date.now();
            if(toBeLoggedInDuration > 0){
                setCurrentUser(user);
                localStorage.setItem("user",JSON.stringify(user));
                // console.log(toBeLoggedInDuration/1000);
                setTimeout(logout,toBeLoggedInDuration);
            }
        }
    }

    const isStoredUserExpired = (storedUser:User) => {
        const toBeLoggedInDuration = parseFloat(storedUser.exp)*1000 - Date.now();
        return toBeLoggedInDuration < 0;
    }

    if(storedUser && isStoredUserExpired(storedUser)){
        localStorage.removeItem("user");
    }
    
    const isLoggedIn = !!currentUser;
    
    if(!isLoggedIn && storedUser){
        login(storedUser);
    }

    
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