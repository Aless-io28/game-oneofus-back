import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty({ message: 'generic.errors.fields.required' })
  email!: string;

  @IsNotEmpty({ message: 'generic.errors.fields.required' })
  password!: string;
}
