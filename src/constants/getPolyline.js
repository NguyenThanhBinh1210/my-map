export const getPolyline = (
  polylineGlobal,
  polyline,
  value,
  values,
  listValue
) => {
  const someInputValue = values.some((value) => value === null);
  polylineGlobal?.setMap(null);
  polylineGlobal = null;
  if (!someInputValue) {
    polyline.setMap(value);
  }
};
