const {model, Schema, Types} = require('mongoose')
const moment = require('moment')

const reactionSchema = new Schema({
    reaction: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    username: {
        type: String,
        requires: true
    },
    reactionBody: {
        type: String,
        require: true,
        maxLength: 256
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("DD MMM, YYYY")
    },
    
},  {
    toJson: {
        virtuals: true,
        getters: true
    },
    id: false
})

const thoughtSchema =  new Schema({
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 256
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("DD MMM, YYYY")
    },
    username: {
        type: String,
        requires: true
    },
    reactions: [reactionSchema]
},  {
    toJson: {
        virtuals: true,
        getters: true
    },
    id: false
})

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought