export const getPolyline = (valuePolyline, value, inputValue) => {
  // console.log(realPolyline);
  let polyline = new map4d.Polyline({
    path: inputValue.length > 1 ? valuePolyline : [],
    strokeColor: "#508ff4",
    strokeOpacity: 0.9,
    strokeWidth: 8,
  });

  // Thêm polyline vào bản đồ
  if (inputValue.some((value) => value === null)) {
    polyline.setMap(value);
  } else {
    polyline.setMap(value);
  }
};
