var mongoose = require("mongoose");
require("mongoose-query-random");
mongoose.set("useCreateIndex", true);

//-------------------MongoURI----------------------------
const URI =
  "mongodb+srv://bookbank:bookbank@book-bank-3ough.mongodb.net/test?retryWrites=true&w=majority";

//-------------------Connection Setup-------------------------
mongoose.connect(URI, function(err, db) {
  if (err) {
    console.log(
      "Unable to connect to the server. Please start the server. Error:",
      err
    );
  } else {
    console.log("Mongoose Connected to Server successfully!");
  }
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("We're Connected: TAZ");
});

//=======================================================
//-------------------Book Schema-------------------------
//=======================================================
var booksSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  bookName: { type: String },
  bookCover: { type: String },
  bookDescription: { type: String },
  universityId: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

//-------------------Book Model-------------------------
let Book = mongoose.model("books", booksSchema);

var saveBook = function(book) {
  console.log("in save function");
  var newBook = new Book({
    id: book.id,
    bookName: book.bookName,
    bookCover: book.bookCover,
    bookDescription: book.bookDescription,
    universityId: book.universityId,
    createdAt: book.createdAt
  });

  newBook.save(function(err, res) {
    if (err) {
      throw err;
    }
    console.log("this book is added now", res);
  });
};

//=======================================================
//-------------------Donated Book Schema-------------------------
//=======================================================
var donatedBooksSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  userId: { type: Number },
  bookId: { type: Number },
  availability: { type: Boolean },
  createdAt: { type: Date, default: Date.now }
});

//-------------------Donated Book Model-------------------------
let DonatedBook = mongoose.model("donated-books", donatedBooksSchema);

var saveDonatedBook = function(donatedBook) {
  console.log("in save function");
  var newDonatedBook = new DonatedBook({
    id: donatedBook.id,
    userId: donatedBook.userId,
    bookId: donatedBook.bookId,
    availability: donatedBook.availability,
    createdAt: donatedBook.createdAt
  });

  newDonatedBook.save(function(err, res) {
    if (err) {
      throw err;
    }
    console.log("this donated book has been added ", res);
  });
};

//=======================================================
//-------------------User Schema-------------------------
//=======================================================

var userSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  email: { type: String },
  password: { type: String }
});

//-------------------User Model-------------------------
var User = mongoose.model("users", userSchema);

var saveUser = function(user) {
  var newUser = new User({
    id: user.id,
    email: user.email,
    password: user.password
  });

  newUser.save(function(err, res) {
    if (err) {
      throw err;
    }
    console.log("this user was added now", res);
  });
};

//=======================================================
//-------------------Profile Schema-------------------------
//=======================================================

var profileSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  userId: { type: Number },
  userName: { type: String },
  universityId: { type: Number },
  userAvatar: { type: String }
});

//-------------------Profile Model-------------------------
var Profile = mongoose.model("profiles", profileSchema);

var saveProfile = function(profile) {
  var newProfile = new Profile({
    id: profile.id,
    userId: profile.userId,
    userName: profile.userName,
    universityId: profile.universityId,
    userAvatar: profile.userAvatar
  });

  newProfile.save(function(err, res) {
    if (err) {
      throw err;
    }
    console.log("this profile has been was added", res);
  });
};

//=======================================================
//-------------------University Schema-------------------
//=======================================================

var universitySchema = mongoose.Schema({
  id: { type: Number, unique: true },
  universityName: { type: String }
});

//-------------------University Model----------------------
var University = mongoose.model("universities", universitySchema);

var saveUniversity = function(uni) {
  var newUniversity = new University({
    id: uni.id,
    universityName: uni.universityName
  });

  newUniversity.save(function(err, res) {
    if (err) {
      throw err;
    }
    console.log("this University has been was added", res);
  });
};

//=======================================================
//-------------------My function ------------------------
//=======================================================

//-------------------Find 4 random universities ---------
var findRandomUnis = function(callback) {
  University.find().random(4, true, callback);
};

module.exports.saveBook = saveBook;
module.exports.saveDonatedBook = saveDonatedBook;
module.exports.saveUser = saveUser;
module.exports.saveProfile = saveProfile;
module.exports.saveUniversity = saveUniversity;
module.exports.findRandomUnis = findRandomUnis;