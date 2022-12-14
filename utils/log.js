const log = (...args) => console.log(...args);
const error = (err) => console.error(err);
const logNow = (...args) => log(new Date().toLocaleTimeString(), ...args);
const logError = (err) => logNow(`${err.name}: ${err.message}`);

module.exports = {
  logNow, error, logError,
};
