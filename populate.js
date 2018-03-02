import mongoose from 'mongoose';
import User from './backend/models/User';

const users = [
  {
      password: "password",
      radius: 10,
      bio: "Google Product Manager",
      photo: "https://i.imgur.com/h0Ln9XF.png",
      f_name: "Will",
      l_name: "Noodle",
      email: "heykatslump@gmail.com",
      group: [],
      cohort: {
          year: "2017",
          season: "Spring",
          program: "One"
      },
      phone: "14023456789"
  },
  {
      password: "password",
      radius: 10,
      bio: "Google Marketing Manager",
      photo: "https://i.imgur.com/Oo8lcJf.png",
      f_name: "James",
      l_name: "Wang",
      email: "j.wang5441@gmail.com",
      group: [],
      cohort: {
          year: "2016",
          season: "Spring",
          program: "Semester"
      },
      phone: "14022456789"
  },
  {
      password: "password",
      radius: 10,
      bio: "Google Engineering Manager",
      photo: "https://i.imgur.com/rQ3SjUl.png",
      f_name: "Kat",
      l_name: "Slump",
      email: "kat.slump@gmail.com",
      group: [],
      cohort: {
          year: "2017",
          season: "Spring",
          program: "One"
      },
      phone: "14023453789"
  }

];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Go through each movie
users.map(data => {
  // Initialize a model with movie data
  const user = new User(data);
  // and save it into the database
  user.save();
});
