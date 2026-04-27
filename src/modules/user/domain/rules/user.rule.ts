import { ModuleRulesProps } from '@common/domain/rules/module-rule.interface';

export const UserRule: Record<
  'USERNAME' | 'PASSWORD' | 'EMAIL',
  ModuleRulesProps
> = {
  USERNAME: {
    FIELD: 'username',
    MAX: 50,
    MIN: 4,
    PATTERN: /^[a-z0-9_.]+$/,
    REQUIRED: true,
    TYPE: 'string',
  },
  PASSWORD: {
    FIELD: 'password',
    MAX: 50,
    MIN: 8,
    PATTERN: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
    REQUIRED: true,
    TYPE: 'string',
  },
  EMAIL: {
    FIELD: 'email',
    MAX: 100,
    MIN: 5,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    REQUIRED: true,
    TYPE: 'string',
  },
} as const;
