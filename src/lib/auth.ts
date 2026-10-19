import {cookies} from "next/headers"; import crypto from "crypto"; import {db} from "./db";
const name="mea_session"; const hash=(x:string)=>crypto.createHash("sha256").update(x).digest("hex");
export async function owner(){const token=(await cookies()).get(name)?.value;if(!token)return null;const s=await db.session.findFirst({where:{tokenHash:hash(token),expiresAt:{gt:new Date()}},include:{owner:true}});return s?.owner??null;}
export async function setSession(ownerId:string){const token=crypto.randomBytes(32).toString("base64url");const expiresAt=new Date(Date.now()+1000*60*60*24*14);await db.session.create({data:{ownerId,tokenHash:hash(token),expiresAt}});(await cookies()).set(name,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",expires:expiresAt,path:"/"});}
export async function clearSession(){const token=(await cookies()).get(name)?.value;if(token)await db.session.deleteMany({where:{tokenHash:hash(token)}});(await cookies()).delete(name);}
export async function requireOwner(){const o=await owner();if(!o)throw new Error("UNAUTHORIZED");return o;}
