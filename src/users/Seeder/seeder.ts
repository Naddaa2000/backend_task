import { seeder } from 'nestjs-seeder';
import { UserSeeder } from './user.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity/user.entity';

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass@123N',
      database: 'my_nestjs_project',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
}).run([UserSeeder]);
