// Get Current Time
const getCurrentTime = () => {
  let today = new Date();

  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let prepand = hour >= 12 ? "PM" : "AM";
  hour = hour >= 12 ? hour - 12 : hour;
  if (hour === 0 && prepand === "PM") {
    if (minutes === 0 && seconds === 0) {
      hour = 12;
      prepand = "Noon";
    } else {
      hour = 12;
      prepand = "PM";
    }
  }
  if (hour === 0 && prepand === "AM") {
    if (minutes === 0 && seconds === 0) {
      hour = 12;
      prepand = "Midnight";
    } else {
      hour = 12;
      prepand = "AM";
    }
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const currentTime = hour + ":" + minutes + " " + prepand;
  return currentTime;
};

export default { getCurrentTime };
