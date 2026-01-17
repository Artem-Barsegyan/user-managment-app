import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { LoginPage, UsersPage } from 'pages';
import { QueryProvider } from './providers';
import './styles/global.css';

export const AuthContext = React.createContext<{
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
} | undefined>(undefined);

const App: React.FC = () => {
    const [isAuth, setIsAuth] = React.useState(false);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuth(!!token);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <QueryProvider>
                <BrowserRouter>
                    <ConfigProvider wave={{ disabled: true }}>
                        <div className='app-container'>
                            <Routes>
                                <Route path='/' element={<Navigate to={isAuth ? "/users" : "/login"} />} />
                                <Route path='/users' element={isAuth ? <UsersPage /> : <Navigate to='/login' />} />
                                <Route path='/login' element={isAuth ? <Navigate to='/users' /> : <LoginPage />} />
                            </Routes>
                        </div>
                    </ConfigProvider>
                </BrowserRouter>
            </QueryProvider>
        </AuthContext.Provider>
    );
};

export default App;