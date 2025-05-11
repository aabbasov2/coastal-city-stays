export default function EnvCheckPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Environment Variables</h1>
      <pre>{
        JSON.stringify({
          NODE_ENV: process.env.NODE_ENV,
          SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? '***' + process.env.SENDGRID_API_KEY.slice(-4) : 'Not set',
        }, null, 2)
      }</pre>
    </div>
  )
}
