function base64UrlToBuffer(base64Url) {
    const padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
    const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}
async function verifyJwt(token, secretKey) {
    const [header, payload, signature] = token.split('.');
    const data = `${header}.${payload}`;
    const signatureBuffer = base64UrlToBuffer(signature);
    const keyBuffer = new TextEncoder().encode(secretKey);
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
    );
    const isValid = await crypto.subtle.verify(
        'HMAC',
        cryptoKey,
        signatureBuffer,
        new TextEncoder().encode(data)
    );

    if (!isValid) return null;
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decodedPayload;
}
export async function isAuthenticated(request) {
    const authHeader = request.headers.get('Authorization');
    const cookieToken = request.cookies.get('RootUserToken')?.value;
    if ((!authHeader || !authHeader.startsWith('Bearer ')) && !cookieToken) {
        return false;
    }
    const token = authHeader?.split(' ')[1] || cookieToken;
    try {
        const payload = await verifyJwt(token, process.env.ROOT_SECRET_KEY_FOR_TOKEN_USES);
        return !!payload;
    } catch (error) {
        return false;
    }
}