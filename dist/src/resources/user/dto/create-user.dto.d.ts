import { Role } from 'src/auth/roles.enum';
export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    role: Role;
    profileImage: string;
}
