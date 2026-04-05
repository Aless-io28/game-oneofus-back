import { ModuleRulesProps } from '@common/domain/rules/module-rule.interface';

export const UserRule: Record<string, ModuleRulesProps> = {
  USERNAME: {
    MAX: 50,
    MIN: 4,
    PATTERN: /^[a-z0-9_.]+$/,
    REQUIRED: true,
  },
  PASSWORD: {
    MAX: 100,
    MIN: 8,
    PATTERN: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
    REQUIRED: true,
  },
  EMAIL: {
    MAX: 255,
    MIN: 5,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    REQUIRED: true,
  },
} as const;
