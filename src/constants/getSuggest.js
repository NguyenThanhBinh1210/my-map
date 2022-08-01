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
      let indexSuggest = suggest.findIndex((item) => item === null);
      if (suggest.some((item) => item === null)) {
        const newSuggest = [...suggest];
        newSuggest.splice(indexSuggest, 1, finalSuggest);
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
