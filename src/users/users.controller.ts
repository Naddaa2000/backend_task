import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Query,
  ParseIntPipe,
  BadRequestException,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { FindAllParams } from './DTO/find-all-params.dto';

@Controller('/api/user')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post()
  create(
    @Body('Name') Name: string,
    @Body('Email') Email: string,
    @Body('Age') Age: number,
    @Body('DateofBirth') DateofBirth: Date,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.UsersService.createUser(
      Name,
      Email,
      Age,
      DateofBirth,
      req,
      res,
    );
  }

  @Post('/find')
  async findall(@Query() queryParams: FindAllParams) {
    try {
      const validatedParams = await plainToClass(FindAllParams, queryParams, {
        enableImplicitConversion: true,
      });

      const validationErrors = await validate(validatedParams);
      if (validationErrors.length > 0) {
        console.log('Validation Errors:', validationErrors);
        const errorResponse = {
          error: 'Bad Request',
          message: 'Validation failed',
          statusCode: HttpStatus.BAD_REQUEST,
          validationErrors: validationErrors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          })),
        };
        return errorResponse;
      }

      const userRepository = this.UsersService.getRepository();
      const queryBuilder = (await userRepository)
        .createQueryBuilder('User')
        .offset((validatedParams.page - 1) * validatedParams.pageSize)
        .limit(validatedParams.pageSize);

      if (validatedParams.sortField && validatedParams.sortOrder) {
        queryBuilder.orderBy(
          `User.${validatedParams.sortField}`,
          validatedParams.sortOrder,
        );
      }

      if (validatedParams.Name) {
        queryBuilder.andWhere('User.Name LIKE :Name', {
          Name: `%${validatedParams.Name}%`,
        });
      }

      if (validatedParams.Email) {
        queryBuilder.andWhere('User.Email LIKE :Email', {
          Email: `%${validatedParams.Email}%`,
        });
      }

      if (validatedParams.DateofBirth) {
        queryBuilder.andWhere('User.DateofBirth = :DateofBirth', {
          DateofBirth: `${validatedParams.DateofBirth}`,
        });
      }

      if (validatedParams.From) {
        queryBuilder.andWhere('User.DateofBirth >= :dobFrom', {
          dobFrom: validatedParams.From,
        });
      }

      if (validatedParams.To) {
        queryBuilder.andWhere('User.DateofBirth <= :dobTo', {
          dobTo: validatedParams.To,
        });
      }

      if (validatedParams.Age) {
        queryBuilder.andWhere('User.Age = :Age', {
          Age: validatedParams.Age,
        });
      }
      if (validatedParams.Id) {
        queryBuilder.andWhere('User.Id = :Id', {
          Id: validatedParams.Id,
        });
      }

      const [data, totalRecords] = await queryBuilder.getManyAndCount();
      const totalPages = Math.ceil(totalRecords / validatedParams.pageSize);

      return {
        data,
        totalRecords,
        currentPage: validatedParams.page,
        totalPages,
      };
    } catch (error) {
      console.error('error', error);
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
