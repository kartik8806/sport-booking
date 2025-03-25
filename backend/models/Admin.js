import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    
    email: {
        type: String,
        unique : true,
        required: true,
    },

    password:{
        type: String,
        minlength : 6,
        required: true,
        
    },

    addedsportEvent:[
        {
            type: mongoose.Types.ObjectId,
            ref:"sport",
        },
    ],

    

});

export default mongoose.model("Admin",adminSchema)