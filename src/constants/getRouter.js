import axios from "axios";

function getRouter(start, end, points, modeValue, weighting, setRouter) {
  async function getResults() {
    const results = await axios(
      `http://api.map4d.vn/sdk/route?key=c806ce773871e686ff4c5429d1ac56a6&origin=${start}&destination=${end}&points=${points}&mode=${modeValue}&weighting=${weighting}`
    );
    setRouter(results.data);
  }
  getResults();
}

export default getRouter;
