import axios from 'axios';

export default async function handler(req, res) {

  // Sin diagonal al final
  res.setHeader('Access-Control-Allow-Origin', 'https://consorciozero.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post(
      'https://api.sale-u.com/v1/ConexionTerceros/GenerarLeadAPIJSONAgenciaAPS.php',
      req.body,
      {
        headers: {
          'Authorization': process.env.SALEU_TOKEN,
          'Content-Type': 'application/json',
        }
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}