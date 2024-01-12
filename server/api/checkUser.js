const db = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  const userId = req.query.userId;

  try {
    const userExists = await ExperimentModel.exists({ userId });
    res.json({ userExists });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}