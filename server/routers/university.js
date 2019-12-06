var express = require("express");
var router = express.Router();
const bookBankDB = require("../../database/db.js");

//---------------- Universities Page --------------------------
router.route("/").get(function(req, res) {
  bookBankDB.getAllUniversities(function(err, allUniversities) {
    if (err) throw err;
    console.log(allUniversities);
    res.json(allUniversities);
  });
});

//----------------Items Page Route --------------------------
router.route("/:univId").get(function(req, res) {
  const univId = req.params.univId;
  bookBankDB.getBooksOfUniversity(univId, function(err, booksOFTheUniversity) {
    if (err) throw err;
    console.log(booksOFTheUniversity);
    res.json(booksOFTheUniversity);
  });
});

//----------------- Item Page Route----------------------------
router.route("/:univId/book/:bookId").get(function(req, res) {
  var bookId = req.params.bookId;

  var itemPageData = {};

  //---- get bluePrint book ----
  bookBankDB.getbluePrintBook(bookId, function(err, bluePrintBook) {
    if (err) throw err;
    console.log(bluePrintBook);
    itemPageData["bluePrintBook"] = bluePrintBook;

    //---- get donated books of that bluePrint book ----
    bookBankDB.getDonatedBooks(bookId, function(err, donatedBooks) {
      if (err) throw err;

      console.log(donatedBooks);
      itemPageData["donatedBooks"] = donatedBooks;

      //get Users Id of the donated books
      var usersId = donatedBooks.map(function(doc) {
        return doc.userId;
      });
      console.log(usersId);

      // get Users Name of the donated books
      async function innerGetNames(usersId) {
        var ownersName = await bookBankDB.getDonatedBooksOwnersName(usersId);
        itemPageData["donatedBooksOwners"] = ownersName;
        res.json(itemPageData);
      }
      innerGetNames(usersId);
    });
  });
});

module.exports = router;
