import mongoose, {Schema} from 'mongoose';

// Define movie schema
var userSchema = new Schema({
    password: String,
    radius: Number,
    bio: String,
    photo: String,
    location_name: String,
    f_name: String,
    l_name: String,
    email: {
        type: String,
        unique: true
    },
    pushToken: String,
    lat: Number,
    long: Number,
    updated_last: Date,
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
