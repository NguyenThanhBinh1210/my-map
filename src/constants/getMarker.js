export const getMarker = (map, setListLocation, uuidv4) => {
  map?.addListener("click", function (args) {
    let marker = new map4d.Marker({
      position: args.location,
      iconView: `<div style=\"width: 10px; height: 10px; background-color: white;border: 4px solid black;border-radius:100rem; text-align: center; \"></div>`,
    });
    marker.setMap(map);

    const markerValueNumber = [args.location.lat, args.location.lng];
    const locationMarker = markerValueNumber.join(", ");
    setListLocation((prev) => [
      ...prev,
      {
        id: uuidv4(),
        label: locationMarker,
      },
    ]);
  });
};
