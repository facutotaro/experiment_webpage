const { mongoose, allowCORS } = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  try {
    allowCORS(req, res, () => { });

    const { userId, loginTime } = req.body;

    if (!userId || !loginTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const userExists = await ExperimentModel.findOne({ userId: userId });

    if (userExists !== null) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const login_time = new Date(loginTime);
    const newUser = new ExperimentModel({
      userId: userId,
      loginTime: login_time,
      trials: [],
      tutorialTime: null,
      lastTrialSubmitted: -1
    });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
}