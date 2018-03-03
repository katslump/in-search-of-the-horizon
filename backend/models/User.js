import mongoose, {Schema} from 'mongoose';
import Location from './Location';

// Define movie schema
var userSchema = new Schema({
    password: String,
    radius: Number,
    bio: String,
    photo: String,
    f_name: String,
    l_name: String,
    email: {
        type: String,
        unique: true
    },
    locations: [{
        type: Schema.Types.ObjectId,
        ref: Location
    }],
    group: Array,
    cohort: {
        year: String,
        season: String,
        program: String
    },
    phone: String
});


// Export Mongoose model
export default mongoose.model('User', userSchema);
