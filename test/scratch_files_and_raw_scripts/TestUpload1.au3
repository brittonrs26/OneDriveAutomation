#cs ----------------------------------------------------------------------------

 AutoIt Version: 3.3.14.5
 Author:         myName

 Script Function:
	Template AutoIt script.

#ce ----------------------------------------------------------------------------

; Script Start - Add your code below here
WinWaitActive("Open")
ControlSetText("Open", "", 1148, "C:\Users\user\Desktop\OneDriveAutomation\test\files\testFile1.txt")
ControlClick("Open", "",1)