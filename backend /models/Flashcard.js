import mongoose from  'mongoose' ;

const flashcardSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User' ,
        required : true  
    },
    documentId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User' ,
        required : true 
    },
    cards : [{
        question : {type :String , required : true} ,
        answer  : {type :String , required : true} ,
        dificulty : {
            type : String , 
            enum : ["easy" , "Medium" , "Hard"] ,
            default : "meduim",
        },
        lastReviewed :{
            type: Date ,
            default : null,
        },
        reviewCount :{
            type : Number , 
            default : 0 ,
        },
        isStarted : {
            type : Boolean ,
            default : false ,
        },
    }, ], } , {
        timestamps:true ,
});

flashcardSchema.index({userId : 1 , documentId:1});
const Flashcard = mongoose.model("Flashcard" , flashcardSchema) ;
export default Flashcard ;