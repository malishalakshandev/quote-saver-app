import mongoose from "mongoose";

const quoteUserSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    first_name: { 
        type: String, 
        required: true 
    },
    last_name: { 
        type: String, 
        required: true 
    },
}, { _id: false }); // No separate _id for this subdocument


const quoteSchema = new mongoose.Schema({
    user: {
        type: quoteUserSchema,
        required: true,
    },
    quote_name: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;