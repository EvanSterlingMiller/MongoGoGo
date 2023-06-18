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
    },
    getThoughtById({params}, res) {
        Thought.rindOne({ _id: params.thoughtId})
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select('-__v')
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).tojson({message: "No thought was found with that id"})
                    return
                }
                res.json(dbThoughtData)
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    createThought({params, body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: params.userId},
                    {$push: {thoughts: _id}},
                    {new:true}
                )
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({message: "No user was found with that id"})
                    return
                }
                res.json(dbUserData)
            })
            .catch((err) => res.json(err))
    },
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thought}, body, {
            new: true,
            runValidators: true
        })
            .then((dbThoughtData) => {
                if(!dbThoughtData)  {
                    res.status(404).json({message: "No thought was found with that id"})
                    return
                }
                res.json(dbThoughtData)
            })
            .catch((err) => res.json(err))
    },
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then((deletedThought) => {
                if(!deletedThought) {
                    return res.status(404).json({message: "No thought was found with that id"})
                }
                return User.findOneAndUpdate(
                    {_id: params.userId},
                    {$pull: {thoughts: params.thoughtId}},
                    {new:true}
                )
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({message: "No user was found with that id"})
                    return
                }
                res.json(dbUserData)
            })
            .catch((err) => res.json(err))
    },
}
