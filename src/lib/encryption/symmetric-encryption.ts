import "server-only";
import crypto from "crypto";
const algo = "aes-256-cbc"; //key length must be 32 bytes

export function symmetricEncrypt(value: string): string {
  const key = process.env.ENCRYPTION_KEY;

  if (!key) {
    throw new Error("Invalid encryption key. It must be 32 bytes long.");
  }

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algo, Buffer.from(key, "hex"), iv);

  let encryptedData = cipher.update(value);
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);

  return iv.toString("hex") + ":" + encryptedData.toString("hex");
}

export function symmetricDecrypt(encryptedValue: string): string {
  const key = process.env.ENCRYPTION_KEY;

  if (!key) {
    throw new Error("Invalid encryption key. It must be 32 bytes long.");
  }

  const parts = encryptedValue.split(":");
  if (parts.length !== 2) {
    throw new Error("Invalid encrypted value format.");
  }

  const iv = Buffer.from(parts.shift() as string, "hex");
  const encryptedData = Buffer.from(parts.join(":"), "hex");

  const decipher = crypto.createDecipheriv(algo, Buffer.from(key, "hex"), iv);

  let decryptedData = decipher.update(encryptedData);
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);

  return decryptedData.toString();
}
