const swap = (item, setItem) => {
  const newItems = [...item];
  [newItems[0], newItems[1]] = [newItems[1], newItems[0]];
  setItem(newItems);
};

export default swap;
