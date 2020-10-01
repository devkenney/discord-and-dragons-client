require('dotenv').config();
const axios = require('axios');

module.exports = {
  async create(pc) {
    try {
    const response = await axios.post((process.env.BACKEND_URL || 'http://localhost:3000') + `/sheets`, {
      playerId: pc
    })
    return response.data
    } catch (error) {
      console.error(error);
    }
  }
}