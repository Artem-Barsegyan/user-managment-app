import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { AuthContext } from '../../../app/App';
import { User } from 'entities/user';
import { useUsers } from '../lib/useUsers';

const StyledButton = styled(Button)`
  background-color: #5d82af !important;
  border-color: #5d82af !important;
  box-shadow: none !important;
  
  &:active {
    background-color: #4a6d9a !important;
    border-color: #4a6d9a !important;
    box-shadow: none !important;
    transform: none !important;
  }
`;

const Header = styled.header`
  width: 100%;
  padding: 30px 20px;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const UsersContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  > div:first-child > div:first-child {
    border-top: none;
  }

  div:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const UsersPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [logOut, setLogOut] = React.useState(false);
  const navigate = useNavigate();
  const authContext = React.useContext(AuthContext);
  const { data: users, isLoading, error } = useUsers();

  const handleLogout = () => {
    setLogOut(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      authContext?.setIsAuth(false);
      navigate('/login');
    }, 2000)
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  }

  return (
    <div style={{ paddingTop: '50px', marginBottom: '50px' }}>
      <Header>
        <StyledButton
          type="primary"
          onClick={handleLogout}
          style={{ cursor: logOut ? 'progress' : 'pointer' }}>
          Выход
        </StyledButton>
      </Header>
      <UsersContainer>
        {users?.map(({ createdAt, name, avatar, id }) => {
          const formattedDate = dayjs(createdAt).format('DD.MM.YYYY');
          return (
            <User
              createdAt={formattedDate}
              name={name}
              avatar={avatar}
              key={id} />
          )
        })}
      </UsersContainer>
      <StyledButton
        type="primary"
        style={{ cursor: 'pointer' }}
        onClick={handleCreateClick}>
        Создать пользователя
      </StyledButton>
    </div>
  )
};

export default UsersPage;