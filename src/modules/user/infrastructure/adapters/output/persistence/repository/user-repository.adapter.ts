import User from '@modules/user/domain/model/user.model';
import UserRepository from '@modules/user/domain/repository/user-repository.interface';

export default class UserRepositoryAdapter implements UserRepository {
  async findByUsername(username: string): Promise<User | null> {}
  async findByEmail(email: string): Promise<User | null> {}
  async findByUsernameOrEmail(username: string, email: string) {}
  async save(user: User): Promise<void> {}
}
