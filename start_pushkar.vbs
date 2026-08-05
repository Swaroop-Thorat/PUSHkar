Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd.exe /c cd /d ""A:\PUSHkar"" && node server/server.js", 0, False