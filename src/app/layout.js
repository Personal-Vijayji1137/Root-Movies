import "./globals.css";
import mysql from 'mysql2/promise';
import NextTopLoader from 'nextjs-toploader';
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const pool = mysql.createPool({
  host: process.env.LIT_STAR_DB_HOST_URL,
  user: process.env.LIT_STAR_DB_USER,
  password: process.env.LIT_STAR_DB_PASSWORD,
  database: process.env.LIT_STAR_DB_NAME,
  waitForConnections: true,
  connectionLimit: 50,
});
export async function Root_Movies_DB(query, params = []) {
  try {
    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    throw error;
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body>
        <NextTopLoader color="red" showSpinner={false}/>
        {children}
      </body>
    </html>
  );
}
