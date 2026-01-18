import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Button, Form, Input, notification } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';

import { AuthContext } from '../../../app/App';

type FieldType = {
    username?: string;
    password?: string;
};

const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 450px;
  width: 90%;
  background-color: #fff;
  padding: 20px 35px;
  border-radius: 12px;
`;

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

const LoginPage: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const authContext = React.useContext(AuthContext);

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const fakeAuth = (username: string, password: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                username === 'admin' && password === 'admin' ? resolve('token') : reject(new Error('Неверный логин или пароль'))
            }, 2000)
        })
    }

    const loginMutation = useMutation({
        mutationFn: ({ username, password }: { username: string; password: string }) => fakeAuth(username, password),
        onError: (error) => {
            api.error({
                message: 'Ошибка авторизации',
                description: error.message,
            })
        },
        onSuccess: (token) => {
            localStorage.setItem('token', token);
            authContext?.setIsAuth(true);
            navigate('/users');
        }

    });

    const onFinish = (values: FieldType) => {
        loginMutation.mutate({
            username: values.username || '',
            password: values.password || '',
        });
    };

    return (
        <>
            {contextHolder}
            <FormWrapper>
                <Form
                    name='basic'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                    style={{ width: '100%' }}
                >
                    <h1
                        style={{ fontSize: '20px' }}>Авторизация</h1>
                    <Form.Item<FieldType>
                        name='username'
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            placeholder='Логин' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder='Пароль' />
                    </Form.Item>

                    <Form.Item
                        label={null}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                        <StyledButton
                            style={{
                                color: loginMutation.isPending ? '#fff' : '',
                                opacity: loginMutation.isPending ? '0.5' : '1',
                                cursor: loginMutation.isPending ? 'progress' : 'pointer'
                            }}
                            type='primary'
                            htmlType='submit'
                            disabled={loginMutation.isPending}>
                            Войти
                        </StyledButton>
                    </Form.Item>
                </Form>
            </FormWrapper>
        </>
    )
};

export default LoginPage;