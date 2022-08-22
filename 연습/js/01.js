;(function() {
    'use strict'

    const get = (target) => {
        return document.querySelector(target);
    };
    
    const $loginInfo = get('.loginInfo'); // 로그인정보 띄울 칸의 클래스 정보 가져오기
    const $form = get('.loginForm'); //폼태그 가져오기
    const $btn = get('.btn');
    const $idInput = get('.idInput');
    const $pswdInput = get('.pswdInput');
    const API_URL = 'http://localhost:3000/info';
    const $loginBtn = get('.loginBtn');

    const createInfoElement = (elem) => {
        const { id, password, IDinfo } = elem; 
        
        const $infoElem = document.createElement('div');
        $infoElem.classList.add('element');
        $infoElem.dataset.id = id;
        $infoElem.innerHTML = `
            <div class="content">
                <label class='contentLabel'>${id}</label>
                <label class='contentIdInfo'>${IDinfo}</label>
                <label class='contentpswd'>${password}</label>
            </div>
        `;
        return $infoElem;
    };

    const renderAllInfos = (infos) => {
        $loginInfo.innerHTML = '';
        infos.forEach((item) => {
            const infoElement = createInfoElement(item);
            $loginInfo.appendChild(infoElement);
        })
    };

    const getInfo = () => {
        fetch(API_URL).then(response => response.json())
        .then((infos) => renderAllInfos(infos))
        .catch((error) => console.error(error));
        
    };

    const addInfo = (e) => {
        e.preventDefault(); // 새로고침 안되게 하기
        console.log($idInput.value);

        const info = {
            IDinfo: $idInput.value,
            password: $pswdInput.value,
        };

        fetch('http://localhost:3000/info', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        }).then(getInfo).then(() => { // 인풋 값 초기화시켜주는것 
            $idInput.value = ''; 
            $pswdInput.value = '';
        
        }).catch((error) => console.error(error));
    };

    const init = () => { //초기 시작
        window.addEventListener('DOMContentLoaded', () => {
            getInfo();
        });
        
        $btn.addEventListener('submit', addInfo);
    };
    
    init();
})()