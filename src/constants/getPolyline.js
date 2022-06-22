export const getPolyline = (
  polylineGlobal,
  polyline,
  value,
  values,
  showAdd
) => {
  const someInputValue = values.some((value) => value === null);
  polylineGlobal?.setMap(null);
  polylineGlobal = null;
  if (!someInputValue && showAdd === true) {
    polyline.setMap(value);
  }
};
