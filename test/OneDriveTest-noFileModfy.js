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
const fs = require('fs');

const host = config.webURL;
const oneDrive = config.oneDriveURL;
const docsFolder = config.documentsURL;
const username = config.userID;
const password = config.password;
const cwd = config.cwd;
const testFile = config.downloadFile1;
const downLoadLocation = config.downloadLocation;

const signonUserName = '//*[@name = "loginfmt"]';
const signonNextButton = '//*[@type="submit"]';
const signonPassword = '//*[@placeholder = "Password"]';
const signinButton = '//*[@value="Sign in"]';
const staySignedOn= '//*[@value="Yes"]';
const documentsBreadCrumb= '//*[@class = "BreadcrumbBar-item"][@title = "Documents"]';
const uploadRootButton = '//*[@class = "ms-OverflowSet-item item_8ddbc6c5"]//*[@name = "Upload"]';
const uploadButton = '//span[text() = "Files"][@class = "ms-ContextualMenu-itemText"]';
const emptyUploadScript = 'EmptyUpload.exe';
const uploadScript = 'TestUpload1.exe';
const fileUploadStatus = '//*[@class = "OperationMonitor-itemDescription"]';
const emptyFileMessage = "Sorry, OneDrive can't upload empty folders or empty files. Please try again.";
const uploadTestFileName = '//*[@data-automationid = "';
const selectButton = '//span[@class = "ms-Tile-check check_04bd1798 checkHost_85139c76"]';
const detailsButton = '//*[@class = "ms-OverflowSet-item item_8ddbc6c5"]//*[@name = "Details"]';
const oneDriveFilename = '//*[@class = "InfoPane-itemDetails-name"]';
const oneDriveFileSize = '//*[@data-bind= "text: title"][text() = "Size"]//following-sibling::dd[1]';
const oneDriveFileType = '//*[@data-bind= "text: title"][text() = "Type"]//following-sibling::dd[1]';
const oneDriveFileModified = '//*[@data-bind= "text: title"][text() = "Modified"]//following-sibling::dd[1]';
const versionHistoryButton = '//*[@class = "ms-OverflowSet-item item_8ddbc6c5"]//*[@name = "Version history"]';
const downloadFile = '//*[@class = "od-modifiedDateColumn-modifiedDate"]';
const versionHistoryClose = '//*[@class = "od-Panel-button od-Panel-button--close"][@aria-label = "Close"]';
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
describe("One Drive Automation-login", function(){
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
            assert.equal(text, "Documents");
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
            assert.equal(text, "Documents");
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

        let filePath = (uploadTestFileName + testFile + '"]');
        console.log('Xpath for filename in documents list: ' + filePath);

        return driver.wait(until.elementLocated(By.xpath(filePath)), 20000).then(function(text){
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
            assert.equal(text, "Documents");
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
describe("Download current file, and read the file text from download location", function(){
    this.timeout(50000);
    it("I select document version history", function(){
        driver.sleep(3000);
        return driver.wait(until.elementLocated(By.xpath(versionHistoryButton)), 20000).click();
    });
    it("I click on the current version to download", function(){
        driver.sleep(5000);
        return driver.wait(until.elementLocated(By.xpath(downloadFile)), 20000).click();
    });
    it("I close the version history window", function(){
        return driver.wait(until.elementLocated(By.xpath(versionHistoryClose)), 20000).click();
    });
    it("I open the file, and output it's contents", function(){
        driver.sleep(5000);
        let filePath = (downLoadLocation + testFile + '');
        let fileText = fs.readFileSync(filePath, 'utf-8');
        console.log('Text in test file is: ');
        console.log(fileText);
    });
});
describe('Cleanup tasks', function(){
    this.timeout(50000);
    it("I remove the file copy from the downloads location", function(){
        let filePath = (downLoadLocation + testFile);
        fs.unlinkSync(filePath);
    });
    it("I click the 'One Drive' Icon", function(){
        return driver.get(oneDrive);
    });
    it("I click the 'Documents' folder", function(){
        return driver.get(docsFolder);
    });
    it("I select the test file one One Drive to be deleted", function(){
        return driver.wait(until.elementLocated(By.xpath(selectButton)), 20000).click();
    });
    it("I click the 'delete' button", function(){
        driver.sleep(5000);
        return driver.wait(until.elementLocated(By.xpath(deleteButton)), 20000).click();
    });
    it("I verify the file was deleted", function(){
        return driver.wait(until.elementLocated(By.xpath(emptyFolderMsg)), 20000).getText().then(function(text){
            assert.equal(text, emptyFolderText);
        });
    });
    it("I close the session", function(){
        driver.close();
    });
});