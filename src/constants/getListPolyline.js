export const getListPolyline = (
  listPolylineGlobal,
  listP,
  value,
  values,
  polylineGlobal
) => {
  const someInputValue = values.some((value) => value === null);
  listPolylineGlobal?.map((item) => {
    item?.setMap(null);
    item = null;
  });
  polylineGlobal?.setMap(null);
  polylineGlobal = null;
  if (!someInputValue) {
    polylineGlobal?.setMap(null);
    polylineGlobal = null;
    listP?.map((item) => {
      item?.setMap(value);
    });
  }
};
