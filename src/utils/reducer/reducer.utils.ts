export const createAction = <T extends string, P>(type: T, payload: P) => ({
  type,
  payload,
});
