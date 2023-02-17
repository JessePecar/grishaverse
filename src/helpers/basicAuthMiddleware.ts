export { basicAuthMiddleware };

async function basicAuthMiddleware(request: any, response: any) {
    // make authenticate path public
    if (request.url === '/api/users/authenticate') {
        return;
    }

    // check for basic auth header
    if (!request.headers.authorization || request.headers.authorization.indexOf('Bearer ') === -1) {
        throw { status: 401, message: 'Missing Authorization Header' };
    }

    // verify auth credentials
    const base64Credentials = request.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
}