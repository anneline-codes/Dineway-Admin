import Client from '../models/Client.js';

export const getClients = async (req, res) => {
  const clients = await Client.find().sort({ createdAt: 1 });
  res.json({ clients });
};

export const createClient = async (req, res) => {
  const client = await Client.create(req.body);
  res.status(201).json({ client });
};
