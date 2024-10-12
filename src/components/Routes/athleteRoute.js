import { useSelector } from "react-redux";


const AthleteRoute = ({children})=> {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated) ;

    if(isAuthenticated){
        return children ;
    }
}

export default AthleteRoute ;