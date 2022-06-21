export const getMarker = (map, setListLocation, uuidv4, setValues, values) => {
  if (values.some((item) => item === null)) {
    map?.addListener("click", (args) => {
      let marker = new map4d.Marker(
        {
          position: args.location,
          iconView: `<div style=\"width: 10px; height: 10px; background-color: white;border: 4px solid black;border-radius:100rem; text-align: center; \"></div>`,
        },
        { marker: true }
      );
      marker.setMap(map);

      const markerValueNumber = [args.location.lat, args.location.lng];
      const locationMarker = markerValueNumber.join(", ");

      const realValue = values.map((item) => {
        if (item === null) {
          return {
            id: uuidv4(),
            label: locationMarker,
          };
        } else {
          return item;
        }
      });
      setValues(realValue);
    });
  } else {
    map?.addListener("click", (args) => {
      let marker = new map4d.Marker(
        {
          position: args.location,
          iconView: `<div style=\"width: 10px; height: 10px; background-color: white;border: 4px solid black;border-radius:100rem; text-align: center; \"></div>`,
        },
        { marker: true }
      );
      marker.setMap(map);

      const markerValueNumber = [args.location.lat, args.location.lng];
      const locationMarker = markerValueNumber.join(", ");
      setListLocation([
        ...values,
        {
          id: uuidv4(),
          label: locationMarker,
        },
      ]);
      setValues([
        ...values,
        {
          id: uuidv4(),
          label: locationMarker,
        },
      ]);
    });
  }
};
