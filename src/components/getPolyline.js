export const getPolyline = (valuePolyline, value, inputValue) => {
  const someInputValue = inputValue.some((value) => value === null);
  if (someInputValue) {
    let polyline = new map4d.Polyline({
      path: inputValue.length > 1 ? valuePolyline : [],
      strokeColor: "#508ff4",
      strokeOpacity: 0.9,
      strokeWidth: 8,
    });
    polyline.setMap(null);
    console.log("ok");
  }
  let polyline = new map4d.Polyline({
    path: inputValue.length > 1 ? valuePolyline : [],
    strokeColor: "#508ff4",
    strokeOpacity: 0.9,
    strokeWidth: 8,
  });
  polyline.setMap(value);
};

// const inputValueDefault = [...inputValue];
// const everyInputValue =
//   inputValue.length === inputValueDefault.length &&
//   inputValue.every((value, index) => value === inputValueDefault[index]);
