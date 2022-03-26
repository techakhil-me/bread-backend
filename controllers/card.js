const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const bcryptjs = require('bcryptjs');
const prisma = new PrismaClient();

exports.addCard = async (req, res) => {
  const { bank_name, provider_name, card_no, exp_date, user_id } = req.body;
  try {
    const card = await prisma.card.create({
      data: {
        bank_name,
        provider_name,
        card_no,
        exp_date,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });
    res.status(201).json({
      status: 'success',
      data: card,
    });
  } catch (error) {
    throw new PrismaClientKnownRequestError(
      error.message,
      'ADD_CARD',
      error.code,
      error.data
    );
  }
};

exports.getCard = async (req, res) => {
  const { userId } = req.body;

  try {
    const card = await prisma.card.findMany({
      where: {
        user_id: userId,
      },
    });
    res.status(200).json({
      status: 'success',
      data: card,
    });
  } catch (error) {
    throw new PrismaClientKnownRequestError(
      error.message,
      'GET_CARD',
      error.code,
      error.data
    );
  }
};
