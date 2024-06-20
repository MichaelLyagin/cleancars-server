import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService){}

    async validateUser(username: string, password: string){
        const user = await this.usersService.findOne({where: {username}});

        if(!user){
            throw new UnauthorizedException('Invalid login');
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if(!passwordValid){
            throw new UnauthorizedException('Invalid password')
        }

        if(user && passwordValid){
            return {
                userId: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        }

        return null;
    }
}
