# Contact Form Backend Setup Guide

Your portfolio now has a **fully functional contact form backend** with email sending capability. Here's how to set it up:

## What Was Added

### 1. **API Route** (`src/app/api/contact/route.ts`)
- Secure backend endpoint at `/api/contact`
- Input validation and sanitization
- Email injection protection
- Supports both Resend and Formspree

### 2. **Updated Contact Component** (`src/components/Contact.tsx`)
- Now sends to your new local API endpoint
- Better error handling
- Fixed styling to match new color system

## Setup Instructions

### Option 1: Using Resend (Recommended) ✨

**Advantages:**
- Full control over emails
- Beautiful email templates
- Best integration with Vercel
- Free tier available (100 emails/day)

**Steps:**
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Create an API key from the dashboard
4. Create a `.env.local` file in your project root:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=your-email@gmail.com
```
5. Deploy to Vercel and add these environment variables in Vercel settings

### Option 2: Using Formspree (Easy Alternative)

**Advantages:**
- No backend code needed
- Spam protection built-in
- Free tier available

**Steps:**
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form and copy the form ID
4. Create a `.env.local` file:
```
FORMSPREE_ID=your_form_id_here
```

## How It Works

When someone submits the contact form:

1. **Frontend** validates the form inputs
2. **API Route** receives the request and:
   - Validates and sanitizes all inputs
   - Checks email format
   - Limits message length (10-5000 chars)
   - Prevents XSS attacks
3. **Email Service** sends you the message with:
   - Sender's name and email
   - Full message content
   - Beautiful formatted HTML
4. **Response** confirms success to the user

## API Endpoint Details

**POST** `/api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "service": "Resend" or "Formspree"
}
```

**Error Response (400/500):**
```json
{
  "error": "Description of what went wrong"
}
```

## Security Features

✅ **Input Sanitization** - Removes HTML and special characters  
✅ **Email Validation** - Regex check + format validation  
✅ **Length Limits** - Name (2-100), Message (10-5000)  
✅ **XSS Protection** - Prevents injection attacks  
✅ **Rate Limiting** - Use Vercel's built-in protection (add as needed)  

## Testing Locally

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
# Go to the Contact section
# Submit the form

# Check console for API response
```

## Deploying to Vercel

1. Push to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings:
   - `RESEND_API_KEY` or `FORMSPREE_ID`
   - `CONTACT_EMAIL` (for Resend)
4. Deploy!

## Troubleshooting

### "Email service not configured"
- Make sure `.env.local` exists with either `RESEND_API_KEY` or `FORMSPREE_ID`
- On Vercel, add these to Environment Variables

### Emails not being received
- Check spam folder
- Verify the email address in `.env.local` is correct
- Test with a known working email service first

### CORS errors
- The API route is same-origin, so CORS shouldn't be an issue
- If you see CORS errors, it's likely a different issue

## Next Steps

1. Choose your email service (Resend recommended)
2. Create your API key/form ID
3. Add to `.env.local`
4. Test locally with `npm run dev`
5. Deploy to Vercel
6. Add environment variables to Vercel
7. Test your live form!

## Support

If issues arise:
- Check the Next.js API documentation: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Resend docs: https://resend.com/docs
- Formspree docs: https://formspree.io/docs
