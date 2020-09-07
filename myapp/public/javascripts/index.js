let t=document.getElementById('profile_menu_container');
let c=document.getElementById('header_user_btn');

c.addEventListener('click',function(event){
    t.style.visibility= 'visible';
    c.className="header_user_btn_click";
});

let login=document.getElementById('login');

login.addEventListener('click',(event)=>{
    location.href='/login';
});

let signUp=document.getElementById('signUp');

signUp.addEventListener('click',(event)=>{
    location.href='/signUp';
})