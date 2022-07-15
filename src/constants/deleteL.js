const deleteL = (item, setItem, index) => {
  const newItem = [...item];
  newItem.splice(index, 1);
  setItem(newItem);
};

export default deleteL;
