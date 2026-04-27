import { ModuleRulesProps } from '@common/domain/rules/module-rule.interface';

export const CategoryRule: Record<'NAME', ModuleRulesProps> = {
  NAME: {
    FIELD: 'name',
    MAX: 100,
    MIN: 1,
    PATTERN: /^[a-zA-Z]+$/,
    REQUIRED: true,
    TYPE: 'string',
  },
};
