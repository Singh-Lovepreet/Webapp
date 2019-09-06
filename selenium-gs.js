const {Builder, By, Key, until} = require('selenium-webdriver');
const {Options} = require('selenium-webdriver/chrome');
const remote = require('selenium-webdriver/remote');

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new Options().addArguments("user-data-dir=/Users/Vijay/.chrome/data_dir/gs-testing/"))
    .build();



const DEV = true;
const serverUrl = DEV ? 'http://localhost:7007' : "http://arya.io/server";

const openSocket = require('socket.io-client');
const socket = openSocket(serverUrl);
// socket.on('newData', (data) => {
//     const text = data.prescription && data.prescription.replace(/\|/g, '\n');
//     let mobileNumber = data.mobileNumber || "9686834644";
//     if(mobileNumber.length == 10) {
//        mobileNumber = "91" + mobileNumber;
//     }
//     const url = 'https://web.whatsapp.com/send?phone='+mobileNumber+'&text=' + encodeURIComponent(text);
//     driver.get(url)
//         .then(_ => driver.wait(until.elementLocated(By.className('compose-btn-send'))))
//         .then(_ => {
//             driver.findElement(By.className('compose-btn-send')).sendKeys('webdriver', Key.RETURN);
//             console.log('message sent!');
//         });
// });

socket.on('connect', () => {
    console.log('connected to the server');
});

socket.on('disconnect', () => {
    console.log('disconnected from the server');
});

/**
 * convert prescription_main.png -fuzz 2% -transparent white prescription_main_transparent.png
 * convert prescription_main_transparent.png -page -20+20 -background none -flatten prescription_main_transparent.png
 * composite prescription_main_transparent.png prescription_base.png prescription_result.png
 */


socket.on('newData', (data) => {
    const text = data && data.prescription && data.prescription.replace(/\|/g, '\n') || 'Something to Test';
    let mobileNumber = data && data.mobileNumber || "9810966018";
    if(mobileNumber.length === 10) {
        mobileNumber = "91" + mobileNumber;
    }
    const imageFilePath = data && data.imageFilePath;
    if(!imageFilePath) {
        console.log('there is no image :(');
        return;
    }

    const url = 'https://web.whatsapp.com/send?phone='+mobileNumber+'&text=' + encodeURIComponent(text);
    driver.get(url)
        .then(_ => driver.wait(until.elementLocated(By.css('div[role=button][title=Attach]'))))
        .then(_ => {
            _.click();
            console.log('attachment clicked!');
        })
        .then(_ => driver.wait(until.elementLocated(By.css(".attach-menu-container li input"))))
        .then(_ => {
            driver.setFileDetector(new remote.FileDetector());
            return driver.findElement(By.css(".attach-menu-container li input"))
                .sendKeys(imageFilePath);
        })
        .then(_ => {
            return driver.wait(until.elementLocated(By.css('.drawer-controls div[role=button]')))
        })
        .then(_ => {
            _.click();
            console.log('media sent!');
        });
});
