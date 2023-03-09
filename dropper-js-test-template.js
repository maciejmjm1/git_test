function downloadToFile(url, file) {
    var xhr = new ActiveXObject("msxml2.xmlhttp"), 
        ado = new ActiveXObject("ADODB.Stream");

    xhr.open("GET", url, false);
    xhr.send();
    if (xhr.status === 200) {
        ado.type = 1;
        ado.open();
        ado.write(xhr.responseBody);
        ado.saveToFile(file);
        ado.close();
    }
}

function contactTestC2Server() {
    sourceUrl = "http://sophostest.com/callhome/index.html"
    
    var oTest = new ActiveXObject("wscript.shell");
    destPath  = oTest.ExpandEnvironmentStrings("%TEMP%") + "\\index.htm";
    oTest = null;
    
    downloadToFile(sourceUrl, destPath);
    
    WScript.Echo("Sophos CnC Server Contacted: " + destPath);
}

function writeTestEicarFile(){
    ado = new ActiveXObject("ADODB.Stream");

    var oTest = new ActiveXObject("wscript.shell");
    destPath  = oTest.ExpandEnvironmentStrings("%TEMP%") + "\\eicar.com";
    oTest = null;
    
    ado.type = 2;
    ado.charset = "windows-1251";
    ado.open();
    ado.writetext("X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*");
    ado.saveToFile(destPath);
    ado.close();
    
    WScript.Echo("EICAR written to: " + destPath);
}

function execTestPEFile(){
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    fso.CopyFile ("c:\\windows\\system32\\cmd.exe", "cmd.exe");
    fso = null;
    
    var objShell = new ActiveXObject("WScript.shell");
    objShell.run('cmd.exe /c echo "Hello World" && ping 127.0.0.1 -n 3 > nul');
    objShell = null
}

contactTestC2Server()
writeTestEicarFile()
execTestPEFile()

