module.exports = async function handler(req, res) {
  const host = req.headers.host;
  const url = req.url.split('?')[0];

  // Page register
  if (url === '/register') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(getRegisterPage());
  }
 
  // Proxy vers le site client par domaine
  const response = await fetch(
    'https://app.synthetic-architect.com/site-by-domain?domain=' + host
  );

  if (!response.ok) {
    return res.status(404).send('Site non trouvé');
  }

  const html = await response.text();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
};

function getRegisterPage() {
  return '<!DOCTYPE html>' +
    '<html lang="fr">' +
    '<head>' +
    '<meta charset="utf-8"/>' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0"/>' +
    '<title>Créer mon compte — Synthetic Architect</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>' +
    '<style>' +
    '*{box-sizing:border-box;margin:0;padding:0}' +
    'body{font-family:Inter,sans-serif;background:#f9f8f6;color:#1a1a1a;-webkit-font-smoothing:antialiased}' +
    'input,button{font-family:inherit;font-size:14px;outline:none}' +
    'input{width:100%;padding:11px 14px;border:1px solid #e5e5e5;border-radius:9px;background:#fff;color:#1a1a1a;transition:border-color .15s}' +
    'input:focus{border-color:#1a1a1a}' +
    'button{cursor:pointer;border:none}' +
    '.wrap{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}' +
    '.card{background:#fff;border-radius:18px;padding:36px;width:100%;max-width:400px;box-shadow:0 4px 32px rgba(0,0,0,.07)}' +
    '.logo{width:44px;height:44px;background:#1a1a1a;border-radius:12px;line-height:44px;color:#fff;font-weight:800;font-size:16px;margin:0 auto 16px;text-align:center}' +
    '.title{font-size:22px;font-weight:800;text-align:center;margin-bottom:4px}' +
    '.sub{font-size:13px;color:#999;text-align:center;margin-bottom:24px}' +
    '.features{background:#f9f8f6;border-radius:10px;padding:14px;margin-bottom:20px}' +
    '.feature{display:flex;align-items:center;gap:8px;font-size:12px;color:#555;margin-bottom:6px}' +
    '.feature:last-child{margin-bottom:0}' +
    '.feature::before{content:"✓";color:#16a34a;font-weight:700;flex-shrink:0}' +
    '.field{margin-bottom:14px}' +
    '.field-label{display:block;font-size:11px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px}' +
    '.btn-main{width:100%;padding:13px;background:#1a1a1a;color:#fff;border-radius:10px;font-weight:700;font-size:14px;transition:opacity .15s;margin-top:4px}' +
    '.btn-main:hover{opacity:.85}' +
    '.btn-main:disabled{opacity:.45;cursor:not-allowed}' +
    '.error{color:#dc2626;font-size:12px;text-align:center;margin-top:10px;min-height:16px}' +
    '.success{color:#16a34a;font-size:13px;text-align:center;margin-top:10px;min-height:16px;font-weight:600}' +
    '.login-link{font-size:12px;color:#bbb;text-align:center;margin-top:16px}' +
    '.login-link a{color:#1a1a1a;font-weight:600;text-decoration:none}' +
    '</style>' +
    '</head>' +
    '<body>' +
    '<div class="wrap"><div class="card">' +
    '<div class="logo">SA</div>' +
    '<h1 class="title">Créer mon compte</h1>' +
    '<p class="sub">Votre site professionnel en 30 secondes</p>' +
    '<div class="features">' +
    '<div class="feature">Landing page générée par l\'IA</div>' +
    '<div class="feature">Domaine personnalisé inclus</div>' +
    '<div class="feature">5 crédits IA offerts</div>' +
    '</div>' +
    '<div class="field"><label class="field-label">Nom complet</label><input type="text" id="regName" placeholder="Marie Dupont" autocomplete="name"/></div>' +
    '<div class="field"><label class="field-label">Email</label><input type="email" id="regEmail" placeholder="marie@exemple.fr" autocomplete="email"/></div>' +
    '<div class="field"><label class="field-label">Mot de passe</label><input type="password" id="regPwd" placeholder="••••••••" autocomplete="new-password"/></div>' +
    '<button class="btn-main" id="regBtn" onclick="doRegister()">Créer mon compte gratuit →</button>' +
    '<p class="error" id="regError"></p>' +
    '<p class="success" id="regSuccess"></p>' +
    '<div class="login-link">Déjà un compte ? <a href="https://app.synthetic-architect.com/client">Se connecter</a></div>' +
    '</div></div>' +
    '<script>' +
    'var API="https://app.synthetic-architect.com";' +
    'document.getElementById("regPwd").addEventListener("keydown",function(e){if(e.key==="Enter")doRegister();});' +
    'document.getElementById("regEmail").addEventListener("keydown",function(e){if(e.key==="Enter")doRegister();});' +
    'async function doRegister(){' +
    'var name=document.getElementById("regName").value.trim();' +
    'var email=document.getElementById("regEmail").value.trim();' +
    'var pwd=document.getElementById("regPwd").value;' +
    'var btn=document.getElementById("regBtn");' +
    'var err=document.getElementById("regError");' +
    'var suc=document.getElementById("regSuccess");' +
    'err.textContent="";suc.textContent="";' +
    'if(!name||!email||!pwd){err.textContent="Tous les champs sont requis";return;}' +
    'if(pwd.length<6){err.textContent="Mot de passe trop court (min 6)";return;}' +
    'btn.disabled=true;btn.textContent="Création en cours...";' +
    'try{' +
    'var res=await fetch(API+"/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name,email:email,password:pwd})});' +
    'var data=await res.json();' +
    'if(data.ok){' +
    'suc.textContent="Compte créé ! Redirection...";' +
    'var lr=await fetch(API+"/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email,password:pwd})});' +
    'var ld=await lr.json();' +
    'if(ld.ok){localStorage.setItem("pagecraft_client",JSON.stringify(ld));setTimeout(function(){window.location.href=API+"/client";},1000);}' +
    '}else{err.textContent=data.message||"Erreur";btn.disabled=false;btn.textContent="Créer mon compte gratuit →";}' +
    '}catch(e){err.textContent="Erreur réseau";btn.disabled=false;btn.textContent="Créer mon compte gratuit →";}' +
    '}' +
    '</script>' +
    '</body></html>';
}
