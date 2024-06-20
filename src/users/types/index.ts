import { ApiProperty } from "@nestjs/swagger";

//Здесь описаны данные для респонсов и реквестов

export class LoginUserRequest {
    @ApiProperty({example: 'alex'})
    username: string;

    @ApiProperty({example: 'alex111'})
    password: string;
}

export class LoginUserResponse {
    @ApiProperty({example: {
        user:{
        userId: 1,
        username: 'alex',
        email: 'alex@mail.ru',
        role: true,
    }}})
    user:{
        userId: number;
        username: string;
        email: string;
        role: boolean;
    }

    @ApiProperty({example: 'Logged in'})
    msg: string;
}

export class LogoutUserResponse {
    @ApiProperty({example: 'Session ended'})
    msg: string;
}

export class LoginCheckResponse {
    @ApiProperty({example: 3})
    userId: number;

    @ApiProperty({example: 'alex'})
    username: string;

    @ApiProperty({example: 'alex@mail.ru'})
    email: string;

    @ApiProperty({example: true})
    role: boolean;
}

/*
{
    "id": 3,
    "username": "admin2",
    "email": "admin2@mail.ru",
    "password": "$2b$10$lI57o2xVzwHZJmzK4HhvBuzphq8Mv3Dnf9NvniGyB0b.jz.NGffNW",
    "role": true,
    "updatedAt": "2024-03-24T17:04:50.240Z",
    "createdAt": "2024-03-24T17:04:50.240Z"
}
*/

export class SignupResponse {
    @ApiProperty({example: 3})
    id: number;

    @ApiProperty({example: 'alex'})
    username: string;

    @ApiProperty({example: 'alex@mail.ru'})
    email: string;

    @ApiProperty({example: '$2b$10$lI57o2xVzwHZJmzK4HhvBuzphq8Mv3Dnf9NvniGyB0b'})
    password: string;

    @ApiProperty({example: true})
    role: boolean;

    @ApiProperty({example: '2024-03-24T17:04:50.240Z'})
    updatedAt: string;

    @ApiProperty({example: '2024-03-24T17:04:50.240Z'})
    createdAt: string;
}