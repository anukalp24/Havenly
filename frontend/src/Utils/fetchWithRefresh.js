 

const fetchWithRefresh = async ( url , options = {})=>{
    const req = await fetch(url , options)
    if(req.ok){
        return req
    }
// first it will check the access token baby if u have it then it will jsut return got it got it
// suppose if authentication and jwt not needed then it will be true and will return it to the front-end
    if(req.status === 401){
        console.log("the token is expire ")
        const refreshReq = await fetch(`${import.meta.env.VITE_API_URL}/refresh` ,{
            method: "POST",
            credentials: "include"
        })
        if(refreshReq.ok){
            const retry = await fetch(url ,options)
            return retry
        }
        if(!refreshReq.ok){
            window.location.href = "/auth"
            return refreshReq.message
        }


    }
    return req

}
export default fetchWithRefresh