import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { userModel } from "../models/user.model.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOneEmail(email);
        if (!user) {
        return res.status(400).json({ message: "User not found" });
        } 
        const isMatch = bcript.compareSync(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
        } 

        const payload = { email, user_id: user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(200).json({ message: "User logged successfully", token, email });

    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
    }
};

const register = async (req, res) => {  
    const email = req.body.email;
    try {
        const emailExist = await userModel.findOneEmail(email);
        if (!emailExist) {
            await userModel.createUsuario(
            email,
            bcript.hashSync(req.body.password, 10),
            req.body.rol,
            req.body.lenguage
            );
            return res.status(201).json({ message: "User created successfully" });  
        }
        return res.status(400).json({message: "email ya existe"});
        
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message} = getDatabaseError(error.code);
            return( {code, message });  
        } 
        return res.status(500).json({ message: "Internal server error" });
    }
    };
    
const traerUsuario = async (req, res, next) => {
    const user_id = req.user.user_id;
    try {
        const usuario = await userModel.getUser(user_id);
        const user= {id: usuario.id, rol: usuario.rol, lenguage: usuario.lenguage };
        console.log(user);
        if (!usuario) {
        return res.status(400).json({ message: "User not found" });
        } 
        console.log(res);
        return res.send({ data : [user] });
        
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
        return res.status(400).json({ message: "User already exists" });
        } 
        return res.status(500).json({ message: "Internal server error" });
    }

};

export const userController = {
    login,
    register, 
    traerUsuario
};