import { useRouter } from "next/router";
import Loading from "../components/loading";
import { useAuth } from "./auth";


export const RequireAuth = ({children}) => {
    const auth = useAuth();
    const router = useRouter();
    
    // if(!auth.loggedIn){
    //     if(auth.isLoading)
    //         return <Loading />
    //     // return <Navigate to="/login" state={{path: location.pathname}}/>
    //     router.push('/login')
    // }
    
    if(!auth.loggedIn){
        router.push('/login')
        // return <Navigate to="/login" state={{path: location.pathname}}/>  
    }
    return children
}
 