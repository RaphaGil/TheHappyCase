# Email Setup Guide

This guide explains how to configure email sending for order confirmation emails.

## Installation

First, install the required dependency:

```bash
npm install resend
```

## Configuration

The server uses Resend for sending order confirmation emails. Configure it by adding the following to your `.env` file:

```env
RESEND_API_KEY=re_iV7Ucv7i_M6Bbi2iwk9HFxBzfNSsJqJWY
FROM_EMAIL=onboarding@resend.dev
```

**Important Domain Verification:**
- Resend **requires** domain verification - you cannot use @gmail.com or other public email providers
- For **testing/development**: Use `onboarding@resend.dev` (already set as default)
- For **production**: You must verify your own domain:
  1. Go to https://resend.com/domains
  2. Click "Add Domain"
  3. Enter your domain (e.g., `thehappycase.com`)
  4. Add the DNS records Resend provides to your domain's DNS settings
  5. Wait for verification (usually a few minutes)
  6. Update `FROM_EMAIL` in your `.env` to use your verified domain (e.g., `orders@thehappycase.com`)

**Note:** The API key is already configured in the code as a fallback, but it's recommended to set it in your `.env` file for better security.

## How It Works

1. When a payment is successfully completed, the frontend calls `/api/send-order-confirmation`
2. The server generates an HTML email with:
   - Order details (ID, date, status)
   - Items ordered (with quantities and prices)
   - Shipping address (if provided)
   - Total amount
   - Next steps information

3. The email is sent to the customer's email address automatically using Resend

## Testing

1. Make sure your `.env` file has `RESEND_API_KEY` set (or it will use the default)
2. Start the server: `npm run server`
3. Complete a test payment
4. Check the customer's email inbox for the order confirmation

## Development Mode

If no Resend API key is configured, the server will:
- Log the email details to the console
- Still return success (so payment flow isn't blocked)
- Display instructions for setting up Resend

## Troubleshooting

### Emails not sending?

1. Check server logs for error messages
2. Verify your `.env` file has the correct `RESEND_API_KEY`
3. Check spam/junk folder
4. Verify the `FROM_EMAIL` is a verified domain/email in your Resend account

### Email service not configured?

The server will log email details to the console instead of sending. This is fine for development, but you should configure Resend for production.

---

## Legacy Configuration Options (Deprecated)

The following options are no longer used but kept for reference:

### Option 1: Gmail (Deprecated)

1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Create an app password for "Mail"
   - Copy the generated password

3. Add to your `.env` file:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
FROM_EMAIL=your-email@gmail.com
```

### Option 2: SendGrid (Recommended for Production)

1. Sign up for a SendGrid account at https://sendgrid.com
2. Create an API Key:
   - Go to Settings → API Keys
   - Create a new API key with "Mail Send" permissions
   - Copy the API key

3. Add to your `.env` file:
```env
SENDGRID_API_KEY=your-sendgrid-api-key-here
FROM_EMAIL=orders@thehappycase.com
```

### Option 3: Custom SMTP Server

Add to your `.env` file:
```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
SMTP_SECURE=false
FROM_EMAIL=orders@thehappycase.com
```

## How It Works

1. When a payment is successfully completed, the frontend calls `/api/send-order-confirmation`
2. The server generates an HTML email with:
   - Order details (ID, date, status)
   - Items ordered (with quantities and prices)
   - Shipping address (if provided)
   - Total amount
   - Next steps information

3. The email is sent to the customer's email address automatically

## Testing

1. Make sure your `.env` file is configured with one of the options above
2. Start the server: `npm run server`
3. Complete a test payment
4. Check the customer's email inbox for the order confirmation

## Development Mode

If no email configuration is provided, the server will:
- Log the email details to the console
- Still return success (so payment flow isn't blocked)
- Display instructions for setting up email

## Troubleshooting

### Emails not sending?

1. Check server logs for error messages
2. Verify your `.env` file has the correct variables
3. For Gmail: Make sure you're using an App Password, not your regular password
4. For SendGrid: Verify your API key has "Mail Send" permissions
5. Check spam/junk folder

### Email service not configured?

The server will log email details to the console instead of sending. This is fine for development, but you should configure a real email service for production.












