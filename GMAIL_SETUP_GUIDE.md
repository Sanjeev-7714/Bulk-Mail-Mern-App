# Gmail Setup Guide for Bulk Mail Sender

## Fixing Email Authentication Issues

If you're experiencing a `500 Internal Server Error` with the message `ERR_BAD_RESPONSE` when sending emails, it's likely related to Gmail's security settings. Follow these steps to resolve the issue:

## Option 1: Use App Password (Recommended for accounts with 2FA enabled)

1. **Enable 2-Step Verification (if not already enabled)**
   - Go to your Google Account → Security
   - Enable 2-Step Verification

2. **Create an App Password**
   - Go to your Google Account → Security
   - Under "Signing in to Google," select "App passwords"
   - Select "Mail" as the app and "Other" as the device
   - Enter a name (e.g., "Bulk Mail Sender")
   - Click "Generate"
   - Copy the 16-character password that appears

3. **Update your credentials in the database**
   - Keep the same email address
   - Replace your regular password with the generated App Password

## Option 2: Allow Less Secure Apps (Not recommended, but simpler)

1. **Enable Less Secure App Access**
   - Go to your Google Account → Security
   - Scroll down to "Less secure app access" and turn it ON
   - Note: Google may disable this option for accounts with enhanced security

## Option 3: Use OAuth2 Authentication (Advanced)

For a more secure solution, consider implementing OAuth2 authentication. This requires additional setup but provides better security:

1. Create a Google Cloud Platform project
2. Enable the Gmail API
3. Configure OAuth consent screen
4. Create OAuth client ID credentials
5. Implement OAuth2 in your application

## Troubleshooting Tips

- Make sure your Gmail account doesn't have any security blocks
- Check if you've received any security alerts in your Gmail
- Try using a different Gmail account
- Ensure your MongoDB has the correct credentials stored
- Check your network connection and firewall settings

## Important Notes

- Gmail has daily sending limits (500-2000 emails per day for regular accounts)
- For bulk email sending at scale, consider using a dedicated email service like SendGrid, Mailgun, or Amazon SES