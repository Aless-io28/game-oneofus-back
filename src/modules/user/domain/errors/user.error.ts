import { ErrorCode } from '@common/error/error-code.interface';
import { UserRule } from '../rules/user.rule';

export const UserErrorCode = {
  USER_EXISTS: {
    code: 'USER_000',
    message: 'user.exception.exists',
    status: 400,
  },
  EMAIL_EXISTS: {
    code: 'USER_001',
    message: 'user.email.exists',
    status: 400,
    field: UserRule.EMAIL.FIELD,
  },
  USERNAME_EXISTS: {
    code: 'USER_002',
    message: 'user.username.exists',
    status: 400,
    field: UserRule.USERNAME.FIELD,
  },
  INVALID_CREDENTIALS: {
    code: 'USER_003',
    message: 'user.invalid.credentials',
    status: 401,
  },
  USER_NOT_FOUND: {
    code: 'USER_005',
    message: 'user.not.found',
    status: 404,
  },

  // DOMAIN FIELDS
  REQUIRED: {
    code: 'USER_REQ',
    message: 'generic.errors.fields.required',
    status: 400,
  },

  // Username
  INVALID_USERNAME: {
    code: 'USER_IUS',
    message: 'generic.errors.fields.string.invalid.simple',
    status: 400,
    field: UserRule.USERNAME.FIELD,
  },
  SIZE_USERNAME: {
    code: 'USER_SUS',
    message: 'generic.errors.fields.string.between',
    status: 400,
    field: UserRule.USERNAME.FIELD,
    args: {
      min: UserRule.USERNAME.MIN,
      max: UserRule.USERNAME.MAX,
    },
  },
  // Email
  INVALID_EMAIL: {
    code: 'USER_IEM',
    message: 'generic.errors.fields.string.invalid.email',
    status: 400,
    field: UserRule.EMAIL.FIELD,
  },
  SIZE_EMAIL: {
    code: 'USER_SEM',
    message: 'generic.errors.fields.string.between',
    status: 400,
    field: UserRule.EMAIL.FIELD,
    args: {
      min: UserRule.EMAIL.MIN,
      max: UserRule.EMAIL.MAX,
    },
  },
  // Password
  INVALID_PASSWORD: {
    code: 'USER_IPS',
    message: 'generic.errors.fields.string.invalid.password',
    status: 400,
    field: UserRule.PASSWORD.FIELD,
  },
  SIZE_PASSWORD: {
    code: 'USER_SPS',
    message: 'generic.errors.fields.string.between',
    status: 400,
    field: UserRule.PASSWORD.FIELD,
    args: {
      min: UserRule.PASSWORD.MIN,
      max: UserRule.PASSWORD.MAX,
    },
  },
} as const satisfies Record<string, ErrorCode>;
