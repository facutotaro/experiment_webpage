const { mongoose, allowCORS } = require('../db');

const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  try {
    allowCORS(req, res, () => {});
    const { userId, imgId, imgGroup, imgGeneratedBy, promptUsed} = req.body.params;

  
    const hasRated = await ExperimentModel.exists({ userId: userId, 
                                ratings: { $elemMatch: { imgId: { "$eq": imgId },
                                                         imgGroup: {"$eq": imgGroup},
                                                         imgGeneratedBy: {"$eq": imgGeneratedBy},
                                                         promptUsed: {"$eq": promptUsed} } } });
    if (hasRated){
      res.json({ hasRated: true });
    }else{
      res.json({ hasRated: false });
    }
    
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
};