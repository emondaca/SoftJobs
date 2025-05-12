import "dotenv/config";
import format from "pg-format";

import { pool } from "../database/connection.js";

const findOneEmail = async (email) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const { rows } = await pool.query(consulta, [email]);
    return rows[0];
};

const createUsuario = async( email, password, rol, lenguage ) => {
    const registrar = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
    const usuario = [email, password, rol, lenguage];
    const resp = await pool.query(registrar, usuario);
    return resp;
};

const getUser =async (id) => {
    const consulta = "SELECT * FROM usuarios WHERE id = $1";
    const { rows } = await pool.query(consulta, [id]);
    return rows[0];
};

export const userModel = {
    findOneEmail,
    createUsuario,
    getUser
}

