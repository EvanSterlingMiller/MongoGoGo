const {Thought, User} = require('..models')

const thoughtController = {
    getAllThoughts(req, res) { //get all thoughts
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .sort({_id: -1})
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err)
                res.status(400).json(err)
            })
    }
}