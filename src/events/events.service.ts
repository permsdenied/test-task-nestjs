import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EventsService {
    constructor(
        private prisma: PrismaService
    ){}

    async create(createEventDto: CreateEventDto) {

        return this.prisma.event.create({
            data: createEventDto
        })

    }

    async findAll() {
        return this.prisma.event.findMany()
    }

    async findOne(id: number){

        return this.prisma.event.findFirst({
            where: {
                id
            }
        })

    }
    

}
