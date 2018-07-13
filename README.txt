If you have any questions about this, I can be reached by phone or email:
	email address:  brittonrs26@gmail.com
	phone:  901-568-6411

Tests are saved on github, at this URL:  https://github.com/brittonrs26/OneDriveAutomation

These will need to be installed prior to setting up the dependencies on the package.json with the project file:
Python 2.7
Add Python settings to system path variable in environment variables
C:\Python27
C:\Python27\Lib\site-packages
C:\Python27\Scripts

These node modules will also need to be installed first:
Run this from the command shell:
First navigate to the project folder in the command shell.
Then type:
"npm install -g --production windows-build-tools"
"npm install -g node-gyp"

Then, you will need to install the modules located in the package.json file in the project's main folder
You can do this by navigating to the root of the project folder in the command shell, and typing:
"npm install"
This will install the following:
chai:	version 4.1.2,
	Website:  https://www.npmjs.com/package/chai
autoit:	version 1.1.9,
	Website:  https://www.npmjs.com/package/autoit
selenium-webdriver:	4.0.0-alpha.1
	Website:  https://www.npmjs.com/package/selenium-webdriver
mocha:	5.2.0
	Website: https://www.npmjs.com/package/mocha

You will also need to open the file named "_test_config.js" in the "test" folder,
and change the following values:
	"config.cwd":    Change to the path of the test folder for this project is located
	"config.downloadLocation":  Change to the path to your local downloads location.

Also, if you are using a different One Drive file, you will also need to change the userid and password values in the
"_test_config.js" to the credentials you are using for the test.

Once these are installed, you can run the tests from the command line by navigating to the 
project folder, and then typing "mocha", then enter

The tests can also be run in your favorite IDE that can run javascript.  To do this you will need
to install the Mocha test runner for your chosen IDE


Here is a rundown of each test (in order of how they are run in the test file:

I ran the tests in four blocks of tests. I had to run each step as it's own test case because
it is easier to isolate errors and failures when only one step is run at a time.
	The first block tests the login feature
	The second tests uploading an empty file
	The third uploads a file with data
	The fourth validates the metadata of the file that was just uploaded
	The fifth views the version history of the file from step three, downloads the most recent copy, 
	and writes the contents of the file to the console
	The last block runs cleanup fuctions:  deletes the test file from one drive, and the 
	downloads location, and closes the test session.

Each test step is listed below
	
describe("One Drive Automation-login") --These tests ensure the user can logon with no issues
   it("I open logon page")
   it("I enter my username")
   it("I hit 'next'")
   it("I send my password")
   it("I click 'Yes' on the popup")
   it("I click 'login' button")
   it("I click the 'One Drive' Icon")
   it("I click the 'Documents' folder"))
   
describe("Upload empty document to Documents folder") --In this test I ensure I land in the documents
folder, and ensure that the correct download status is communicated.
    it("I verify I am in the 'Documents' folder")
	--Here I assert that the page's breadcrumb indiates that I am in the "Documents" folder.
	--This is to make sure that I got the the place the button was supposed to take me.
    it("I click the upload button in the documents folder")
    it("I choose the file upload option from the menu")
    it("I choose the file to be uploaded from the windows popup")
    it("I verify the file upload status"))
	--Here I assert that the page displays the empty file message.
	--If it reads: Sorry, OneDrive can't upload empty folders or empty files. Please try again.,
	--the test passes, if not the test fails.
	
describe("Upload non-empty document to Documents folder")
    it("I click the upload button in the documents folder")
    it("I choose the file upload option from the menu",)
    it("I choose the file to be uploaded from the windows popup")
    it("I verify the file upload status"))
    --Here I am looking for the presence of the filename in the page DOM.
	--If it appears, then the file uploaded successfully.  If not, the test fails
	--I had to validate this way, instead of using the status panel, because the status
	--Panel disappears faster than the script can click it.
	
describe("Verify the file's metadata")
it("I verify I am in the 'Documents' folder");
    it("I select the file")
    it("I select the details button")
    it("I verify the file's metadata-name")
	--Here I assert that the file's name in the system information on the source file matches
	--the name displayed in One Drive
    it("I verify the file's metadata-size")
	--Here I assert that the file's size in the system information on the source file matches
	--the name displayed in One Drive
    it("I verify the file's metadata-type")
	--Here I assert that the file's type (file extension) in the system information on the source 
	--file matches the name displayed in One Drive
    it("I verify the file's metadata-modified"))
	--Here I assert that the file's create date (which shows as modified date in One Drive) in 
	--the system information on the source file matches the name displayed in One Drive
	
describe("Download current file, and read the file text from download location")
    it("I select document version history")
    it("I click on the current version to download")
    it("I close the version history window")
    it("I open the file, and output it's contents from the downloads location"))
	--I open the file and read it's contents to ensure it made it to the download
	--location correctly
	
describe('Cleanup tasks')
--These are cleanup tasks to ensure the tests can be run again
    it("I remove the file copy from the downloads location");
    it("I click the 'One Drive' Icon");
    it("I click the 'Documents' folder");
    it("I select the test file one One Drive to be deleted");
    it("I click the 'delete' button");
    it("I verify the file was deleted");
	--Here if check for the presence of the text saying "This folder is empty"
	--If the text is there, the test passes.  It fails if it isn't.	
    it("I close the session"));
	
	
This test can be run with different files by changing the filename (value is "config.downloadFile1")
to the new file being uploaded in the "_test_config.js" file.
You will also need to add the test file to the test\files folder in the project file.

One way that this test can be expanded beyond the UI is to also write tests against One Drive
to validate the uploads.
You can also upload, and modify files by sending transactions to the API, and verifying the
response message to ensure the file uploaded correctly.


