require("dotenv").config();
const { Pool } = require("pg");
// ! Modificar antes de subir a HEROKU
const pool = new Pool();

const getSkaters = async () => {
	const getData = "SELECT * FROM skaters WHERE tipo = 'skater'";

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
		await pool.query('BEGIN');
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
		await pool.query('COMMIT');
		return { skater: resultPost.rows[0] };
	} catch (error) {
		await pool.query('ROLLBACK');
		console.log("--------Error en postSkater--------");
		console.log(error);
		return { error: error };
	}
};

const checkLogIn = async (email, password) => {
	const checkData = "SELECT * FROM skaters WHERE email = $1 AND password = $2";

	try {
		const result = await pool.query(checkData, [email, password]);
		if(result.rows.length > 0) {
			return { 
				user: {
						nombre: result.rows[0].nombre,
						email: result.rows[0].email,
						anos_experiencia: result.rows[0].anos_experiencia,
						especialidad: result.rows[0].especialidad,
						tipo: result.rows[0].tipo,
					} 
				};
		}else{
			return false;
		}
		
	} catch (error) {
		console.log("--------Error en checkLogIn--------");
		console.log(error);
		return { error: error };
	}
}

const putSkaterStatus = async (id,status) => {
	const updateData = "UPDATE skaters SET estado = $1 WHERE id = $2";

	try {
		await pool.query('BEGIN');
		const resultUpdate = await pool.query(updateData, [status,id]);
		await pool.query('COMMIT');
		return { skater: resultUpdate.rows[0] };
	} catch (error) {
		await pool.query('ROLLBACK');
		console.log("--------Error en updateSkaterStatus--------");
		console.log(error);
		return { error: error };
	}
}

module.exports = { getSkaters, postSkater, checkLogIn, putSkaterStatus };
