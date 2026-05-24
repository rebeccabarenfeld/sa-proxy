export default async function handler(req, res) {
  const host = req.headers.host;
  
  const response = await fetch(
    `https://app.synthetic-architect.com/site-by-domain?domain=${host}`
  );
  
  if (!response.ok) {
    return res.status(404).send('Site non trouvé');
  }
  
  const html = await response.text();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
}
