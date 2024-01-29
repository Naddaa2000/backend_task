import { randomInt } from 'crypto';
import { Factory } from 'nestjs-seeder';
import { raceInit } from 'rxjs/internal/observable/race';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Factory((faker) => faker.lorem.word(5))
  @Column({ length: 25 })
  Name: string;

  @Factory((faker) => randomInt(10, 100))
  @Column()
  Age: number;

  @Factory((faker) => faker.internet.email())
  @Column()
  Email: string;

  @Factory((faker) =>
    faker.date.between({ from: '2000-01-01', to: '2030-01-01' }),
  )
  @Column('date')
  DateofBirth: Date;
  @BeforeInsert()
  calculateAge() {
    // Calculate age based on DateofBirth
    if (this.DateofBirth) {
      const today = new Date();
      const birthDate = new Date(this.DateofBirth);

      let age = today.getFullYear() - birthDate.getFullYear();

      // Check if birthday has occurred this year
      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      this.Age = age;
    } else {
      // Set a default value for Age if DateofBirth is not available
      this.Age = 0; // Replace with your desired default value
    }
  }
}
