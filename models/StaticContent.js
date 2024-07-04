import mongoose from 'mongoose';

const staticcontentSchema = new mongoose.Schema({
    type: { type: String, required: true },
    content: { type: String, required: true }
}, {
    timestamps: true 
});

const StaticContent = mongoose.models.StaticContent || mongoose.model('StaticContent', staticcontentSchema);

export default StaticContent;