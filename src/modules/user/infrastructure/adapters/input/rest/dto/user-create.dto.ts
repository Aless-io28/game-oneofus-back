import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty({ message: 'generic.errors.fields.required' })
  username!: string;

  @IsNotEmpty({ message: 'generic.errors.fields.required' })
  email!: string;

  @IsNotEmpty({ message: 'generic.errors.fields.required' })
  password!: string;
}
