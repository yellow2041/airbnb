const profile_menu_container = document.getElementById('profile_menu_container');
const header_user_btn = document.getElementById('header_user_btn');
const login = document.getElementById('login');
const login_modal = document.getElementById('login_modal');
const input_box_email = document.getElementById('input_box_email');
const input_box_password = document.getElementById('input_box_password');
const signup_modal = document.getElementById('signup_modal');
const experience=document.getElementById('experience_input');
const stays=document.getElementById('stays_input');

function main_page() {
    header_user_btn.addEventListener('click', function (event) {
        if (profile_menu_container.style.visibility === 'visible') {
            //profile_menu_container.style.display='none';
            profile_menu_container.style.visibility = 'hidden';
            header_user_btn.className = "header_user_btn";
        }
        else {
            //profile_menu_container.style.display='flex';
            profile_menu_container.style.visibility = 'visible';
            header_user_btn.className = "header_user_btn_click";
        }
    });

    login.addEventListener('click', (event) => {
        login_modal.style.display = "block";
    });

    document.getElementById('signup').addEventListener('click', (event) => {
        signup_modal.style.display = 'block';
    });

    document.getElementById('close_modal').addEventListener('click', (event) => {
        login_modal.style.display = "none";
    });

    document.getElementById('login_modal').addEventListener('click', (event) => {
        if ((event.target.id === 'modal_overlay' || event.target.id === 'modal_container') && login_modal.style.display === "block"){
            login_modal.style.display = "none";
        }
    });

    document.getElementById('modal').addEventListener('click', (event) => {
        if (event.target.id !== 'login_input_form_email' && input_box_email.className === 'input_box_clicked')
            input_box_email.className = 'input_box';
        else if (event.target.id !== 'login_input_form_password' && input_box_password.className === 'input_box_clicked')
            input_box_password.className = 'input_box';
    });

    document.getElementById('body_div').addEventListener('click', (event) => {
        if (event.target.id !== 'profile_menu' && profile_menu_container.style.visibility === 'visible') {
            profile_menu_container.style.visibility = 'hidden';
            //profile_menu_container.style.display='flex';
            header_user_btn.className = "header_user_btn";
        }
    });

    document.getElementById('login_input_form_email').addEventListener('click', (event) => {
        input_box_email.className = "input_box_clicked";
    });

    document.getElementById('login_input_form_password').addEventListener('click', (event) => {
        input_box_password.className = "input_box_clicked";
    });

    document.getElementById('sign_up_btn').addEventListener('click', (event) => {
        login_modal.style.display = 'none';
        sign_up_modal.style.display = 'block';
    });
}
function main_page_search(){
    document.getElementById('experience_text').addEventListener('click',(event)=>{
        console.log(stays.className);
        experience.className="search_field_select";
        experience.style='animation-name: keyframe_2';
        experience.setAttribute("aria-selected",true);
        if(stays.className==='search_field_select'){
            stays.className='search_field_select_not';
            stays.style='animation-name: none';
            stays.setAttribute("aria-selected",false);
        }
    });
    document.getElementById('stays_text').addEventListener('click',(event)=>{
        stays.className="search_field_select";
        stays.setAttribute("aria-selected",true);
        stays.style='animation-name: keyframe_1';
        if(experience.className==='search_field_select'){
            experience.className='search_field_select_not';
            experience.style='animation-name: none';
            experience.setAttribute("aria-selected",false);
        }
    })
}

function signup_modal_page() {
    document.getElementById('signup_checkbox_box').addEventListener('click', (event) => {
        const signup_checkbox_fake_area = document.getElementById('signup_checkbox_fake_area');
        if (signup_checkbox_fake_area.className === 'checkbox_fake_area') {
            signup_checkbox_fake_area.className = "checkbox_fake_area_clicked";

            const add_check = document.createElement('span');
            const img = document.createElement('img');
            img.src = "../images/check-solid.svg";
            add_check.appendChild(img);
            signup_checkbox_fake_area.appendChild(add_check);
        }
        else {
            signup_checkbox_fake_area.className = "checkbox_fake_area";
            signup_checkbox_fake_area.removeChild(signup_checkbox_fake_area.firstChild);
        }
    });
    document.getElementById('close_modal_signup').addEventListener('click', (event) => {
        signup_modal.style.display = "none";
    });
    signup_modal.addEventListener('click', (event) => {
        if ((event.target.className === 'modal_overlay' || event.target.className === 'modal_container') && signup_modal.style.display === "block")
            signup_modal.style.display = "none";
    });
}

function init() {
    main_page();
    signup_modal_page();
    main_page_search();
}

init();