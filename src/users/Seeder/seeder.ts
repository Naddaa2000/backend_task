import { seeder } from 'nestjs-seeder';
import { UserSeeder } from './user.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity/user.entity';
import { ConfigModule } from '@nestjs/config';

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    TypeOrmModule.forFeature([User]),
  ],
}).run([UserSeeder]);
