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
  },
  PASSWORD: {
    FIELD: 'password',
    MAX: 50,
    MIN: 8,
    PATTERN: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
    REQUIRED: true,
  },
  EMAIL: {
    FIELD: 'email',
    MAX: 100,
    MIN: 5,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    REQUIRED: true,
  },
} as const;
