import { IsEnum, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  name: string;
  age: number;

  @IsEnum(['student', 'lecturer'], {
    message: 'Role must be student or lecturer',
  })
  role: string;
}
