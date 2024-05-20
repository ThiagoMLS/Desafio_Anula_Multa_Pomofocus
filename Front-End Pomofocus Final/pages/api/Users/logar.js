// pages/api/logar.js

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', {
          expiresIn: '1h',
        });

        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}