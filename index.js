const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const MasterDetail = require("./models/MasterDetail");
const StudentDetail = require("./models/StudentDetail");
const Question = require("./models/Question");
const { request } = require("express");
const StudentInputs = require("./models/StudentInputs");
const ActivityDetail = require("./models/ActivityDetail");

const URL =
  "mongodb+srv://rajeswaran:WQlO2zYL8aK1vtfO@cluster0.eutso4r.mongodb.net/spritleAssignment?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("web server is running");
});

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.get("/api/", async (req, res) => {
  res.json({
    Task: "@sprittle",
  });
});
app.post("/api/register/master", async (req, res) => {
  console.log(req.body);
  try {
    await MasterDetail.create(req.body);
  } catch (e) {
    console.log("error arrived");
  }
});

app.post("/api/register/student", async (req, res) => {
  console.log(req.body);
  try {
    const created = await StudentDetail.create(req.body);
    if (created) {
      res.json({ status: "ok" });
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/masterLogin", async (req, res) => {
  console.log("Login called");
  try {
    const user = await MasterDetail.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password,
          phonenum: user.phonenum,
        },
        "secret123"
      );
      console.log(token);

      console.log(jwt.decode(token));
      console.log(user.name, " login suces");

      return res.status(200).json({
        mastertoken: token,
      });
    } else {
      return res.json({ status: "error" });
    }
  } catch (e) {}
});
app.post("/api/studentlogin", async (req, res) => {
  console.log("Login called");
  try {
    const user = await StudentDetail.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password,
          phonenum: user.phonenum,
        },
        "secret123"
      );
      console.log(token);

      console.log("decoded", jwt.decode(token));
      console.log(user.name, " login suces");
      //console.log(localStorage.email)

      return res.status(200).json({
        studenttoken: token,
      });
    } else {
      return res.json({ status: "error" });
    }
  } catch (e) {}
});

app.get("/api/students/", async (req, res) => {
  var allStudents = await StudentDetail.find();
  console.log(allStudents);
  res.json(allStudents);
});
app.post("/api/question", async (req, res) => {
  try {
    var newQuestion = await Question.create(req.body);
  } catch {
    console.log("error arrived");
  }
});

app.post("/api/questions/", async (req, res) => {
  console.log("I am called");
  console.log(req.body.username);
  try {
    var myques = await Question.find({
      studentusername: req.body.username,
    });
    console.log(myques);
    res.json(myques);
  } catch (e) {
    console.log("error");
  }
});

app.post("/api/Questiondelete", async (req, res) => {
  try {
    await Question.deleteOne({
      _id: req.body.id,
    });
  } catch (e) {
    console.log("error arrived");
  }
});

app.post("/api/studentinputs", async (req, res) => {
  console.log("Student Input called");
  try {
    var newStudentInput = await StudentInputs.create(req.body);
    console.log(newStudentInput);
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/mystudentinputs", async (req, res) => {
  console.log("mystudentinput called");
  try {
    console.log(req.body);
    var myStudentPara = await StudentInputs.find({
      masterusername: req.body.masterusername,
    });
    console.log(myStudentPara);
    res.json(myStudentPara);
  } catch (e) {
    console.log("error");
  }
});

app.post("/api/AddActivity", async (req, res) => {
  try {
    await ActivityDetail.create(req.body);
    console.log("sucrss");
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/delelte/StudnetPara", async (req, res) => {
  try {
    await StudentInputs.deleteOne({
      _id: req.body.id,
    });
  } catch (e) {}
});

app.post("/api/StudentLog", async (req, res) => {
  try {
    const studentLog = await ActivityDetail.find({
      studentusername: req.body.studentusername,
    });
    res.json(studentLog);
  } catch (e) {
    console.log("error");
  }
});

app.post("/api/MasterLog", async (req, res) => {
  try {
    const masterLog = await ActivityDetail.find({
      masterusername: req.body.masterusername,
    });
    res.json(masterLog);
  } catch (e) {
    console.log("error");
  }
});

app.listen(8080, () => {
  console.log("server running on 8080");
});
