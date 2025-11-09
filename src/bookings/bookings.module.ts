import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseModule } from 'src/database/database.module';
import { EventsService } from 'src/events/events.service';

@Module({
    imports: [DatabaseModule],
    controllers: [BookingsController],
    providers: [BookingsService, EventsService],
})
export class BookingsModule {}
