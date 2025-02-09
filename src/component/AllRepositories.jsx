function AllRepositories({obj}){
    return(
        <>
        <div className="bg-[#f7fafc] rounded-lg px-2 py-2">
            <h1 className="text-base font-semibold text-[#2d3748]">{obj.name}</h1>
            <h2 className="text-xs text-[#718096]"><span>Description: </span>{obj.description && obj.description.length>50?obj.description.slice(0,50):obj.description}</h2>
            <h2 className="text-xs text-[#718096]"><span>URL: </span>{obj.html_url}</h2>
            <h3 className="text-xs text-[#718096]"><span>Language: </span>{obj.language}</h3>
        </div>
        </>
    )
}
export default AllRepositories