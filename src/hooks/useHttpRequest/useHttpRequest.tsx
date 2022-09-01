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

    const sendRequest = useCallback(async (url:string, onResponseCallback?:(response:any)=>any, config:configParams={method:"GET",headers:{}}) => {     
        try {
                config.method === "GET" && setLoading(true);
                const response = await fetch(url,{
                method:config.method,
                body:JSON.stringify(config.payload),
                headers:config.headers
                })
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                const data= await response.json();
                onResponseCallback && onResponseCallback(data);
            } catch (error:any) {
                console.log("error:"+error);
                setError(error.message)
            }
            config.method === "GET" && setLoading(false);
    },[]);

    return {
        sendRequest, error, loading
    }
    

}

export default useHttpRequest;