import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUser = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await prisma.user.findMany();

    // Exclude password for each user
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);

    return res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) return res.status(404).json({ message: "User not found." });

    // Do not send the password
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
