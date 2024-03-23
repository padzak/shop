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

# Issues

## redux-persist failed to create sync storage. falling back to memory storage..

the following error is thrown when loading the page not when running the server.

redux-persist failed to create sync storage. falling back to noop storage.

REASON the redux store is only configured for the client side only. It should also be integrated to work on the server side as well.

next-redux-wrapper has not been implemented

one another solution is to install reduxjs-toolkit-persist

\_ store / index.js
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";

const persistConfig = { key: "persist-store", storage: storageSession, };

## connect ECONNREFUSED ::1:49921 at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16)

Error: connect ECONNREFUSED ::1:49921
at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16) {
errno: -61,
code: 'ECONNREFUSED',
syscall: 'connect',
address: '::1',
port: 49921
}

## Pages

1. Check all the errors within [id].js, [slug].js pages
2. Loading indicators - www.davidhu.io/react-spinners
3. Check user.addresses (or should it be user.address) in getServerSideProps (pages/profile/address.js f.e.)

### profile/payment

1. Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`. (client.js:2)

### profile/changePassword

1. Check what the hell is going on with the password setting

### browse
1. Brand images are not displayed on the sidebar (vid 198)

## Components

1. Provide country for the <Header /> component (especially in profile/layout)

## Cart

### Update

The cart is not refreshed when data on site is updated. All the logic is provided within updateCart.js and cart.js files.
However, the provided solutions are not working and the author removed them without any further comment.

### Save cart

1. Needs to be fixed - probably due to auth middleware introduced on 04.02.2024
2. API resolved without sending a response for /api/user/saveCart, this may result in stalled requests.
3. Why clicking "Checkout" button redirects to home page (or is it a recent page)?

## Session

1. Shouldn't user session be checked not to be null?
2. Database access optimization - Shouldn't we limit the database access? Several calls seems to be at least doubled without a valid reason.
3. Is fetching user data within checkout.js getServerSideProps() safe?

## Product 

1. Something very wrong with the review stars
2. check order of reviews - [slug].js, productPage/reviews/Table.js, productPage/reviews/
3. compare components/productPage/infos/index.js between two projects
4. Wishlist - add remove from wishlist functionality. Current API is pathetic
5. Add items recognition by size to wishlist (currently it distinguishes product styles/colors only - it's impossible to add two different sizes of a same color)

## Checkout

1. Add links to products in checkout (redirect to product page from checkout)

### shipping input

1. Fix grid display in checkout.module.scss
2. Add indication that specific fields are required
3. Check if all the shipping data is properly pushed to the database - address1 and address2 are not pushed (state?)
4. Why lessons with shipping input (no. ~100-108) have address field in user objects in the database? (I settled for addresses and don't know why)
5. Add confirmation modal before deleting a specific user address

### payment

1. Add proper images for payment methods
2. Payment method remains highlighted after deselect (check in payment component and setPaymentMethod in checkout.js)

## yup-phone

Check why it's not working in components/cart/shipping

## endpoints

Inspect all the endpoints and database updates there. I don't like how it looks right now.

## middleware

1. Check which approach to middleware/auth.js is actually better
2. middleware/auth.js has to be tested before production
3. middleware.js - test if admin route is properly protected
4. middleware/admin.js - check if any issues with createProduct occur - change on Feb 25th 2024

## coupons

1. Test if coupons are working properly - vid 113
2. Check pushing the same order with and without a coupon

## payment

1. Paypal - developer.paypal.com. Paypal configuration vid 121
2. Stripe account - dashboard.stripe.com/test/developers (Remember to use TEST for testing!)
3. Fix - API resolved without sending a response for /api/order/create, this may result in stalled requests.
4. For testing card payments use "4242 4242 4242 4242"
5. Stripe documentation - https://stripe.com/docs/upgrades/manage-payment-methods
6. Provide a valid `return_url` in payWithStripe.js endpoint
7. Find a better alternative than Stripe - 3,5% fee
8. Paypal script provider - check which wrapping of PayPalScriptProvider will be better - currently implemented or one in video 134 2:50

## image upload

1. find out if cloudinary is the best option
2. Check if delete endpoint for cloudinary works as intended

## admin

### admin dashboard

1. Check if user.\_id and order.\_id keys in <tr> elements are correct (pages/admin/dashboard/index.js)

### productCart

1. Buttons are not colored properly (set in products/productCard/styles.module.scss)

### create product

// TODO make it work!!

1. pages/admin/dashboard/product/create.js setProduct({}) details and questions can be approached in two different ways (with respect to pages/api/product/[id].js) - check during testing - Video 151 12:52
2. API resolved without sending a response for /api/admin/subCategory?category=, this may result in stalled requests.
3. http://localhost:3000/admin/dashboard/product/create - throws "Uncaught in promise"
4. Provide subcategories handling in yup validation (pages/admin/dashboard/product/create.js)
5. Add validation for providing the same image twice
6. Provide page version suitable for mobile screen
7. Add error case for createProduct/colors component to prompt user that color extraction is necessary, when colors array length == 0
8. Add prompts to on-image buttons (extract colors, etc)
9. Add tutorial displayed first time with a "remind" button
10. Pick a product color list - when collapsed, the first item should be the currently selected color, if any

### orders

1. Check how order data is fetched (pages/admin/dashboard/order.js)

## PACKAGES

warning " > @material-ui/core@4.12.4" has incorrect peer dependency "react@^16.8.0 || ^17.0.0".
warning " > @material-ui/core@4.12.4" has incorrect peer dependency "react-dom@^16.8.0 || ^17.0.0".
warning "@material-ui/core > @material-ui/system@4.12.2" has incorrect peer dependency "react@^16.8.0 || ^17.0.0".
warning "@material-ui/core > @material-ui/system@4.12.2" has incorrect peer dependency "react-dom@^16.8.0 || ^17.0.0".
warning "@material-ui/core > @material-ui/utils@4.11.3" has incorrect peer dependency "react@^16.8.0 || ^17.0.0".
warning "@material-ui/core > @material-ui/utils@4.11.3" has incorrect peer dependency "react-dom@^16.8.0 || ^17.0.0".
warning "@material-ui/core > @material-ui/styles@4.11.5" has incorrect peer dependency "react@^16.8.0 || ^17.0.0".
warning "@material-ui/core > @material-ui/styles@4.11.5" has incorrect peer dependency "react-dom@^16.8.0 || ^17.0.0".
warning " > @mui/x-date-pickers@6.19.4" has unmet peer dependency "@mui/system@^5.8.0".
warning "eslint-config-next > @typescript-eslint/parser > @typescript-eslint/typescript-estree > tsutils@3.21.0" has unmet peer dependency "typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta".
warning " > react-image-magnify@2.7.4" has incorrect peer dependency "react@~0.14.9 || ^15.0.0 || ^16.0.0".
warning "react-image-magnify > react-cursor-position@2.5.3" has incorrect peer dependency "react@~0.14.9 || ^15.0.0 || ^16.0.0".
