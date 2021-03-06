require('dotenv').config();
const axios = require('axios');

module.exports = {
  async create(title, dm) {
    try {
      const response = await axios.post((process.env.BACKEND_URL || 'http://localhost:3000') + '/groups', {
        dungeonMaster: dm,
        title: title,
        description: ''
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async delete(dm) {
    try {
      console.log(dm);
      const response = await axios.delete((process.env.BACKEND_URL || 'http://localhost:3000') + `/groups/${dm}`);
      return response.data
    } catch (error) {
      console.error(error);
    }
  },
  async updateDescription(dm, description) {
    try {
      const response = await axios.put((process.env.BACKEND_URL || 'http://localhost:3000') + `/groups/description/${dm}`, {
        description: description
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async updatePlayers(dm, player) {
    try {
      const response = await axios.put((process.env.BACKEND_URL || 'http://localhost:3000') + `/groups/players/${dm}`, {
        playerId: player
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async showByDm(dm) {
    try {
      const response = await axios.get((process.env.BACKEND_URL || 'http://localhost:3000') + `/groups/dm/${dm}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async showByPc(pc) {
    try {
      const response = await axios.get((process.env.BACKEND_URL || 'http://localhost:3000') + `/groups/pc/${pc}`);
      console.log(response.data)
      return response.data;
    } catch(error) {
      console.error(error);
    }
  }
}