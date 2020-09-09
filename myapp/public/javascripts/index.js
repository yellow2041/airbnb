let t=document.getElementById('profile_menu_container');
let c=document.getElementById('header_user_btn');

c.addEventListener('click',function(event){
    if(t.style.visibility==='visible'){
        t.style.visibility = 'hidden';
        c.className="header_user_btn";
    }
    else{
        t.style.visibility= 'visible';
        c.className="header_user_btn_click";
    }
});

let login=document.getElementById('login');
let login_modal=document.getElementById('login_modal');
login.addEventListener('click',(event)=>{
    login_modal.style.display="block";
});

let signUp=document.getElementById('signUp');

signUp.addEventListener('click',(event)=>{
    location.href='/signUp';
});


let close_modal=document.getElementById('close_modal');

close_modal.addEventListener('click',(event)=>{
    login_modal.style.display="none";
});

const input_box_email=document.getElementById('input_box_email');
const input_box_password=document.getElementById('input_box_password');

document.getElementById('login_modal').addEventListener('click',(event)=>{
    if((event.target.id==='modal_overlay'||event.target.id==='modal_container')&&login_modal.style.display==="block")
        login_modal.style.display="none";
});
document.getElementById('modal').addEventListener('click',(event)=>{
    if(event.target.id!=='login_input_form_email'&&input_box_email.className==='input_box_clicked')
        input_box_email.className='input_box';
    else if(event.target.id!=='login_input_form_password'&&input_box_password.className==='input_box_clicked')
        input_box_password.className='input_box';
});

document.getElementById('body_div').addEventListener('click',(event)=>{
    if(event.target.id!=='profile_menu'&&t.style.visibility=== 'visible'){
        t.style.visibility= 'hidden';
        c.className="header_user_btn";
    }
});

document.getElementById('login_input_form_email').addEventListener('click',(event)=>{
    input_box_email.className="input_box_clicked";
});
document.getElementById('login_input_form_password').addEventListener('click',(event)=>{
    input_box_password.className="input_box_clicked";
});