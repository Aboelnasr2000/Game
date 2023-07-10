import mongoose from "mongoose";



const guessThePlayerSchema = new mongoose.Schema({

    // firstClue: {
    //     type: String,
    //     required: true,
    // },
    // secondClue: {
    //     type: String,
    //     required: true,
    // }, thirdClue: {
    //     type: String,
    // }
    // , fourthClue: {
    //     type: String,
    // }, fifthClue: {
    //     type: String,
    // },
    clues: [{
        clue: {
            type: String,
            trim: true ,
            required: true
        }
    }]
    ,
    answer: {
        type: String,
        trim: true,
        required: true,
    }

},
    {
        timestamps: true
    })


guessThePlayerSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    return userObject

}

export const guessThePlayer = mongoose.model('guessThePlayer', guessThePlayerSchema);