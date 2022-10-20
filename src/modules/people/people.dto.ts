import { IsEmail, IsString, MinLength } from 'class-validator'


export class PeopleDTO {
    id? : string;

    @IsString()
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;
    
    dateOfBirth: Date;
}



