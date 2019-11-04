const Database = require("./Database");

class FirebaseDatabase extends Database {
  constructor(name, configFile) {
    super(name, configFile);
  }
  initDB(dbPackage) {
    dbPackage.initializeApp(this.configFile);
    this.db = dbPackage.firestore;
    this.auth = dbPackage.auth;
  }
}

module.exports = FirebaseDatabase;
