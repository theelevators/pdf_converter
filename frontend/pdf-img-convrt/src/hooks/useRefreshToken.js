import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth();
    const refresh = async () => {

        const response = await axios.get('/refresh', {
            withCredentials: true,
        },
        );

        setAuth(prev => {
            return { ...prev, token: response.data.token, userName: response.data.user }
            
        })
        return response.data.token
    }
    return refresh
}

export default useRefreshToken;