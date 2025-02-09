import { useContext, useEffect } from "react"
import GithubContext from "./context/GithubContext"
import axios from "axios"
import Followers from "./component/Followers"
import AllRepositories from "./component/AllRepositories"
import LanguageChart from "./component/LanguageChart"
import {toast} from "react-hot-toast"

function App(){
  const{user,setUser,repo,setRepo,followers,setFollowers,userInfo,setUserInfo,setLoading,fourRepo,setFourRepo,valueIn, setValueIn}=useContext(GithubContext)
  const VITE_USER_API=import.meta.env.VITE_USER_API
  const VITE_PUBLIC_REPO_API=import.meta.env.VITE_PUBLIC_REPO_API
  const VITE_FOLLOWERS_API=import.meta.env.VITE_FOLLOWERS_API



  useEffect(()=>{
    if(!user){return}
    setLoading(true)
    Promise.all([
      axios.get(`${VITE_USER_API}${user}`),
      axios.get(`${VITE_PUBLIC_REPO_API}${user}/repos`),
      axios.get(`${VITE_FOLLOWERS_API}${user}/followers`)
    ])
    .then(([userRes,repoRes,followerRes])=>{
      setUserInfo(userRes.data)
      setRepo(repoRes.data)
      setFollowers(followerRes.data)
      const repoObj=repoRes.data.reduce((acc,obj)=>{
        if(obj.language){
          acc[obj.language]=(acc[obj.language] || 0) + 1}
          return acc
        
      },{})
      const topRepo=Object.entries(repoObj).sort(([, a], [, b]) => b - a).slice(0, 4)
      const total = topRepo.reduce((sum, [, count]) => sum + count, 0)
      const result = topRepo.map(([language, count]) => ({
        language,
        percentage: Math.round((count / total) * 100)
      }));
      setFourRepo(result)
    })
    .catch((err)=>{console.log(err)
        if(err.response?.status===404){
          toast.error("user not found")
        }
        else if(err.code==="ERR_NETWORK"){
          toast.error("network error")
        }
        else if(err.response?.status===403){
          toast.error("API rate limit exceeded")
        }
    })
    .finally(()=>{setLoading(false)})
  },[user,setLoading, setUserInfo, setRepo, setFollowers])

  
  return(
    <>
    <div className="h-screen w-full flex flex-col items-center bg-[#f8fafc]">
      <nav className="w-full bg-[#2a4365] py-2 flex gap-4 items-center pl-4">
        <div className="w-11 h-11 border border-[#63b3ed] rounded-full">
          <img className="h-full w-full object-fill" src="/dev-profile-logo.svg" alt="logo" />
        </div>
        <div className="text-white text-lg">GithubProfile</div>
      </nav>
      <div className="w-[70%] mx-auto flex flex-col items-center flex-grow">
        <div className="w-2/3 flex gap-4 mt-2">
          <input onChange={(e)=>{setValueIn(e.target.value.toLowerCase())}} className="flex-grow px-4 py-2 outline-none border-2 rounded-3xl border-[#e2e8f0] bg-white" type="text" value={valueIn} placeholder="search profile..."/>
          <button onClick={()=>{setUser(valueIn)}} className="px-4 py-2 text-white text-center cursor-pointer bg-[#4299e1] rounded-3xl">search</button>
        </div>
        <div className="w-full gap-2 mt-2 flex-grow flex flex-col mb-2">
          <div className="w-full flex gap-2 h-3/5">
            <div className="w-[30%] flex flex-col items-center gap-1 py-4 px-4 border-2 rounded-xl border-[#e2e8f0] bg-white">
              <img src={userInfo.avatar_url} alt="user-img" className="object-cover w-16 h-16 rounded-full" />
              <h1 className="text-[#2d3748] text-2xl font-semibold">{userInfo.name}</h1>
              <h1 className="text-[#718096]">@{userInfo.login}</h1>
              <div className="text-[#718096] mt-3 py-2 px-4 rounded-lg max-h-40 text-sm bg-[#f7fafc]">{userInfo.bio}</div>
            </div>
            <div className="w-[70%] flex flex-col gap-2 ">
              <div className="w-full h-[25%] px-3 py-2 grid grid-cols-3 gap-4 border-2 rounded-xl border-[#e2e8f0] bg-white">
                <div className="bg-[#ebf8ff] rounded-lg flex flex-col items-center justify-center">
                  <p className="text-[#2b6cb0] text-lg">{userInfo.public_repos}</p>
                  <p className=" text-[#4a5568]">Repositories</p>
                </div>
                <div className="bg-[#e6fffa] rounded-lg flex flex-col items-center justify-center">
                  <p className="text-[#553c9a] text-lg">{userInfo.followers}</p>
                  <p className=" text-[#4a5568]">Followers</p>
                </div>
                <div className="bg-[#faf5ff] rounded-lg flex flex-col items-center justify-center">
                  <p className="text-[#2c7a7b] text-lg">{userInfo.following}</p>
                  <p className=" text-[#4a5568]">Following</p>
                </div>
              </div>
              <div className="w-full h-[75%] flex gap-2">
                <div className="h-full w-1/2 border-2 rounded-xl border-[#e2e8f0] bg-white">
                  <LanguageChart repos={fourRepo}/>
                </div>
                <div className="h-full overflow-auto flex flex-col gap-1 px-4 py-2 w-1/2 border-2 rounded-xl border-[#e2e8f0] bg-white">
                  <h1 className="text-[#2d3748] font-semibold">Followers</h1>
                  <div className="max-h-50 flex flex-col gap-2">
                    {followers.length>0?followers.map((obj,index)=>(<Followers key={index} obj={obj}/>)):<div>No Followers</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col h-2/5 px-4 pt-2 bg-white border-2 rounded-xl border-[#e2e8f0]">
            <h1 className="w-full text-[#2d3748] text-lg font-semibold">Repositories</h1>
            <div className="w-full flex-grow grid grid-cols-3 gap-2 overflow-y-auto max-h-44">
              {repo.length>0? repo.map((obj, index)=>(<AllRepositories key={index} obj={obj}/>)):<div>No Repositories Found</div>}
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}
export default App