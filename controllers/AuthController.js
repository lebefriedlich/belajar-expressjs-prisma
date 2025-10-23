const authService = require("../services/AuthService");
const Validator = require("../helpers/Validator");

class AuthController {
  static async register(req, res) {
    const { name, email, password, role } = req.body;
    try {
      const validator = await Validator.make({ name, email, password, role }, {
        name: "required|string",
        email: "required|email",
        password: "required|string|min:6",
        role: "string|in:USER,ADMIN",
      });

      if (validator.fails()) {
        return res.status(400).json({
          status_code: 400,
          message: "Validation failed",
          errors: validator.errors,
        });
      }

      const user = await authService.register({ name, email, password, role });
      res.status(201).json({
        status_code: 201,
        message: "User registered successfully",
        user,
      });
    } catch (err) {
      res.status(400).json({
        status_code: 400,
        message: err.message,
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const validator = await Validator.make({ email, password }, {
        email: "required|email",
        password: "required|string",
      });

      if (validator.fails()) {
        return res.status(400).json({
          status_code: 400,
          message: "Validation failed",
          errors: validator.errors,
        });
      }

      const { user, token } = await authService.login({ email, password });
      res.json({
        status_code: 200,
        message: "Login successful",
        user,
        token,
      });
    } catch (err) {
      res.status(401).json({
        status_code: 401,
        message: err.message,
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await authService.getAllUsers();
      res.json({
        status_code: 200,
        message: "Users retrieved successfully",
        users,
      });
    } catch (err) {
      res.status(400).json({
        status_code: 400,
        message: err.message,
      });
    }
  }
}

module.exports = AuthController;
