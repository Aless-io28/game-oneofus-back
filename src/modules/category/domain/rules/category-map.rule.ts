import { ModuleRulesMapErrorProps } from '@common/domain/rules/module-rule.interface';
import { CategoryErrorCode } from '../error/category.error';

export const CategoryMapError = {
  NAME: {
    size: CategoryErrorCode.NAME_SIZE,
    pattern: CategoryErrorCode.NAME_INVALID,
    required: CategoryErrorCode.REQUIRED,
  },
} as const satisfies Record<string, ModuleRulesMapErrorProps>;
