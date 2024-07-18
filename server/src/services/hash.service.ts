import bcrypt from 'bcrypt';
class HashService {
    static async hash(data: string): Promise<string> {
        return bcrypt.hash(data, 10);
    }

    static async compare(data: string, encryptedData: string): Promise<boolean> {
        return bcrypt.compare(data, encryptedData);
    }
}
export default HashService;