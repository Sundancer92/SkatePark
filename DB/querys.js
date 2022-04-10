require("dotenv").config();
const { Pool } = require("pg");
// ! Modificar antes de subir a HEROKU
const pool = new Pool();

const getSkaters = async () => {
	const getData = "SELECT * FROM skaters";

	try {
		const skaters = await pool.query(getData);
		return { skaters: skaters.rows };
	} catch (error) {
		console.log("--------Error en getSkaters--------");
		console.log(error);
		return { error: error };
	}
};

const postSkater = async (skater) => {
	const postData =
		"INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

	try {
		const resultPost = await pool.query(postData, [
			skater.email,
			skater.nombre,
			skater.password,
			skater.experiencia,
			skater.especialidad,
			skater.fileName,
			false,
			"skater",
		]);

		return { skater: resultPost.rows[0] };
	} catch (error) {
		console.log("--------Error en postSkater--------");
		console.log(error);
		return { error: error };
	}
};

module.exports = { getSkaters, postSkater };
