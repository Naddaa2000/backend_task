import { DataFactory, Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity/user.entity';

export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    const users = DataFactory.createForClass(User).generate(100);
    return this.usersRepository.save(users);
  }

  async drop(): Promise<any> {
    return this.usersRepository.delete({});
  }

  private generateRandomDate(start: Date, end: Date): string {
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
    return randomDate.toISOString().split('T')[0];
  }
}
