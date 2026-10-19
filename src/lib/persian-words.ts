import {normalize} from "./text";
const ones=["","یک","دو","سه","چهار","پنج","شش","هفت","هشت","نه","ده","یازده","دوازده","سیزده","چهارده","پانزده","شانزده","هفده","هجده","نوزده"];
const tens=["","","بیست","سی","چهل","پنجاه","شصت","هفتاد","هشتاد","نود"];
const hundreds=["","صد","دویست","سیصد","چهارصد","پانصد","ششصد","هفتصد","هشتصد","نهصد"];
const scales=["","هزار","میلیون","میلیارد","تریلیون"];
function group(n:number){const p:string[]=[];if(n>=100){p.push(hundreds[Math.floor(n/100)]);n%=100}if(n>=20){p.push(tens[Math.floor(n/10)]);if(n%10)p.push(ones[n%10])}else if(n)p.push(ones[n]);return p.join(" و ")}
export function tomanWords(raw:string){const n=Number(normalize(raw).replace(/[^0-9]/g,""));if(!Number.isSafeInteger(n)||n<0)return "";if(n===0)return "صفر تومان";let x=n,i=0;const p:string[]=[];while(x&&i<scales.length){const part=x%1000;if(part)p.unshift(`${group(part)}${scales[i]?` ${scales[i]}`:""}`);x=Math.floor(x/1000);i++}return x?"مبلغ بسیار بزرگ است":`${p.join(" و ")} تومان`;}
