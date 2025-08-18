import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { value } = req.body;

    if (typeof value !== 'number') {
      return res.status(400).json({ error: 'Value must be a number' });
    }

    try {
      await prisma.numberEntry.create({
        data: { value },
      });
      return res.status(200).json({ message: 'Number stored' });
    } catch (error) {
      console.error('Error storing number:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'GET') {
    try {
      const entries = await prisma.numberEntry.findMany();

      if (entries.length === 0) {
        return res.status(200).json({ count: 0, min: null, max: null, mean: null });
      }

      const values = entries.map((e) => e.value);
      const count = values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      const mean = values.reduce((a, b) => a + b, 0) / count;

      return res.status(200).json({ count, min, max, mean });
    } catch (error) {
      console.error('Error fetching stats:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}