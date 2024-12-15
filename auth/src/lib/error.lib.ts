interface error {
  message: string;
  status: number;
  success: boolean;
}

export let globalError: error | null = null;

export const setGlobalError = (error: error | null) => {
  globalError = error;
};

export const getGlobalError = () => {
  return globalError;
};
