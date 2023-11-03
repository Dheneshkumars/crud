import axios from 'axios';


export const Login = async (params)=>{
    try{
        const response = await axios.get('/schema',params);
        console.log(response,"resp");
        return response;
    }
    catch(err){
        console.log(err)
    }
    
}