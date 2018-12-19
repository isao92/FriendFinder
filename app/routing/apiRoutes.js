// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends.
// ===============================================================================

var friendsData = require("./../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendsData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {

    
    // reset values
    i = 0;
    j = 0;

    // Do a parseInt on the scores
    for (var i = 0; i < req.body.scores.length; i++) {
      req.body.scores[i] = parseInt(req.body.scores[i]);
    }

    // initialize to store both values to then compare
    var total1 = 0;
    var total2 = 0;
    var sent = false;

    // push req.body to friendsData
    friendsData.push(req.body);

    // loop through each friend stored in the data
    for (var i = 0; i < friendsData.length - 1; i++) {

      // loop through arrays and look at each index at a time
      for (var j = 0; j < friendsData[i].scores.length; j++) {

          if (i==0){
          // compare values with last person
          
          // calculate the difference
          var difference1 = friendsData[friendsData.length - 1].scores[j] - friendsData[i].scores[j];
          // variable that stores the total
          total1 = (Math.abs(difference1) + total1);


          // compare values with other last person
          
          // calculate the difference2
          var difference2 = friendsData[friendsData.length - 1].scores[j] - friendsData[i + 1].scores[j];
          // variable that stores the total2
          total2 = (Math.abs(difference2) + total2);
          }

        if (!sent) {
          // once all iterations have finished
          if (i > 0 && j > 8) {
            // detect match
            if (total1 > total2) {
              console.log("Your friend is: " + friendsData[i].name);
              res.json(friendsData[i]);
              sent = true;
            } else {
              console.log("Your friend is: " + friendsData[i - 1].name);
              res.json(friendsData[i - 1]);
              sent = true;
            }
          }
        }
      }
    } //end for loop 2

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!
  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friendsData.length = [];
    res.json({ ok: true });
  });
};
