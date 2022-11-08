import { useCallback, useState } from "react";

const useHttpRequest = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // let response = null;

    type configParams = { 
        method:string, 
        payload?:{}, 
        headers:{}, 
    }

    const resetError = () => {
        setError(null);
    }

    const sendRequest = useCallback(async (url:string, onResponseCallback?:(response:any)=>any, config:configParams={method:"GET",headers:{}}) => {     
        try {
                config.method === "GET" && setLoading(true);
                const response = await fetch(url,{
                    method:config.method,
                    body:JSON.stringify(config.payload),
                    headers:config.headers,
                    credentials:"include"
                })
                if(!response.ok){
                    console.log("not ok")
                    throw new Error(response.statusText);
                }

                if(response.status !== 204){
                    const data= await response.json();
                    onResponseCallback && onResponseCallback(data);
                }else{
                    onResponseCallback && onResponseCallback(response);
                }
            } catch (e:any) {

            }
    },[]);

    return {
        sendRequest, resetError, error, loading
    }
    

}

export default useHttpRequest;