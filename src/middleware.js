import { NextResponse } from 'next/server'
import { isAuthenticated } from './app/isAuthenticated';
import { isAdminAuthanticatedAuthenticated } from "./app/admin/isAuthenticated"
export async function middleware(request) {
    const urlPath = request.nextUrl.pathname;
    if(urlPath.startsWith("/admin")){
        const AdminVerify = await isAdminAuthanticatedAuthenticated(request);
        if(AdminVerify){
            return NextResponse.next();
        }else{
            const data = await isAuthenticated(request);
            if (data) {
                return NextResponse.redirect(new URL('/home', request.url))
            } else {
                return NextResponse.redirect(new URL('/auth/login', request.url))
            }
        }
    }else{
        const data = await isAuthenticated(request);
        if (data) {
            if (urlPath == '/auth/signup' || urlPath == '/auth/reset') {
                return NextResponse.redirect(new URL('/', request.url))
            }
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }
}
export const config = {
    matcher: [
        '/',
        '/home',
        '/home/:path*',
        '/auth/reset',
        '/admin',
    ],
}