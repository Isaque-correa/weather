const geolocation = (callback) => {
  const success = (position) => {
    callback(position);
  };
  const error = (err) => {
    alert(err.message);

    callback(undefined);
  };
  navigator.geolocation.getCurrentPosition(success, error);
};

export { geolocation };
