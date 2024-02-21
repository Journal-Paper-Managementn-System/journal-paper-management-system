const subData = require('../models/subModel');
const Auth = require('../models/authModel');

const addJournal = async (req, res) => {
    try {
        const submission = new subData({
            userId: req.body.userId,
            title: req.body.title,
            abstract: req.body.abstract,
            keywords: req.body.keywords,
            file: req.body.file,
            authors: req.body.authors,
        });
        const submitted = await submission.save();
        if(submitted){
            const user = await Auth.findOne({_id: req.body.userId});
            user.journalIds.push(submitted._id);
            await user.save();
            res.status(201).send({success: true, message: "Journal submitted successfully", data: submitted});
        }
    } catch (error) {
        res.status(404).send({success: false, message: "Journal submission failed", error: error});
    }
}

const getJournal = async (req, res) => {
    try {
        const journalData = await subData.find();
        res.status(200).send({success: true, message: "Journal data retrieved successfully", data: journalData});
    } catch (error) {
        res.status(404).send({success: false, message: "Journal data retrieval failed", error: error});
    }
}

module.exports = {
    addJournal,
    getJournal
}