const StorySubmission = require('../models/storySubmission');

const getallstory = async (req, res) => {
    try {
        const { workingPerson, sprintNumber } = req.query;
        let filter = {};
        if (workingPerson) filter.workingPerson = { $regex: new RegExp(workingPerson, "i") };
        if (sprintNumber) filter.sprintNumber = sprintNumber;
        const allStory = await StorySubmission.find(filter);

        if (allStory.length === 0) {
            return res.status(404).json({
                message: "No stories found",
                status: false,
            });
        }

        return res.status(200).json({
            message: "Fetched stories successfully",
            allStory,
            status: true,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error while fetching story",
            status: false,
        });
    }
};

const submitstory = async (req, res)=>{
    try {
        const {
            storyNumber,
            storyName,
            storyLink, 
            sprintNumber,
            workingPerson,
            reviewer1,
            reviewer2
        } = req.body;

        const story = await StorySubmission.create({
            storyNumber,
            storyName,
            storyLink, 
            sprintNumber,
            workingPerson,
            reviewer1,
            reviewer2,
        })

        return res.status(200).json({
            message: "story postes successfully",
            story,
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

const updatestory = async (req, res) => {
    try {
        const { 
            storyNumber, 
            storyName, 
            storyLink, 
            sprintNumber, 
            workingPerson, 
            reviewer1, 
            reviewer2 
        } = req.body;

        const updatedStory = await StorySubmission.findOneAndUpdate(
            { storyNumber }, 
            {
                storyName,
                storyLink,
                sprintNumber,
                workingPerson,
                reviewer1,
                reviewer2
            },
            { new: true, runValidators: true }
        );

        if (!updatedStory) {
            return res.status(404).json({
                message: "Story not found",
                status: false
            });
        }

        return res.status(200).json({
            message: "Story updated successfully",
            story: updatedStory,
            status: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
            status: false
        });
    }
};

const closestory = async (req, res) => {
    try {
        const { storyNumber, sprintNumber } = req.query;

        if (!storyNumber) {
            return res.status(400).json({ message: "Story number is required", status: false });
        }

        const updatedStory = await StorySubmission.findOneAndUpdate(
            { storyNumber },
            { sprintNumber, isActive: false },
            { new: true, runValidators: true }
        );

        if (!updatedStory) {
            return res.status(404).json({
                message: "Story not found",
                status: false
            });
        }

        return res.status(200).json({
            message: "Story closed successfully",
            story: updatedStory,
            status: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error while closing story",
            status: false
        });
    }
};


module.exports = {getallstory, submitstory, updatestory, closestory}