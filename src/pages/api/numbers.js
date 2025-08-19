import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { value } = req.body;

      // Validate input
      if (typeof value !== 'number' || isNaN(value)) {
        return res.status(400).json({ error: 'Value must be a valid number' });
      }

      await prisma.numberEntry.create({
        data: { value },
      });

      return res.status(200).json({ message: 'Number stored' });
    }

    if (req.method === 'GET') {
      const entries = await prisma.numberEntry.findMany();

      if (!entries.length) {
        return res.status(200).json({ count: 0, min: null, max: null, sum: null, mean: null });
      }

      const values = entries.map((  ) => entry.value);
      const count = values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      const sum = values.reduce((sum,val) => sum + val, 0);
      const mean = values.reduce((sum, val) => sum + val, 0) / count;

      return res.status(200).json({ count, min, max, sum, mean });
    }

    // Method not allowed
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('API route error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
