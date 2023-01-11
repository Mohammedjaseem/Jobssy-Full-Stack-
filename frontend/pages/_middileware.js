import { NextResponse } from "next/server";

const allowedParams = [
    'keyword',
    'page',
    'location',
    'category',
    'price_min',
    'price_max',
    'salary',
];

export async function middleware(req) {
    const url = req.nextUrl;
    let changed = false;

    const country = req.geo.country;
    console.log('country', country);

    url.searchParams.forEach((param, key) => {
        if (!allowedParams.includes(key)) {
            url.searchParams.delete(key);
            changed = true;
        }
    });

    if(changed) {
        return NextResponse.redirect(url);
    }
   
}