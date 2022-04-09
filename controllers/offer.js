const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const prisma = new PrismaClient();

exports.addOffer = async (req, res) => {
  let {
    coupon_code,
    coupon_offer,
    coupon_description,
    coupon_image,
    coupon_end,
    url,
    bank_name,
    userId,
    type,
  } = req.body;

  coupon_end = new Date(coupon_end);

  try {
    const coupon = await prisma.coupon.create({
      data: {
        coupon_code,
        coupon_offer,
        coupon_description,
        coupon_image,
        coupon_end,
        url,
        bank_name,
        type,
        userId: userId ? userId : null,
      },
    });

    res.status(201).json({ coupon });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOffer = async (req, res) => {
  try {
    const coupon = await prisma.coupon.findMany({
      where: {
        userId: null,
        coupon_end: {
          gt: new Date('2021-04-26'),
        },
      },
    });

    res.status(200).json({ coupon });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSavedOffer = async (req, res) => {
  const { userId } = req.body;

  try {
    const coupon = await prisma.coupon.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({ coupon });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
