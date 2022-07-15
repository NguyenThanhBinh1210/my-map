import axios from "axios";

function getSuggest(index, text, suggest, setSuggest) {
  async function getResults() {
    if (text) {
      const results = await axios(
        `http://api.map4d.vn/sdk/autosuggest?key=c806ce773871e686ff4c5429d1ac56a6&text=${text}&location=16.072163491469226,108.22690536081757`
      );
      const finalSuggest = results.data.result.map((item) => {
        return {
          id: item.id,
          label: [item.location.lat, item.location.lng].join(", "),
          name: item.name,
          address: item.address,
          location: {
            lat: item.location.lat,
            lng: item.location.lng,
          },
        };
      });

      if (suggest.some((item) => item === null)) {
        const newSuggest = suggest.map((item) => {
          if (item === null) {
            return finalSuggest;
          } else {
            return item;
          }
        });
        setSuggest(newSuggest);
      } else {
        const newSuggest = [...suggest];
        newSuggest.splice(index, 1, finalSuggest);
        setSuggest(newSuggest);
      }
    }
  }
  getResults();
}

export default getSuggest;
