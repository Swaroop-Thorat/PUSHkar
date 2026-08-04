Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd.exe /c cd /d ""A:\PUSHkar"" && npm start", 0, False