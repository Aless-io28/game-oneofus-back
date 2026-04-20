import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import User from '@modules/user/domain/model/user.model';
import UserRepository from '@modules/user/domain/repository/user-repository.interface';
import { type User as UserPrisma } from '@generated/prisma/client';

@Injectable()
export default class UserRepositoryAdapter implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string): Promise<User | null> {
    const userPrisma: UserPrisma | null = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!userPrisma) return null;
    return User.fromPersistence(
      userPrisma.userId,
      userPrisma.username,
      userPrisma.email,
      userPrisma.password,
      userPrisma.createdAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userPrisma: UserPrisma | null = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userPrisma) return null;
    return User.fromPersistence(
      userPrisma.userId,
      userPrisma.username,
      userPrisma.email,
      userPrisma.password,
      userPrisma.createdAt,
    );
  }

  async findByUsernameOrEmail(username: string, email: string) {
    const userPrisma: UserPrisma | null = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (!userPrisma) return null;
    return User.fromPersistence(
      userPrisma.userId,
      userPrisma.username,
      userPrisma.email,
      userPrisma.password,
      userPrisma.createdAt,
    );
  }

  async save(user: User): Promise<User> {
    await this.prisma.user.create({
      data: {
        username: user.getUsername(),
        email: user.getEmail(),
        password: user.getPassword(),
      },
    });

    return this.findByUsername(user.getUsername()) as Promise<User>;
  }
}
