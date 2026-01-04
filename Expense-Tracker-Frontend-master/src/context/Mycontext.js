import {  createContext, useState } from "react";
import { useEffect } from "react";
export const  Mycontext = createContext();

export const MycontextProvider =({children}) =>
{
    const[email,setEmail] = useState(localStorage.getItem("email"));
    const[role,setRole] = useState(localStorage.getItem("role"));
    const[token,setToken] =useState(localStorage.getItem("token"));

    
    useEffect(()=>
    {
      if(token)
      {
        localStorage.setItem("token",token);
      }
      else
      {
        localStorage.removeItem("token");
      }
      if(email)
      {
        localStorage.setItem("email",email);
      }
      else
      {
        localStorage.removeItem("email");
      }
      if(role)
      {
        localStorage.setItem("role",role);
      }
      else
      {
        localStorage.removeItem("role");
      }

    },[email,token,role])

  

    return(
        <div>
            <Mycontext.Provider  value={{email,setEmail,role,setRole,token,setToken}}>
                {children}
            </Mycontext.Provider>

        </div>
    )
}