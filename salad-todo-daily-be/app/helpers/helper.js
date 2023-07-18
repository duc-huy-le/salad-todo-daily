function getFormattedMySqlDateTime(dateTime) {
  const date = new Date(dateTime);
  const formattedDateTime = date
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);
  return formattedDateTime;
}

exports.getFormattedMySqlDateTime = getFormattedMySqlDateTime;
