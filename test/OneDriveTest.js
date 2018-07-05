/**
 * Created by rbritton on 7/01/2018.
 */

process.env.NODE_ENV = 'test';

const configLoc = ("./_" + process.env.NODE_ENV + "_config");
const mocha = require('mocha');
const chai = require('chai');
const assert = require('chai').assert;
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require(configLoc);

const host = config.webURL;
const documentsLink = config.docsURL;
const username = config.userID;
const password = config.password;


const signonUserName = '//*[@name = "loginfmt"]';
const signonNextButton = '//*[@type="submit"]';
const signonPassword = '//*[@placeholder = "Password"]';
const signinButton = '//*[@value="Sign in"]';
const staySignedOn= '//*[@value="Yes"]';
const oneDriveIcon = '//*[@class="ms-Icon--OneDrive"]';
const documentsFolderIcon = '//*[@data-automationid = "Documents"]';
const uploadButton = '//*[@id="id__491"]';
const fileUploadStatus = '//*[@class = "OperationMonitor-itemDescription"]';
const emptyFileMessage = 'Sorry, OneDrive can\'t upload empty folders or empty files. Please try again.';
const fileDoneMessage = 'Done';
const capabilities = {
    'browserName' : 'chrome',
    'chromeOptions' : {
        'args' : ['--disable-infobars']
    }
};


describe("One Drive Automation", function(){
   this.timeout(50000);
   var driver;
   before(function(){
       driver = new webdriver.Builder().
       withCapabilities(capabilities).
       build();
   });
   after(function(){
   //    driver.quit();
   });
   it("I open logon page", function(){
       return driver.get(host);
   });
   it("I enter my username", function(){
       return driver.wait(until.elementLocated(By.xpath(signonUserName)), 20000).sendKeys(username);
   });
   it("I hit 'next'", function(){
       return driver.wait(until.elementLocated(By.xpath(signonNextButton)), 20000).click();
   });
   it("I send my password", function(){
       return driver.wait(until.elementLocated(By.xpath(signonPassword)), 20000).sendKeys(password);
   });
    it("I click 'Yes' on the popup", function(){
        return driver.wait(until.elementLocated(By.xpath(signinButton)), 20000).click();
    });
   it("I click 'login' button", function(){
       return driver.wait(until.elementLocated(By.xpath(staySignedOn)), 20000).click();
   });
   it("I click the 'One Drive' Icon", function(){
       return driver.wait(until.elementLocated(By.xpath(oneDriveIcon)), 20000).click();
       driver.sleep(5000);
   });
   it("I click the 'Documents' folder", function(){
       return driver.get(documentsLink);
   });
   it("I verify I am in the 'Documents' folder", function(){});
   it("I click the upload button in the documents folder", function(){

   });
   it("I choose the file to upload to the documents folder", function(){

   });
   it("I verify the file uploaded successfully to the documents folder", function(){

   });
});