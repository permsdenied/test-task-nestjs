import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PrismaService } from 'src/database/prisma.service';
import { EventsService } from 'src/events/events.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingsService {
    constructor(
        private prisma: PrismaService,
        private readonly eventsService: EventsService,
    ) {}

    async create(createBookingDto: CreateBookingDto) {
        const event = await this.eventsService.findOne(
            createBookingDto.event_id,
        );

        if (!event) {
            throw new BadRequestException('Событие не найдено');
        }

        const bookedCount = await this.prisma.booking.count({
            where: { event_id: createBookingDto.event_id },
        });

        if (bookedCount >= event.total_seats) {
            throw new BadRequestException('Нет свободных мест');
        }

        try {
            const createdBooking = await this.prisma.booking.create({
                data: createBookingDto,
            });

            return createdBooking;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(
                        'Этот пользователь уже забронировал место',
                    );
                }
            }

            throw new InternalServerErrorException('Внутреняя ошибка сервера');
        }
    }
}
