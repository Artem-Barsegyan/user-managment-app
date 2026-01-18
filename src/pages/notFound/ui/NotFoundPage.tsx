import React from 'react';
import { Button, Result } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../app/App';

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

const CenteredResult = styled(Result)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
`;

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    const authContext = React.useContext(AuthContext);

    const handleBack = () => {
        if (authContext?.isAuth) {
            navigate(-1);
        } else {
            navigate('/login');
        }
    }

    return (
        <CenteredResult
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={
                <StyledButton
                    type='primary'
                    onClick={handleBack}>
                    Back Home
                </StyledButton>
            }
        />
    )
};

export default NotFoundPage;