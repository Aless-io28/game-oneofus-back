import { ErrorCode } from './error-code.interface';

const SYSTEM_ERROR_CODE = {
  SYSTEM_ERROR: {
    code: 'SYSTEM_ERROR',
    message: 'An internal system error occurred',
    status: 500,
  },
  AUTH_TOKEN_MISSING: {
    code: 'AUTH_TOKEN_MISSING',
    message: 'Authentication token is missing',
    status: 401,
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Unauthorized access',
    status: 401,
  },
} as const satisfies Record<string, ErrorCode>;

export default SYSTEM_ERROR_CODE;
