import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity/user.entity';
import { log } from 'console';

@Injectable()
export class UsersService {
  createQueryBuilder(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(
    Name: string,
    Email: string,
    Age: number,
    DateofBirth: Date,
    req,
    res,
  ): Promise<User> {
    try {
      let success = false;

      const PreviousUseremail = await this.usersRepository.findOne({
        where: { Email },
      });
      const PreviousUserName = await this.usersRepository.findOne({
        where: { Name },
      });
      if (PreviousUseremail) {
        success = false;
        return res.status(400).send({
          success,
          message: `A user with the email ${Email} already exists.`,
        });
      } else if (PreviousUserName) {
        success = false;
        return res.status(400).send({
          success,
          message: `A user with the Name ${Name} already exists.`,
        });
      } else {
        success = true;
        const newUser = await this.usersRepository.save({
          Name,
          Age,
          Email,
          DateofBirth,
        });
        console.log('User have been successfully added');
        return res.status(201).json({
          success,
          message: 'User have been added successfully',
          newUser,
        });
      }
    } catch (error) {
      // Handle specific database-related errors or validation errors
      console.log('error', error);
      return res.status(500).json({ message: error.message });
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      // Handle specific database-related errors
      throw new BadRequestException(
        'Failed to retrieve users. Please try again later.',
      );
    }
  }

  async getUser(userId: number): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({
        select: ['Name', 'DateofBirth', 'Age'],
        where: [{ Id: userId }],
      });
    } catch (error) {
      // Handle specific database-related errors
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  }

  async updateUser(user: User): Promise<void> {
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      // Handle specific database-related errors or validation errors
      throw new BadRequestException(
        'Failed to update user. Please check the provided data.',
      );
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      // Handle specific database-related errors
      throw new BadRequestException(
        'Failed to retrieve users. Please try again later.',
      );
    }
  }
  async getRepository(): Promise<Repository<User>> {
    return this.usersRepository;
  }
  async findall(option, req, res): Promise<User[]> {
    try {
      let success = false;
      const user = await this.usersRepository.find(option);

      if (!user) throw new Error('No product found');
      success = true;
      return res.status(400).send({
        success,
        message: `query generated successfully`,
      });
    } catch (error) {
      log(error, 'error');
      return res.status(500).json({ message: error.message });
    }
  }
}
