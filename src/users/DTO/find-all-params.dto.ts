import {
  IsInt,
  IsString,
  IsOptional,
  IsDate,
  IsISO8601,
  IsDateString,
  IsNumber,
  IsIn,
  isString,
} from 'class-validator';
import { isDate } from 'util/types';

export class FindAllParams {
  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  page?: number = 1;

  @IsOptional()
  @IsNumber({}, { message: 'PageSize must be a number' })
  pageSize?: number = 10;

  @IsOptional()
  @IsString({ message: 'SortField must be a string' })
  sortField?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'SortOrder must be ASC or DESC' })
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  Name?: string;

  @IsOptional()
  @IsString({ message: 'Email must be a string' })
  Email?: string;

  @IsOptional()
  @IsString({ message: 'DateofBirth must be a in YYY-MM-DD number format' })
  DateofBirth?: string;

  @IsOptional()
  @IsString({ message: 'From  must be a in YYY-MM-DD number format' })
  From?: string;

  @IsOptional()
  @IsString({ message: 'To  must be a in YYY-MM-DD number format' })
  To?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Age must be a number' })
  Age?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Id must be a number' })
  Id?: number;
}
