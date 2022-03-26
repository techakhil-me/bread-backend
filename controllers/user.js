const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const bcryptjs = require('bcryptjs');
const prisma = new PrismaClient();

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    res.status(400).json({ message: 'Please enter all fields' });
    return;
  }
  const hash = bcryptjs.hashSync(password);

  const newUser = {
    username,
    email,
    password: hash,
  };

  try {
    const user = await prisma.user.create({
      data: {
        ...newUser,
      },
    });

    delete user.password;

    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        res.status(400).json({ message: 'Email already exists' });
      }
    } else res.status(500).json({ message: 'Internal server error' });
  }
};

exports.signInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Please enter all fields' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const isMatch = bcryptjs.compareSync(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: 'Incorrect password' });
    }

    delete user.password;

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
