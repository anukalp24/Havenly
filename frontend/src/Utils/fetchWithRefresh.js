 

const fetchWithRefresh = async ( url , options = {})=>{
    const req = await fetch(url , options)
    if(req.ok){
        return req
    }
// first it will check the access token baby if u have it then it will jsut return got it got it
// suppose if authentication and jwt not needed then it will be true and will return it to the front-end
    if(req.status === 401){
        console.log("expire ho gaya bhai access token apna and is workign fone now")
        const refreshReq = await fetch("http://localhost:4090/refresh" ,{
            method: "POST",
            credentials: "include"
        })
        if(refreshReq.ok){
           const result = await refreshReq.json()
          localStorage.setItem("accessToken" , result.newAccessToken)
               options.headers.authorization = localStorage.getItem("accessToken")
            // now we will be addign new access token as the old on eis expired thats hwy we are here in this block
            const retry = await fetch(url ,options)
            return retry
        }
        if(!refreshReq.ok){
            window.location.href = "/auth"
            return refreshReq.message
        }


    }
    return req

    // what if refresh token which last 30 days expires too then also 
}
export default fetchWithRefresh
