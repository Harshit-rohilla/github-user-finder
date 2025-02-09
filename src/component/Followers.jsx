function Followers({obj}){
    return(
        <>
         <div className="px-2 py-2 items-center gap-2 flex bg-[#f7fafc] rounded-lg">
            <img className="w-10 h-10 rounded-full" src={obj.avatar_url} alt="follower-img" />
            <h1>{obj.login}</h1>
         </div>
        </>
    )
}
export default Followers