import { ErrorCode } from '@common/error/error-code.interface';
import { CategoryRule } from '../rules/cateogry.rule';

export const CategoryErrorCode = {
  // DOMAIN FIELDS
  REQUIRED: {
    code: 'USER_REQ',
    message: 'generic.errors.fields.required',
    status: 400,
  },

  NAME_SIZE: {
    code: 'CATG_SNA',
    message: 'generic.errors.fields.string.between',
    status: 400,
    field: CategoryRule.NAME.FIELD,
    args: {
      min: CategoryRule.NAME.MIN,
      max: CategoryRule.NAME.MAX,
    },
  },
  NAME_INVALID: {
    code: 'CATG_INA',
    message: 'generic.errors.fields.string.invalid',
    status: 400,
    field: CategoryRule.NAME.FIELD,
  },
} as const satisfies Record<string, ErrorCode>;
