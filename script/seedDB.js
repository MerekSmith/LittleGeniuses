const mongoose = require("mongoose");
const mongoDB = require("../config/keys").mongoURI;
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(mongoDB, {
  useMongoClient: true
});

const carouselSeed = [{}];

db.Carousel.remove({})
  .then(() => db.Carousel.collection.insertMany(carouselSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const programSeed = [
  {
    description: [
      "Your youngest learners need to feel safe and supported so  they can learn with their whole body and all of their senses. In a HighScope infant and toddler program, our teachers focus on developing supportive, trusting relationships with the children in their care. We create a rich environment that encourage very young children to explore and discover the world around them helping them to engage in experiences designed to support their optimal development in all domains."
    ],
    header: "Infant & Toddler Class",
    imagePath: "/uploads\\program1.jpg",
    textColor: "red",
    order: 0
  },
  {
    description: [
      "Our Terrific TWO'S program is full of creativity and movement and is designed to meet the developmental needs of a growing two year old.",
      "The program provides challenging opportunities to advance children's skills as they transition into their third year of life.",
      "Group time, art, stories, music and movement, science, and a playground equipped with all the things growing two year olds love, helps give them the stimulation they need to develop and grow into a healthy and happy preschooler.",
      "NEW PROGRAM ( Bilingual dual language)."
    ],
    header: "2-Year Old Class",
    imagePath: "/uploads\\program2.jpg",
    textColor: "orange",
    order: 1
  },
  {
    description: [
      "In a High = Scope program, teachers ignite children's interest in learning by creating an environment that encourages them to explore learning materials and interact with adults and peers. We focus on supporting early learners as they make decisions, build academic skills, develop socially and emotionally, and become part of a classroom community."
    ],
    header: "Preschool Class",
    imagePath: "/uploads\\program3.jpg",
    textColor: "#3fe148",
    order: 2
  },
  {
    description: [
      "We provide Drop-In care. We cater to parents who have flexible schedules and not always need care on a daily basis. We strive to cater to parents who have unique needs."
    ],
    header: "Special Programs",
    imagePath: "/uploads\\program4.jpg",
    textColor: "#efaeff",
    order: 3
  },
  {
    description: [
      "We provide transportation to and from school in the Midvale area. During the school year we offer tutoring, Bilingual dual language and fun activities. We offer a awesome summer camp program loaded with fieldtrips and fun activities."
    ],
    header: "Before and After School Care",
    imagePath: "/uploads\\program5.jpg",
    textColor: "#00b0ef",
    order: 4
  }
];

db.Program.remove({})
  .then(() => db.Program.collection.insertMany(programSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const teacherSeed = [{}];

db.Teacher.remove({})
  .then(() => db.Teacher.collection.insertMany(teacherSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
