export const getMarker = (map, setListLocation, uuidv4) => {
  map.addListener("click", function (args) {
    let marker = new map4d.Marker({
      position: args.location,
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
