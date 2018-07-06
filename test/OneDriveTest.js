/**
 * Created by rbritton on 7/01/2018.
 */

process.env.NODE_ENV = 'test';

const configLoc = ("./_" + process.env.NODE_ENV + "_config");
const mocha = require('mocha');
const chai = require('chai');
const au = require('autoit');
const assert = require('chai').assert;
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require(configLoc);

const host = config.webURL;
const oneDrive = config.oneDriveURL;
const docsFolder = config.documentsURL;
const emptyFile = config.emptyTestFilePath;
const testFile = config.testFilePath;
const username = config.userID;
const password = config.password;


const signonUserName = '//*[@name = "loginfmt"]';
const signonNextButton = '//*[@type="submit"]';
const signonPassword = '//*[@placeholder = "Password"]';
const signinButton = '//*[@value="Sign in"]';
const staySignedOn= '//*[@value="Yes"]';
const documentsBreadCrumb= '//*[@aria-label = "Breadcrumb, You are currently in Documents, within Files"]';
const uploadRootButton = '//*[@class = "ms-OverflowSet-item item_8ddbc6c5"]//*[@name = "Upload"]';
const uploadButton = '//span[text() = "Files"][@class = "ms-ContextualMenu-itemText"]';
const fileUploadStatus = '//*[@class = "OperationMonitor-itemDescription"]';
const emptyFileMessage = "Sorry, OneDrive can't upload empty folders or empty files. Please try again.";
const fileDoneMessage = 'Done';
const capabilities = {
    'browserName' : 'chrome',
    'chromeOptions' : {
        'args' : ['--disable-infobars', '--start-maximized']
    }
};
let driver;
describe("One Drive Automation", function(){
   this.timeout(50000);
   before(function(){
       driver = new webdriver.Builder().
       withCapabilities(capabilities).
       build();
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
       return driver.get(oneDrive);
   });
});
describe("Upload empty document to Documents folder", function(){
    this.timeout(50000);
    it("I click the 'Documents' folder", function(){
        return driver.get(docsFolder);
    });
    it("I verify I am in the 'Documents' folder", function(){
        return driver.wait(until.elementLocated(By.xpath(documentsBreadCrumb)), 20000).getText().then(function(text){
            assert.equal(text, "FilesDocuments")
        });
    });
    it("I click the upload button in the documents folder", function(){
        driver.sleep(5000);
        return driver.wait(until.elementLocated(By.xpath(uploadRootButton)), 20000).click();

    });
    it("I choose the file upload option from the menu", function(){
        return driver.wait(until.elementLocated(By.xpath(uploadButton)), 20000).click();
    });
    it("I choose the file to be uploaded from the windows popup", function(){
        //au.Init();
        //au.ControlSetText("Open", "", 1148, "C:\\Users\\user\\Desktop\\OneDriveAutomation\\test\\files\\emptyFile.txt");
        //au.ControlClick("Open", "", 1)
    });
    it("I verify the file uploaded successfully to the documents folder");
});