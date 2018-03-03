import mongoose, {Schema} from 'mongoose';

// Define movie schema
var locationSchema = new Schema({
    lat: Number,
    long: Number,
    last_updated: Date,
    user_id: String
});

// Export Mongoose model
export default mongoose.model('Location', locationSchema);
