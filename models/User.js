const { Schena, model, Types} = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true, //sets the username as a unique username
            required: true, // makes the field requires to have an input
            trim: true, //gers rid of excessive whitespace at the front and end
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [
                /^([a-z0-9\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                "Enter a valid email address",
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }    
)

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length
})

const User = model("User", UserSchema)

module.exports = User