const puppeteer = require("puppeteer")

const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'tyfloncolony@gmail.com'
const password = 'asdqwe123'

let browserOpen = puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null
})

let page;

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function(){
    let emailIsEntered = page.type("input[id='input-1']",email,{delay:50});
    return emailIsEntered;
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']",password,{delay:50});
    return passwordIsEntered;
}).then(function(){
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]',{delay:50});
    return loginButtonClicked;
}).then(function(){

})


function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cPage.waitForModelSelector(selector);
        waitForModelPromise.then(function(){
            let clickModal = cPage.click(selector);
            return clickModal
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}