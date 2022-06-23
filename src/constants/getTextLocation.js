import axios from "axios";

export default function getTextLocation(location, values, setListText, arr) {
  async function getResults() {
    const results = await axios(
      `https://api.map4d.vn/sdk/v2/geocode?key=c806ce773871e686ff4c5429d1ac56a6&location=${location}
          `
    );
    arr.push(results.data.result[0]?.address);
    console.log(arr);
    const newValues = [...values];
    const finalValue = newValues.map((item, index) => {
      return {
        id: item.id,
        label: item.label,
        name: arr[index],
      };
    });
    setListText(finalValue);
  }
  getResults();
}
