import axios from "axios";

export async function fetchFunc (url){
    try {
        const res = await axios.get(url)
        return res.data
    }catch(error){
        return error;
    }
}