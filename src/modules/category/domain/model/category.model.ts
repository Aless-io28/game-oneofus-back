import ValidatorError from '@common/error/validator.error';
import { CategoryRule } from '../rules/cateogry.rule';
import {
  ModuleRulesMapErrorProps,
  ModuleRulesProps,
} from '@common/domain/rules/module-rule.interface';
import { ErrorCode } from '@common/error/error-code.interface';

class Category {
  private categoryId: string | null;
  private name: string;

  constructor(categoryId: string | null, name: string) {
    this.categoryId = categoryId;
    this.name = name;
  }

  public static create(categoryId: string | null, name: string) {
    return new Category(null, name);
  }

  public static fromPersistence(categoryId: string | null, name: string) {
    return new Category(categoryId, name);
  }

  /**
   * VALIDACIONES
   */
  static validateField({
    rules,
    map,
    errors,
    validator,
  }: {
    rules: Record<string, ModuleRulesProps>;
    map: Record<string, ModuleRulesMapErrorProps>;
    errors: Record<string, ErrorCode>;
    validator: ValidatorError;
  }) {
    Object.entries(rules).forEach(([key, value]) => {
      const { FIELD, MAX, MIN, REQUIRED, PATTERN } = value;
    });
  }
}

export default Category;
