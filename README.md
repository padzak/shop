This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Mock Data

Several .json files present in the ./data directory


## Issues
# redux-persist failed to create sync storage. falling back to memory storage..

the following error is thrown when loading the page not when running the server.   

redux-persist failed to create sync storage. falling back to noop storage.

REASON the redux store is only configured for the client side only. It should also be integrated to work on the server side as well.

next-redux-wrapper has not been implemented

one another solution is to install reduxjs-toolkit-persist

_ store / index.js
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";

const persistConfig = {   key: "persist-store",   storage: storageSession, };

# connect ECONNREFUSED ::1:49921 at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16) 

Error: connect ECONNREFUSED ::1:49921
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16) {
  errno: -61,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '::1',
  port: 49921
}

# Cart updates

The cart is not refreshed when data on site is updated. All the logic is provided within updateCart.js and cart.js files. 
However, the provided solutions are not working and the author removed them without any further comment.