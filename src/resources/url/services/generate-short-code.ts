import { findShortCode } from "../providers/find-short-code";

export function generateShortCode(length: number = 7): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    for (let i = 0; i < length; i++) {
      shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortCode;
}

export function generateUniqueShortCode(): Promise<string> {
    const code = generateShortCode();
    return findShortCode(code).then((result) => {
        if (result) return generateUniqueShortCode();
        return code;
    });
}
  
  