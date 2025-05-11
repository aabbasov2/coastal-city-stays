export default function handler(req, res) {
  res.status(200).json({
    nodeEnv: process.env.NODE_ENV,
    sendgridApiKey: process.env.SENDGRID_API_KEY ? '***' + process.env.SENDGRID_API_KEY.slice(-4) : 'Not set',
    allEnv: Object.keys(process.env).filter(key => key.includes('SENDGRID') || key.includes('NODE_ENV'))
  })
}
