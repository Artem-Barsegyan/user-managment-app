import React from "react"
import styled from "styled-components";

const UserItem = styled.div`
    width: 100%;
    height: 90px;
    border-top: 1px solid #0000002e;
    display: flex;
    align-ites.center;
    column-gap: 15px;
    padding: 20px;

    img {
        width: 60px;
        height: 100%;
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;

        span:nth-child(1) {
            font-weight: 700;
        }

        span:nth-child(2) {
            color: #0000008f;
        }
    }
`;

export interface UserType {
    createdAt: string,
    name: string,
    avatar: string,
    id?: string
}

const User: React.FC<UserType> = ({ createdAt, name, avatar, id }) => {
    return (
        <div style={{ paddingInline: '25px 220px', backgroundColor: '#fff' }}>
            <UserItem key={id}>
                <div>
                    <img src={avatar} alt={name} />
                </div>
                <div>
                    <span>{name}</span>
                    <span>{createdAt}</span>
                </div>
            </UserItem>
        </div>
    )
}

export default User;