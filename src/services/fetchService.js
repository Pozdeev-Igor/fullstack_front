
function ajax(url, requestMethod, jwt, requestBody) {
    //const myJwt = jwt;    //может не сработать

    const fetchData = {
        headers: {
            "content-type": "application/json"
        },
        method: requestMethod
    } 

    if(jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`  //может не сработать
    }
    
    if(requestBody) {
        fetchData.body = JSON.stringify(requestBody);
    }
    
    return fetch(url, fetchData).then((response) => {
        
        if (response.status === 200) return response.json();
    })
}

export default ajax;