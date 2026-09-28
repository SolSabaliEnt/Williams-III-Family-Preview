(function(){
  var signedOut=document.querySelector('[data-auth-view="signed-out"]');
  var signedIn=document.querySelector('[data-auth-view="signed-in"]');
  var form=document.getElementById('mock-auth-form');
  var signout=document.getElementById('mock-signout');
  var userLine=document.getElementById('pa-user-line');
  if(!signedOut||!signedIn||!form)return;

  function showSignedIn(email){
    signedOut.hidden=true;
    signedIn.hidden=false;
    if(userLine)userLine.textContent=email ? 'Mock session · '+email : 'Mock authorized session';
  }
  function showSignedOut(){
    signedOut.hidden=false;
    signedIn.hidden=true;
  }
  var session=sessionStorage.getItem('wiii_mock_private_session');
  if(session){
    try{showSignedIn(JSON.parse(session).email||'');}catch(e){sessionStorage.removeItem('wiii_mock_private_session');showSignedOut();}
  }else{showSignedOut();}

  form.addEventListener('submit',function(e){
    e.preventDefault();
    var fd=new FormData(form);
    var email=String(fd.get('email')||'').trim();
    var code=String(fd.get('code')||'').trim();
    if(!email||!code)return;
    sessionStorage.setItem('wiii_mock_private_session',JSON.stringify({email:email,at:Date.now()}));
    showSignedIn(email);
    window.scrollTo({top:document.getElementById('private-access-app').offsetTop-40,behavior:'smooth'});
  });
  if(signout)signout.addEventListener('click',function(){
    sessionStorage.removeItem('wiii_mock_private_session');
    form.reset();
    showSignedOut();
  });
})();