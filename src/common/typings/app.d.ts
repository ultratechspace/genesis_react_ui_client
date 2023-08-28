export interface INames {
  names: string[];
}

export interface IApi {
  error: string | null;
  isSuccess: boolean;
  success: boolean;
  value: any;
  status: any;
  errors: string | null;
  validationErrors: [];
  successMessage: string;
}

export type OptionalUtility<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
