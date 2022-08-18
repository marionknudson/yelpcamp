const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
  usenewURLparser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 40) + 10;
    const camp = new Campground({
      author: '62fa97638152036509190202',
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam officiis, quaerat deleniti velit, harum molestias doloremque quidem id accusamus deserunt consequatur aliquam obcaecati provident architecto dolores. Incidunt maxime repellat rem. Inventore dolor quam, ducimus consequatur laborum incidunt repudiandae impedit dicta excepturi perspiciatis culpa quia facere fugiat aspernatur minima! Minima similique impedit corporis nisi necessitatibus deserunt enim ratione quod neque excepturi.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dtx28vjri/image/upload/v1660762785/YelpCamp/photo-1426604966848-d7adac402bff_cx2pm8.avif',
          filename: 'YelpCamp/lvxa9wsqm2heb0oeiwb6',
        },
        {
          url: 'https://res.cloudinary.com/dtx28vjri/image/upload/v1660762785/YelpCamp/photo-1470071459604-3b5ec3a7fe05_a7bswo.avif',
          filename: 'YelpCamp/bnvtecwnkgelixon1tf9',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
