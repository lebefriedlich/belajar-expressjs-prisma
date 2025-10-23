// helpers/Validator.js
const prisma = require("../utils/PrismaClient");

class Validator {
  constructor(data, rules) {
    this.data = data;
    this.rules = rules;
    this.errors = {};
  }

  static async make(data, rules) {
    const validator = new Validator(data, rules);
    await validator.validate(); // Tunggu validasi selesai (termasuk async validation)
    return validator;
  }

  async validate() {
    const promises = []; // Untuk menyimpan semua promise validasi async

    // Iterasi atas setiap field dan rule
    for (const [field, ruleStr] of Object.entries(this.rules)) {
      const rules = ruleStr.split("|");
      const value = this.data[field];

      for (const rule of rules) {
        const [ruleName, param] = rule.split(":");

        switch (ruleName) {
          case "required":
            if (!value) this.addError(field, `${field} is required`);
            break;
          case "string":
            if (value && typeof value !== "string") this.addError(field, `${field} must be a string`);
            break;
          case "email":
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) this.addError(field, `${field} must be a valid email`);
            break;
          case "numeric":
            if (value && isNaN(value)) this.addError(field, `${field} must be a number`);
            break;
          case "min":
            if (value && value.length < parseInt(param)) this.addError(field, `${field} must be at least ${param} characters`);
            break;
          case "max":
            if (value && value.length > parseInt(param)) this.addError(field, `${field} must be at most ${param} characters`);
            break;
          case "confirmed":
            if (value !== this.data[`${field}_confirmation`]) this.addError(field, `${field} confirmation does not match`);
            break;
          case "unique":
            promises.push(this.checkUnique(field, param));  // Menambahkan validasi async ke promises
            break;
          case "exists":
            promises.push(this.checkExists(field, param));  // Menambahkan validasi async ke promises
            break;
          case "boolean":
            if (value !== true && value !== false) this.addError(field, `${field} must be a boolean`);
            break;
          case "array":
            if (!Array.isArray(value)) this.addError(field, `${field} must be an array`);
            break;
          default:
            break;
        }
      }
    }

    // Tunggu sampai semua validasi async selesai
    await Promise.all(promises);
  }

  // Validasi unique, cek apakah field unik di database
  async checkUnique(field, param) {
    const [table, column] = param.split(",");
    const exists = await prisma[table].findUnique({
      where: { [column]: this.data[field] },
    });

    if (exists) this.addError(field, `${field} must be unique`);
  }

  // Validasi exists, cek apakah field ada di database
  async checkExists(field, param) {
    const [table, column] = param.split(",");
    const exists = await prisma[table].findUnique({
      where: { [column]: this.data[field] },
    });

    if (!exists) this.addError(field, `${field} does not exist in ${table}`);
  }

  // Menambahkan error ke dalam errors object
  addError(field, message) {
    if (!this.errors[field]) this.errors[field] = [];
    this.errors[field].push(message);
  }

  // Mengembalikan true jika ada error
  fails() {
    return Object.keys(this.errors).length > 0;
  }

  // Mengembalikan true jika tidak ada error
  passes() {
    return !this.fails();
  }
}

module.exports = Validator;
