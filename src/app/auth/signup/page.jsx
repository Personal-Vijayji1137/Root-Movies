'use server'
import SignUpPage from './components/signup';
import bcrypt from "bcrypt"
import { Root_Movies_DB } from '@/app/layout';
export default async function CreateAccount() {
    return <SignUpPage />
}
export async function CreateAccountFunction(username, email, password, profile_picture_url) {
    const password_hash = await bcrypt.hash(password, 10);
    try {
        await Root_Movies_DB(
            `INSERT INTO users (username, email, password_hash, profile_picture_url) VALUES (?, ?, ?, ?)`,
            [username, email, password_hash, profile_picture_url]
        );
        return true;
    } catch (error) {
        return false;
    }
}