export const getPolyline = (
  polylineGlobal,
  polyline,
  value,
  values,
  listPolylineGlobal
) => {
  const someInputValue = values.some((value) => value === null);
  listPolylineGlobal?.map((item) => {
    item?.setMap(null);
    item = null;
  });
  polylineGlobal?.setMap(null);
  polylineGlobal = null;
  if (!someInputValue) {
    listPolylineGlobal?.map((item) => {
      item?.setMap(null);
      item = null;
    });
    polyline.setMap(value);
  }
};
