// ---------- EXPRESS ----------
const express = require("express");
const app = express();
// ------------ JWT ------------
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
// -------- BODY PARSER --------
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// --------- HANDLEBARS ---------
const exphbs = require("express-handlebars");
app.set("view engine", "handlebars");
app.engine(
	"handlebars",
	exphbs.engine({
		layoutsDir: __dirname + "/views",
		partialsDir: __dirname + "/views/componentes/",
	}),
);
// ---------- DECLARACIONES ----------
require("dotenv").config();
const port = process.env.PORT || 3000;
const {} = require('./DB/querys.js')
// -------- FIN DECLARACIONES --------

// ---------- SERVER ----------
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
// -------- FIN SERVER ----------

// ------------ MIDDLEWARES ------------
app.use(cookieParser());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "public"));

// * Bootstrap
app.use(
	"/bootstrap",
	express.static(__dirname + "/node_modules/bootstrap/dist/css"),
);
app.use(
	"/BootstrapJs",
	express.static(__dirname + "/node_modules/bootstrap/dist/js/"),
);
// * FIN Bootstrap
// ------------ FIN MIDDLEWARES ------------

// ------------ RUTAS ------------

app.get("/", (req, res) => {
	res.render("Index", {
		layout: "Index",
	});
});

app.get("/Login", (req, res) => {
	res.render("Login", {
		layout: "Login",
	});
});

app.get("/Registro", (req, res) => {
	res.render("Registro", {
		layout: "Registro",
	});
});

app.get("/Dashboard", (req, res) => {
	res.render("Dashboard", {
		layout: "Dashboard",
	});
});

// ---------- FIN RUTAS ----------
