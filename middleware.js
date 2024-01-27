// middleware.js

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Allow access to the home page for all users
  if (req.nextUrl.pathname === '/') {
    return res;
  }

  if (user && req.nextUrl.pathname === '/authentication/sign-in') {
    return NextResponse.redirect(new URL('/search-product', req.url))
  }

  if (!user && req.nextUrl.pathname !== '/search-product') {
    return NextResponse.redirect(new URL('/authentication/sign-in', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/authentication/sign-in', '/search-product'],
}




// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextResponse } from 'next/server';
// import { useEffect, useState } from 'react';

// export async function middleware(req) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });

//   let initialUser = null;
//   if (typeof window !== 'undefined') {
//     // Only use useState and useEffect on the client side
//     const [user, setUser] = useState("");
//     initialUser = user;

//     useEffect(() => {
//       const fetchUserSession = async () => {
//         try {
//           const { data } = await supabase.auth.getUser();
//           setUser(data); // Use data directly
//         } catch (error) {
//           console.error('Error fetching user session:', error.message);
//         }
//       };

//       fetchUserSession();
//     }, [supabase]);
//   }

//   // if user is signed in and the current path is / redirect the user to /account
//   if (initialUser && req.nextUrl.pathname === '/authentication/sign-in') {
//     return NextResponse.redirect(new URL('/search-product', req.url));
//   }

//   // if user is not signed in and the current path is not / redirect the user to /
//   if (!initialUser && req.nextUrl.pathname !== '/search-product') {
//     return NextResponse.redirect(new URL('/authentication/sign-in', req.url));
//   }

//   return res;
// }

// export const config = {
//   matcher: ['/search-product', '/authentication/sign-in'],
// };
