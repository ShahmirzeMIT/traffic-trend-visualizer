import { google } from 'googleapis';
import path from 'path';

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'api/service-account.json'), // Ensure this file exists
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analytics = google.analyticsdata({ version: 'v1beta', auth });
    const response = await analytics.properties.runReport({
      property: 'properties/123456789', // Replace with your GA4 Property ID
      requestBody: {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }],
        dimensions: [{ name: 'country' }],
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Analytics API Error:', error);
    res.status(500).json({ error: 'Analytics API error' });
  }
}
