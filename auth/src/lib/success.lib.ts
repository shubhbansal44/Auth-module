export let globalSuccess: any = null;

export const setGlobalSuccess = (sucess: any) => {
  globalSuccess = sucess;
};

export const getGlobalSuccess = () => {
  return globalSuccess;
};
