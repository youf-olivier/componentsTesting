export const computeErrors = state =>
  Object.keys(state).reduce((acc, key) => {
    const input = state[key];
    if (input.message && input.message !== '') {
      return [...acc, { label: input.label, id: input.id }];
    }
    return acc;
  }, []);
