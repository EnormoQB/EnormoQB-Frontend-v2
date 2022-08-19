export const titleCase = (str) => {
  const strng = typeof str === 'string' ? str : '';
  return strng.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

export const getToast = ({
  id = 'general',
  title = 'Success',
  description = 'Hello',
  status = 'success',
  duration = 3000,
}) => ({
  id,
  title,
  position: 'top-right',
  description,
  status,
  duration,
  isClosable: true,
});
