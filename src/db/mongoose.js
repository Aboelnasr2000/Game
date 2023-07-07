import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect( 'mongodb+srv://alyaboelnasr:Saba7o@cluster0.1t7wklz.mongodb.net/?retryWrites=true&w=majority' , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Connected to Mongoose Succesfully!")).catch((e) => console.log("Couldn't Connect to Mongoose!" , e));
}
