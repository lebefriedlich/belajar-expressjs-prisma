const prisma = require("../utils/PrismaClient");

class AuthRepository {
  // Fungsi untuk membuat user baru
  async createUser(data) {
    // Cek apakah role dengan nama yang diberikan sudah ada di database
    const role = await prisma.role.findFirst({
      where: { name: data.role },  // Mencari berdasarkan name
    });

    // Jika role tidak ada, buat role baru
    if (!role) {
      await prisma.role.create({
        data: { name: data.role },
      });
    }

    // Menghubungkan user ke role yang ada berdasarkan `name`
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: role ? role.id : undefined, // Gunakan ID role yang ditemukan atau biarkan undefined
      },
    });
  }

  // Fungsi untuk mencari user berdasarkan email
  async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  // Fungsi untuk mencari user berdasarkan ID
  async findById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }

  // Fungsi untuk mendapatkan semua user
  async getAllUsers() {
    return await prisma.user.findMany({
      where: {
        role: { name: "USER" },
      },
    });
  }
}

module.exports = new AuthRepository();