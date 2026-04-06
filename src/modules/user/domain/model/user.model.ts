import ValidatorError from '@common/error/validator.error';
import { UserRule } from '../rules/user.rule';
import { UserErrorCode } from '../errors/user.error';

class User {
  private userId: string | null;
  private username: string;
  private email: string;
  private password: string;
  private createdAt: Date | null;

  constructor(
    userId: string | null,
    username: string,
    email: string,
    password: string,
    createdAt: Date | null,
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }

  public static create(
    username: string,
    email: string,
    password: string,
  ): User {
    const validator = new ValidatorError();

    User.validateUsername(username, validator);
    User.validateEmail(email, validator);
    User.validatePassword(password, validator);

    validator.validate();

    return new User(
      null, // Generate or assign a userId here
      username,
      email,
      password,
      null, // Set createdAt to current date or assign it when saving to the database
    );
  }

  public static fromPersistence(
    userId: string,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
  ): User {
    return new User(userId, username, email, password, createdAt);
  }

  /**
   * VALIDATORS
   */

  // USERNAME
  static validateUsername(username: string, validator: ValidatorError) {
    const { MIN = 0, MAX, REQUIRED, PATTERN } = UserRule.USERNAME;

    if (REQUIRED && !username) {
      return validator.add({
        ...UserErrorCode.REQUIRED,
        field: UserRule.USERNAME.FIELD,
      });
    }

    if (username.length < MIN || username.length > MAX) {
      return validator.add(UserErrorCode.SIZE_USERNAME);
    }

    if (PATTERN && !PATTERN.test(username)) {
      return validator.add(UserErrorCode.INVALID_USERNAME);
    }
  }

  // EMAIL
  static validateEmail(email: string, validator: ValidatorError) {
    const { MIN = 0, MAX, REQUIRED, PATTERN } = UserRule.EMAIL;

    if (REQUIRED && !email) {
      return validator.add({
        ...UserErrorCode.REQUIRED,
        field: UserRule.EMAIL.FIELD,
      });
    }

    if (email.length < MIN || email.length > MAX) {
      return validator.add(UserErrorCode.SIZE_EMAIL);
    }

    if (PATTERN && !PATTERN.test(email)) {
      return validator.add(UserErrorCode.INVALID_EMAIL);
    }
  }

  // PASSWORD
  static validatePassword(password: string, validator: ValidatorError) {
    const { MIN = 0, MAX, REQUIRED, PATTERN } = UserRule.PASSWORD;

    if (REQUIRED && !password) {
      return validator.add({
        ...UserErrorCode.REQUIRED,
        field: UserRule.PASSWORD.FIELD,
      });
    }

    if (password.length < MIN || password.length > MAX) {
      return validator.add(UserErrorCode.SIZE_PASSWORD);
    }

    if (PATTERN && !PATTERN.test(password)) {
      return validator.add(UserErrorCode.INVALID_PASSWORD);
    }
  }

  /**
   * GETTERS
   */
  public getUserId(): string | null {
    return this.userId;
  }
  public getUsername(): string {
    return this.username;
  }
  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }
}

export default User;
