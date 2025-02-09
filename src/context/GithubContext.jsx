import { createContext, useState } from "react";

const GithubContext=createContext()
export default GithubContext

export function GithubContextProvider({children}){
    const[user,setUser]=useState("Harshit-rohilla")
    const[userInfo,setUserInfo]=useState([])
    const[repo,setRepo]=useState([])
    const[followers,setFollowers]=useState([])
    const[loading,setLoading]=useState(true)
    const[fourRepo,setFourRepo]=useState([])
    const[valueIn, setValueIn]=useState("")

    const value={user,setUser,repo,setRepo,followers,setFollowers,userInfo,setUserInfo,loading,setLoading,fourRepo,setFourRepo,valueIn, setValueIn}

    return  <GithubContext.Provider value={value}>
                {children}
            </GithubContext.Provider>
}