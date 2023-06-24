import mongoose from "mongoose";



const HeroSchema = new mongoose.Schema({
    nickname: {
        type:String,

    },
    realname: {
        type:String,

    },
    description: {
        type:String,

    },
    superpowers: {
        type:String,

    },
    phrase: {
        type:String,

    },
    images:{
        type: [],
        default:[]
    }
})

export default mongoose.model('Hero',HeroSchema);