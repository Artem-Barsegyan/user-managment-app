import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../app/App';

const UsersPage: React.FC = () => {
    const [logOut, setLogOut] = React.useState(false);
    const navigate = useNavigate();
    const authContext = React.useContext(AuthContext);

    const handleLogout = () => {
        setLogOut(true);
        setTimeout(() => {
            localStorage.removeItem('token');
            authContext?.setIsAuth(false);
            navigate('/login');
        }, 2000)
    };

    return (
        <>
            <h1>Страница пользователей (заглушка)</h1>
            <button
                type="button"
                onClick={handleLogout}
                style={{ cursor: logOut ? 'progress' : 'pointer' }}>
                Выйти
            </button>
        </>
    )
};

export default UsersPage;