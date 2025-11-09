import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [BookingsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
