// f399b3c8beecaa881f887cd877a23aec-us21   / api key for mailchimp
// ade15e0d7f unique id for mailchimp

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstname;
  const secondName = req.body.secondname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName,
        },
      },
    ],
  };

  let jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/ade15e0d7f";

  options = {
    method: "POST",
    auth: "george1:f399b3c8beecaa881f887cd877a23aec-us21",
  };

  const request = https.request(url, options, function (response) {

    if(response.statusCode === 200 && firstName.length !== 0 && secondName.length !== 0 && email.length !== 0){
        res.sendFile(__dirname + "/success.html")
    }else {
        res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();


});

app.post("/failure", function (req,res){
    res.redirect("/")
})


app.listen(3000, function () {
  console.log("listing on port 3000");
});
