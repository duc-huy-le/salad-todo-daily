var JWT = require("../common/_JWT");

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

function parseJsonProperty(data, jsonPropNameList) {
  data.forEach((record) => {
    jsonPropNameList.forEach((jsonPropName) => {
      if (record[jsonPropName])
        record[jsonPropName] = JSON.parse(record[jsonPropName]);
    });
  });
}

function stringifyJsonProperty(record, jsonPropNameList) {
  jsonPropNameList.forEach((jsonPropName) => {
    if (record[jsonPropName])
      record[jsonPropName] = JSON.stringify(record[jsonPropName]);
  });
}

const handleRequest = async (req, res, callback) => {
  try {
    const token = req.headers.authorization;
    const tokenInfo = await JWT.check(token);
    await callback(tokenInfo.data.id, req, res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// exports.getFormattedMySqlDateTime = getFormattedMySqlDateTime;
module.exports = {
  getFormattedMySqlDateTime,
  getFormattedTaskTime,
  formatTimeValue,
  parseJsonProperty,
  stringifyJsonProperty,
  handleRequest,
};
