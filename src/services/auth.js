
import axios from "../api/axios"
const AUTH_API='/users'
export const login = async(user) =>{
    const response = await axios.post(AUTH_API+ '/login', user);
    return response.data;
}

export const register = async(user) =>{
    return (await axios.post(AUTH_API+ '/register', user)).data;
}

export const getProfile = async() =>{
    axios.interceptors.request.use((config) =>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = 'Bearer '+token;
        }
        return config;
    });
    
    const profile = await axios.get(AUTH_API+'/userProfile');
    return profile.data;
}
export const logout = async() =>{
    try{
        const token = localStorage.getItem('token');
        const res = await axios.post(AUTH_API+'/logout',{},{
            headers: {
                Authorization: 'Bearer '+token
            }
        });
        return res.data;
        
    } catch(error){
        console.log(error);
    };
}