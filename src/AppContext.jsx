import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(
      JSON.parse(sessionStorage.getItem('user'))
    );

    const [loggedin, setLoggedin] = useState( currentUser !== null);

    const navigate = useNavigate();

    const logout = () => {
        setLoggedin(false);
        sessionStorage.removeItem('user');
        setCurrentUser(null);
        navigate('/login');
    }

    return <AppContext.Provider value={{loggedin, setLoggedin, logout, currentUser}}>

        {children}
    </AppContext.Provider>
};

const useAppContext = () => {return useContext(AppContext)};

export default useAppContext;
