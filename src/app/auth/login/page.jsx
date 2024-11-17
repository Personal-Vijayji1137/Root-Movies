'use server'
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import LoginPage from "./components/login";
import { Root_Movies_DB } from '@/app/layout';
import bcrypt from "bcrypt"
export default async function Loin() {
    return <LoginPage />
}
export async function LoginFunction(username, password) {
    try {
        const user = await Root_Movies_DB(`SELECT * FROM users WHERE username = ?`, [username]);
        if (user.length === 0) {
            return false;
        }
        const isValidPassword = await bcrypt.compare(password, user[0].password_hash);
        if (!isValidPassword) {
            return false;
        }
        if(user[0].is_admin){
            const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
            const claims = {
                exp: expiration, 
                username,
            };
            const token = jwt.sign(claims, process.env.ROOT_SECRET_KEY_FOR_TOKEN_ADMIN);
            (await cookies()).set('AdminSideRootUserToken', token, { maxAge: 2592000 });
            return true;
        }else{
            const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
            const claims = {
                exp: expiration, 
                username,
            };
            const token = jwt.sign(claims, process.env.ROOT_SECRET_KEY_FOR_TOKEN_USES);
            (await cookies()).set('RootUserToken', token, { maxAge: 2592000 });
            
            return true;
        }
    } catch (error) {
        return false;
    }
}