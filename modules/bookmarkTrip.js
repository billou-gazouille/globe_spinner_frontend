const { ipAddress, port } = require("../myVariables");

const toggleBookmarkTrip = (tripIndex, isBookmarked, isConnected) => {
  if (!isConnected) {
    return { result: false };
  }
  const url = `http://${ipAddress}:${port}/users/${userInfo.token}/saveTrip/${tripIndex}`;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.result) {
        return { result: false };
      }
      return { result: true, isBookmarked: !isBookmarked };
    });
};

export default toggleBookmarkTrip;
