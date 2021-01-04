let localId = 0;

export default (): number => {
  localId -= 1;
  return localId;
};
