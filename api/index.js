export default async function handler(req, res) {
  const host = req.headers.host;
  const url = req.url.split('?')[0];

  // Page register
if (url === '/register') {    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Créer mon compte — Synthetic Architect</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#f9f8f6;color:#1a1a1a;-webkit-font-smoothing:antialiased}
input,button{font-family:inherit;font-size:14px;outline:none}
input{width:100%;padding:11px 14px;border:1px solid #e5e5e5;border-radius:9px;background:#fff;color:#1a1a1a;transition:border-color .15s}
input:focus{border-color:#1a1a1a}
button{cursor:pointer;border:none}
.wrap{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
.card{background:#fff;border-radius:18px;padding:36px;width:100%;max-width:400px;box-shadow:0 4px 32px rgba(0,0,0,.07)}
.logo{width:44px;height:44px;background:#1a1a1a;border-ra
