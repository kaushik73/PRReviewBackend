const StoryReview = require('../models/storyReview')

const submitreview = async (req, res)=>{
    try {
        const {
            storyNumber,
            storyName,
            storyLink, 
            prLink,
            workingPerson,
            reviewer,
            overallGrading,
            criticalCommentsCount,
            comment

        } = req.body;

        const review = await StoryReview.create({
            storyNumber,
            storyName,
            storyLink, 
            prLink,
            workingPerson,
            reviewer,
            overallGrading,
            criticalCommentsCount,
            comment
        })

        return res.status(200).json({
            message: "review submitted successfully",
            review,
            status: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Server Error",
            status: false,
        })
    }
};


module.exports = {submitreview};