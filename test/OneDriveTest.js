/**
 * Created by rbritton on 7/01/2018.
 */

process.env.NODE_ENV = 'test';

const configLoc = ("./_" + process.env.NODE_ENV + "_config");
const mocha = require('mocha');
const chai = require('chai');
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require(configLoc);

const host = config.webURL;
const username = config.userID;
const password = config.password;


const signonUserName = '//*[@name = "loginfmt"]';
const signonNextButton = '//*[@type="submit"]';
const signonPassword = '//*[@placeholder = "Password"]';
const signinButton = '//*[@value="Sign in"]';
const staySignedOn= '//*[@value="Yes"]';
const uploadButton = '//*[@id="id__491"]';
let driver;
const capabilities = {
    'browserName' : 'chrome',
    'chromeOptions' : {
        'args' : ['--disable-infobars']
    }
};

const userLogin = function(){
    driver.get(host);
    let signin = By.xpath(signonUserName);
    driver.wait(until.elementLocated(signin,20000));
    driver.wait(until.elementIsVisible(driver.findElement(signin)),20000);
    driver.wait(until.elementLocated(By.xpath(signonUserName)), 20000).sendKeys(username);
    driver.wait(until.elementLocated(By.xpath(signonNextButton)), 20000).click();
    driver.wait(until.elementLocated(By.xpath(signonPassword)), 20000).sendKeys(password);
    driver.sleep(3000);
    driver.wait(until.elementLocated(By.xpath(signinButton)), 20000).click();
    //select "Yes" in window
    driver.wait(until.elementLocated(By.xpath(staySignedOn)), 20000).click();
};
describe('OneDrive Automation', function(){
    this.timeout(5000);
    before(function(done){
        driver = new webdriver.Builder().
        withCapabilities(capabilities).
        build();
        done();
    });
    //after.(function() {
    //    driver.quit();
    //});
    it('User with valid credentials can log in', function(done){
        userLogin();
        done();
        });
    });