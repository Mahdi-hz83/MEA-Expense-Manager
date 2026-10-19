import {toGregorian,toJalaali} from "jalaali-js";
import {normalize} from "./text";
export function jalaliToIso(value:string){const [jy,jm,jd]=normalize(value).split("/").map(Number);if(!jy||!jm||!jd)throw new Error("تاریخ شمسی نامعتبر است.");const g=toGregorian(jy,jm,jd);return `${g.gy}-${String(g.gm).padStart(2,"0")}-${String(g.gd).padStart(2,"0")}`;}
export function isoToJalali(value:Date|string){const d=new Date(value);const j=toJalaali(d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate());return `${j.jy}/${String(j.jm).padStart(2,"0")}/${String(j.jd).padStart(2,"0")}`.replace(/\d/g,x=>"۰۱۲۳۴۵۶۷۸۹"[Number(x)]);}
