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
                let data = null;
                if(response.status !== 204){
                    data = await response.json();
                }
                if(!response.ok){
                    console.log("not ok")
                    if(data){
                        throw new Error(data.detail);
                    }else{
                        throw new Error(response.statusText);
                    }
                }
                if(data){
                    onResponseCallback && onResponseCallback(data);
                }else{
                    onResponseCallback && onResponseCallback(response);
                }
            } catch (e:any) {
                
                setError(e.message)
            }
            config.method === "GET" && setLoading(false);
    },[]);

    return {
        sendRequest, resetError, error, loading
    }
    

}

export default useHttpRequest;