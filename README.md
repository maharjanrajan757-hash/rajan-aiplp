# StyleNest Cash On Delivery Funnel

Complete Next.js + Tailwind CSS sales funnel for the StyleNest Fashion & Jewelry Combo Set.

## Routes

- `/` - Product landing page
- `/checkout` - Cash On Delivery checkout page
- `/thank-you` - Order confirmation page
- `/api/order` - Secure order submission API

## Order Flow

1. Customer selects quantity on the landing page.
2. Product name, quantity, price per piece, and total price are passed to `/checkout`.
3. Customer enters name, phone, email, and exact location.
4. Checkout posts the order to `/api/order`.
5. The API validates the order, creates an order ID, appends a row to Google Sheets, sends the business order email, then sends the customer confirmation email.
6. The customer is redirected to `/thank-you` only after all required backend actions succeed.

## Environment Variables

Create `.env.local` from `.env.example`.

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BUSINESS_EMAIL=maharjanrajan757@gmail.com
EMAIL_FROM=maharjanrajan757@gmail.com
BRAND_NAME=StyleNest

GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=F&J Orders
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=

EMAIL_SERVICE_API_KEY=

FRONTEND_URL=http://localhost:3000
```

For Gmail SMTP, use an app password, not your normal Gmail password.

## Google Spreadsheet Setup

1. Create a Google Spreadsheet.
2. Rename the sheet/tab to `F&J Orders`.
3. Add these column names in row 1:

```text
Order ID
Date & Time
Customer Name
Phone Number
Email Address
Exact Location
Product Name
Quantity
Price Per Piece
Total Price
Payment Method
Order Status
Notes
```

4. Select row 1 and enable filters from `Data > Create a filter`.
5. Select the `Order Status` column cells below the header.
6. Go to `Data > Data validation`.
7. Add dropdown options:

```text
New Order
Order Confirmed
Order Ongoing
Delivered
Cancelled
```

8. Get the Google Sheet ID from the sheet URL:

```text
https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
```

9. Create a Google Cloud service account with Google Sheets API access.
10. Copy the service account email into `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
11. Copy the private key into `GOOGLE_PRIVATE_KEY`. In `.env.local`, keep line breaks escaped as `\n`.
12. Share the Google Sheet with the service account email and give it Editor permission.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Testing Order Submission

1. Add all Google and SMTP variables to `.env.local`.
2. Start the dev server.
3. Place a test order from `/checkout`.
4. Confirm that:
   - A new row appears in the Google Sheet.
   - The business email arrives at `BUSINESS_EMAIL`.
   - The customer email arrives at the submitted customer email.
   - The browser redirects to `/thank-you`.

If credentials are missing or invalid, the checkout page will show a clear error message and will not redirect.

## Deploying On Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add all variables from `.env.example` in Vercel Project Settings.
4. Use your live Vercel domain for `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL`.
5. Share the Google Sheet with the service account email.
6. Deploy and place one live test order.

## Editing Product Content

Most product copy, prices, benefits, testimonials, FAQs, images, and reels live in:

```text
lib/product.ts
```
