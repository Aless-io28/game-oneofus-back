import { ErrorCode } from '@common/error/error-code.interface';

export interface ModuleRulesProps {
  FIELD: string;
  MAX: number;
  MIN?: number;
  PATTERN?: RegExp;
  REQUIRED: boolean;
  TYPE: 'string' | 'number' | 'boolean' | 'date';
}

// Para el mapeador de errores por regla
export interface ModuleRulesMapErrorProps {
  size: ErrorCode;
  required: ErrorCode;
  pattern: ErrorCode;
}
