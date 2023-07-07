import mongoose from "mongoose";



const passwordChallengeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: Buffer,
    }

}, {
    timestamps: true
})


passwordChallengeSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    return userObject

}

export const passwordChallenge = mongoose.model('passwordChallenge', passwordChallengeSchema);