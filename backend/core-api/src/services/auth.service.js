import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import ApiError from '../utils/ApiError.js';

const createUser = async (userBody) => {
  if (await prisma.user.findUnique({ where: { email: userBody.email } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(userBody.password, salt);

  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email: userBody.email,
        fullName: userBody.name,
      },
    });

    await tx.identity.create({
      data: {
        userId: newUser.id,
        provider: 'email',
        passwordHash: passwordHash,
      },
    });

    return newUser;
  });
  
  return user;
};

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await prisma.user.findUnique({ 
    where: { email },
    include: { identities: true }
  });

  if (!user) {
     throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  const emailIdentity = user.identities.find(id => id.provider === 'email');
  if (!emailIdentity || !emailIdentity.passwordHash || !(await bcrypt.compare(password, emailIdentity.passwordHash))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};

export default {
  createUser,
  loginUserWithEmailAndPassword,
};