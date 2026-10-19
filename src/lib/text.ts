export function normalize(value:string){return value.trim().replace(/[٠-٩]/g,d=>String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/[۰-۹]/g,d=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/ي/g,"ی").replace(/ك/g,"ک").replace(/\s+/g," ");}
export function toman(n:number){return new Intl.NumberFormat("fa-IR").format(n)+" تومان";}
export const methods={CASH:"نقدی",CARD_TRANSFER:"کارت‌به‌کارت",BANK_TRANSFER:"انتقال بانکی",CHEQUE:"چک",OTHER:"سایر"} as const;
