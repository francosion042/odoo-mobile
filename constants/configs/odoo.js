import Odoo from "react-native-odoo-promise-based";

class OdooConfig {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.odoo = new Odoo({
      host: "ehiotech.com",
      port: 443,
      database: "ehiotech",
      username: this.email,
      password: this.password,
      protocol: "https",
    });
  }
}

export default OdooConfig;

//email : admin
// password : simpsuns#
