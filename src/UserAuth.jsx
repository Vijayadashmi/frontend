import React, { useState } from 'react'
import useAppContext from './AppContext';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const UserAuth = ({children}) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
    );

    if(currentUser!==null){
        return children;
    }else{
        Swal.fire({
            icon:'error',
            title:'Permission Denied',
            text: 'You Need to Login First!!'
        });

        return <Navigate to="/login" />
    }
 
}

export default UserAuth;