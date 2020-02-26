const db = require("./connection.js");

// Object Relational Mapper (ORM)
const orm = {
  all: function(tableName,cb) {
    let sql = "SELECT * FROM ??;";

    db.query(sql, [tableName], function(err, result) {
      if (err) throw err;
      // console.log("select querry",sql,"resutl",result);
      cb(result);
    });
  },
  create: function(tableName, colsToIns, valsToIns, cb) {
    const cols = '??,'.repeat(colsToIns.length).slice(0,-1);
    const vals = '?,'.repeat(colsToIns.length).slice(0,-1);

    const sql = `INSERT INTO ${tableName} (${cols}) VALUES (${vals});`;

    db.query(sql, [colsToIns[0].toString(),colsToIns[1].toString(),valsToIns[0].toString(),valsToIns[1].toString()], function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    // console.log(queryString);
    db.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  const arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (let key in ob) {
    const value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}
module.exports = orm;