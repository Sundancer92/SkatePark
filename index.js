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
// ---------- FILE UPLOAD ----------
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const expressFileUpload = require("express-fileupload");
app.use(
	expressFileUpload({
		limits: { fileSize: 5000000 },
		abortOnLimit: true,
		responseOnLimit:
			"<div><h1>El peso del archivo que intentas subir supera el limite permitido => 5mb.</h1><button><a href='/'>Volver</a></button></div><style> body{background-color: black;color: white;text-align: center;},</style>",
	}),
);
// ---------- DECLARACIONES ----------
require("dotenv").config();
const port = process.env.PORT || 3000;

const validateToken = (token) => {
	let key = token;
	const validate = jwt.verify(key, process.env.PRIVATE_KEY);
	return validate;
};

const { getSkaters, postSkater, checkLogIn } = require("./DB/querys.js");
const { stringify } = require("querystring");
// -------- FIN DECLARACIONES --------

// ---------- SERVER ----------
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
// -------- FIN SERVER ----------

// ------------ MIDDLEWARES ------------
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

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
	const token = req.cookies.token;
	const auth = validateToken(token);

	if (token) {
		const user = auth.user.user.tipo;
		if (user === "admin") {
			res.render("Dashboard", {
				layout: "Dashboard",
				admin: true,
			});
		} else if (user === "skater") {
			console.log("skater");
			res.render("Dashboard", {
				layout: "Dashboard",
				skater: true,
			});
		}
	} else {
		res.redirect("/Login");
	}
});

// ---------- FIN RUTAS ----------

// ---------- API REST ----------

app.get("/skaters", async (req, res) => {
	const skaters = await getSkaters();
	res.end(JSON.stringify(skaters));
});

app.post("/registrar", async (req, res) => {
	const { email, nombre, password, experiencia, especialidad } = req.body;
	const { target_file } = req.files;
	const fileName = uuidv4() + target_file.name;

	try {
		const skater = await postSkater({
			email,
			nombre,
			password,
			experiencia,
			especialidad,
			fileName,
		});
		target_file.mv(`${__dirname}/public/img/${fileName}`);
	} catch (error) {
		console.log(error);
	}

	res.redirect("/");
});

app.get("/validate", async (req, res) => {
	const { email, password } = req.query;
	const user = await checkLogIn(email, password);

	if (user) {
		const token = jwt.sign({ user }, process.env.PRIVATE_KEY);
		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 1200,
		});
		res.redirect("/Dashboard");
	} else {
		res.statusCode = 401;
		res.redirect("/Login");
	}
});

// -------- FIN API REST --------
