function getFormattedMySqlDateTime(dateTime) {
  let date = new Date(dateTime);
  date.setHours(date.getHours() + 7);
  const formattedDateTime = date
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);
  return formattedDateTime;
}

function getFormattedTaskTime(dateTime, type) {
  let date = new Date(dateTime);
  date.setHours(date.getHours() + 7);
  let formattedDateTime = date.toISOString().replace("T", " ").substring(0, 11);
  if (type == "start") {
    formattedDateTime += "00:00:01";
  } else if (type == "finish") {
    formattedDateTime += "23:59:59";
  }
  return formattedDateTime;
}

function formatTimeValue(data, ...dateTimeFields) {
  dateTimeFields.forEach((field) => {
    if (data[field]) data[field] = getFormattedMySqlDateTime(data[field]);
  });
}

// exports.getFormattedMySqlDateTime = getFormattedMySqlDateTime;
module.exports = {
  getFormattedMySqlDateTime: getFormattedMySqlDateTime,
  getFormattedTaskTime: getFormattedTaskTime,
  formatTimeValue: formatTimeValue,
};
