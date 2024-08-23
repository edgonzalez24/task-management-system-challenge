import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Add ConfigModule to use the .env file
    ConfigModule.forRoot(),
    // Setup the database connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Load all entities from the entities folder (.entity.ts files)
      synchronize: true, // Synchronize the database schema with the entities (drops and creates tables)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
