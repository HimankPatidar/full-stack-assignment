const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
    const {email, password} = req.body;

    const existUser = USERS.find(user => user.email === email)

    if(existUser){
      res.status(400).json({error : "User already exist"})
      return;

    }

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
    const newUser = {email, password};
    USERS.push(newUser);

  // return back 200 status code to the client
    res.status(200).json({msg: "User created Successfully"})
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  	const {email, password}= req.body
  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  const user = USERS.find(u=> u.email===email && u.password===password)

  if(!user || user.password !== password){
    res.status(401).json({ error : 'Wrong credentials' })
    return;
  
  }

  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  const token = Math.random().toString(36).substr(-8);
  console.log('token', token);
  res.status(200).send({ token , msg:'Logged In successfully' });
});


app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.status(200).json(QUESTIONS)
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.status(200).json(SUBMISSION)
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})