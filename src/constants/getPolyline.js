export const getPolyline = (polylineGlobal, polyline, value, inputValue) => {
  const someInputValue = inputValue.some((value) => value === null);
  polylineGlobal?.setMap(null);
  polylineGlobal = null;
  if (!someInputValue) {
    polyline.setMap(value);
  }
};
