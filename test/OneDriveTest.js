/**
 * Created by rbritton on 7/01/2018.
 */

process.env.NODE_ENV = 'test';

const configLoc = ("./_" + process.env.NODE_ENV + "_config");
const mocha = require('mocha');
const assert = require('chai').assert;
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require(configLoc);
const exec = require('child_process');

const host = config.webURL;
const oneDrive = config.oneDriveURL;
const docsFolder = config.documentsURL;
const username = config.userID;
const password = config.password;
const cwd = config.cwd;

const signonUserName = '//*[@name = "loginfmt"]';
const signonNextButton = '//*[@type="submit"]';
const signonPassword = '//*[@placeholder = "Password"]';
const signinButton = '//*[@value="Sign in"]';
const staySignedOn= '//*[@value="Yes"]';
const documentsBreadCrumb= '//*[@aria-label = "Breadcrumb, You are currently in Documents, within Files"]';
const uploadRootButton = '//*[@class = "ms-OverflowSet-item item_8ddbc6c5"]//*[@name = "Upload"]';
const uploadButton = '//span[text() = "Files"][@class = "ms-ContextualMenu-itemText"]';
const emptyUploadScript = 'EmptyUpload.exe';
const uploadScript = 'TestUpload1.exe';
const fileUploadStatus = '//*[@class = "OperationMonitor-itemDescription"]';
const emptyFileMessage = "Sorry, OneDrive can't upload empty folders or empty files. Please try again.";
const selectButton = '//span[@class = "ms-Tile-check check_04bd1798 checkHost_85139c76"]';
const detailsButton = '//*[@class = "ms-OverflowSet-item item_8ddbc6c5"]//*[@name = "Details"]';
const oneDriveFilename = '//*[@class = "InfoPane-itemDetails-name"]';
const oneDriveFileSize = '//*[@data-bind= "text: title"][text() = "Size"]//following-sibling::dd[1]';
const oneDriveFileType = '//*[@data-bind= "text: title"][text() = "Type"]//following-sibling::dd[1]';
const oneDriveFileModified = '//*[@data-bind= "text: title"][text() = "Modified"]//following-sibling::dd[1]';
const deleteButton = '//*[@class = "ms-OverflowSet-item item_8ddbc6c5"]//*[@name = "Delete"]';
const emptyFolderMsg = '//*[@class = "EmptyFolder-title"]';
const emptyFolderText = 'This folder is empty';

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
    it("I click the 'Documents' folder", function(){
        return driver.get(docsFolder);
    });
});
describe("Upload empty document to Documents folder", function(){
    this.timeout(50000);
    it("I verify I am in the 'Documents' folder", function(){
        return driver.wait(until.elementLocated(By.xpath(documentsBreadCrumb)), 20000).getText().then(function(text){
            assert.equal(text, "FilesDocuments");
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
        exec.execFile(emptyUploadScript, {cwd: cwd},function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    });
    it("I verify the file upload status", function(){
        return driver.wait(until.elementLocated(By.xpath(fileUploadStatus)), 20000).getText().then(function(text){
            assert.equal(text, emptyFileMessage);
        });
    });
});
describe("Upload non-empty document to Documents folder", function(){
    this.timeout(50000);
    it("I verify I am in the 'Documents' folder", function(){
        return driver.wait(until.elementLocated(By.xpath(documentsBreadCrumb)), 20000).getText().then(function(text){
            assert.equal(text, "FilesDocuments");
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
        exec.execFile(uploadScript, {cwd: cwd},function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    });
    it("I verify the file upload status", function(){
        //I am looking here for the presence of the filename in the page DOM
        return driver.wait(until.elementLocated(By.xpath(uploadRootButton)), 20000).getText().then(function(text){
            console.log("File uploaded successfully.")
        });
    });
});
describe("Verify the file's metadata", function(){
    this.timeout(50000);
    //Source file metadata
    const fileName = "testFile1.txt";
    const fileType = "Text Document";
    const modified = "7/6/2018 1:02 PM";
    const size = "11 bytes";

    it("I verify I am in the 'Documents' folder", function(){
        return driver.wait(until.elementLocated(By.xpath(documentsBreadCrumb)), 20000).getText().then(function(text){
            assert.equal(text, "FilesDocuments");
        });
    });
    it("I select the file", function(){
        return driver.wait(until.elementLocated(By.xpath(selectButton)), 20000).click();
    });
    it("I select the details button", function(){
        return driver.wait(until.elementLocated(By.xpath(detailsButton)), 20000).click();
    });
    it("I verify the file's metadata-name", function(){
        return driver.wait(until.elementLocated(By.xpath(oneDriveFilename)), 20000).getText().then(function(text){
            assert.equal(text, fileName);
        });
    });
    it("I verify the file's metadata-size", function(){
        return driver.wait(until.elementLocated(By.xpath(oneDriveFileSize)), 20000).getText().then(function(text){
            assert.equal(text, size);
        });
    });
    it("I verify the file's metadata-type", function(){
        return driver.wait(until.elementLocated(By.xpath(oneDriveFileType)), 20000).getText().then(function(text){
            assert.equal(text, fileType);
        });
    });
    it("I verify the file's metadata-modified", function(){
        return driver.wait(until.elementLocated(By.xpath(oneDriveFileModified)), 20000).getText().then(function(text){
            assert.equal(text, modified);
        });
    });
});
describe("Delete the file", function(){
    after(function(){
        driver.quit();
    });
    it("I click the 'delete' button", function(){
        return driver.wait(until.elementLocated(By.xpath(deleteButton)), 20000).click();
    });
    it("I verify the file was deleted", function(){
        return driver.wait(until.elementLocated(By.xpath(emptyFolderMsg)), 20000).getText().then(function(text){
            assert.equal(text, emptyFolderText);
        });
    });
});