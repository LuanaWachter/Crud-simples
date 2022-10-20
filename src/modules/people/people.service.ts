import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { PeopleDTO } from './people.dto';

@Injectable()
export class PeopleService {

    constructor (private prisma: PrismaService ) {}

    async create(data: PeopleDTO){ //cria o cadastro com nome email e data de nascimento 

        const registerExists = await this.prisma.person.findFirst({
            where:{
                email: data.email
            }
        })

        if (registerExists){
            throw new Error("Register already exists")
        }
        
        const person = await this.prisma.person.create ({
            data,
        });
        return person;
    }

    async findAll() {   //vai retornar todos os dados que estao no meu banco de dados
        return this.prisma.person.findMany();
    }

    async findByName(name: string) {
        return this.prisma.person.findFirst({
            where:{
                name,
            }
        })
    }

    async update(id: string, data: PeopleDTO){ 
        const personExists = await this.prisma.person.findUnique({  //encontra registro existente por id
            where:{
                id,
            },
        });

        if (!personExists){
            throw new Error('Register does not exist')
        }

        return await this.prisma.person.update({
            data,
            where: {
                id,
            }
        })
    }
    
    async delete(id: string){
        const personExists = await this.prisma.person.findUnique({  //encontra registro existente por id
            where:{
                id,
            },
        });

        if (!personExists){
            throw new Error('Register does not exist')
        }
        return await this.prisma.person.delete({
            where: {
                id
            }
        })
    }

}
