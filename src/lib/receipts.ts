import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
const limit = 25 * 1024 * 1024;
export function receiptDirectory(){return path.resolve(process.env.UPLOAD_DIR || "./storage/receipts");}
export async function saveReceipt(file:File){
  if(!allowed.has(file.type) || file.size > limit) throw new Error("نوع فایل یا حجم آن مجاز نیست.");
  const bytes=Buffer.from(await file.arrayBuffer()); const key=crypto.randomUUID(); const dir=receiptDirectory();
  await fs.mkdir(dir,{recursive:true}); await fs.writeFile(path.join(dir,key),bytes);
  return {key, checksum:crypto.createHash("sha256").update(bytes).digest("hex")};
}
export async function readReceipt(key:string){return fs.readFile(path.join(receiptDirectory(),path.basename(key)));}
export async function removeReceipt(key:string){try{await fs.unlink(path.join(receiptDirectory(),path.basename(key)));}catch(error:any){if(error?.code!=="ENOENT")throw error;}}
