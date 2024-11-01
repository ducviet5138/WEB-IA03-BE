import * as bcrypt from 'bcrypt';

export async function hashPassword(s: string) {
    const saltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    return bcrypt.hash(s, saltRound);
}