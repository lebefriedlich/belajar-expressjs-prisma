const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRepository = require("../repositories/AuthRepository");

class AuthService {
  async register({ name, email, password, role }) {
    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
    });

    return newUser;
  }

  async login({ email, password }) {
    const user = await authRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { user, token };
  }
}

module.exports = new AuthService();
