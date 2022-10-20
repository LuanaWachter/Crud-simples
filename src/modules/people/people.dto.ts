import { IsDate, IsDateString, IsEmail, IsOptional, IsString, IsUppercase, MinLength } from 'class-validator'


export class PeopleDTO {
    id? : string;

    @IsString()
    @MinLength(3)
    @IsUppercase()
    name: string;

    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsDateString({}, {message: "insert valid data"})
    dateOfBirth: Date;
}



