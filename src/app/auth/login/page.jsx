'use server'
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import LoginPage from "./components/login";
export default async function Loin() {
    return <LoginPage />
}
export async function LoginFunction(username, password) {
    try {
        const secret =  'my_secret_key';
        const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
        const claims = {
            exp: expiration, 
            username,
            password
        };
        const token = jwt.sign(claims, secret);
        (await cookies()).set('RootUserToken', token, { maxAge: 2592000 });
        return true;
    } catch (error) {
        return false
    }
}