// eslint-disable-next-line import/prefer-default-export
export const titleCase = (str) => {
  const strng = typeof str === 'string' ? str : '';
  return strng.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};
