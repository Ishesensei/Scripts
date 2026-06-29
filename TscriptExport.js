imp("Tc");
bindClass("java.io.File");
bindClass("java.io.RandomAccessFile");
bindClass("android.media.MediaScannerConnection");
bindClass("java.util.zip.CRC32");
bindClass("java.text.SimpleDateFormat");
bindClass("java.util.Date");

// Get script data and clean it properly
var inputData = LL.getEvent().getData();
if(inputData !== null && inputData !== ""){
 inputData = inputData.replace(/^["']|["']$/g, "");
 inputData = inputData.replace(/,\s*$/, "").trim();
}
var BASE_ROOT = (inputData !== null && inputData !== "") ? inputData : "/storage/emulated/0/Download/LL/Scripts";

// Generate timestamp for backup folder
var dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
var timestamp = dateFormat.format(new Date());
var EXPORT_ROOT = BASE_ROOT + "/" + timestamp;
//u5
function getFileChecksum(file){
 try{
  var raf = new RandomAccessFile(file, "r");
  var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 8192);
  var crc = new CRC32();
  var len;
  while((len = raf.read(buffer)) != -1){
   crc.update(buffer, 0, len);
  }
  raf.close();
  return crc.getValue();
 } catch(e){ return -1; }
}

function getScriptChecksum(s){
 try{
  var content = "" + s.getText();
  var bytes = new java.lang.String(content).getBytes("UTF-8");
  var crc = new CRC32();
  crc.update(bytes, 0, bytes.length);
  return crc.getValue();
 } catch(e){ return -1; }
}

function getPreviousBackupDir(currentTimestamp){
 var baseDir = new File(BASE_ROOT);
 if(!baseDir.exists()) return null;
 var backups = [];
 var files = baseDir.listFiles();
 if(files){
  for(var i=0; i<files.length; i++){
   if(files[i].isDirectory()){
    var name = files[i].getName();
    if(name.match(/^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/)){
     // Only include folders that are OLDER than current timestamp
     if(name < currentTimestamp){
      backups.push(files[i]);
     }
    }
   }
  }
 }
 // Sort newest first (so the latest backup before current is at index 0)
 backups.sort(function(a, b){ 
  if(a.getName() < b.getName()) return 1;
  if(a.getName() > b.getName()) return -1;
  return 0;
 });
 return backups.length > 0 ? backups[0] : null;
}

function deleteDirectory(dir){
 var files = dir.listFiles();
 if(files){
  for(var i=0; i<files.length; i++){
   if(files[i].isDirectory()){
    deleteDirectory(files[i]);
   } else {
    files[i].delete();
   }
  }
 }
 dir.delete();
}

function manageBackups(){
 var baseDir = new File(BASE_ROOT);
 if(!baseDir.exists()) return;
 
 var backups = [];
 var files = baseDir.listFiles();
 if(files){
  for(var i=0; i<files.length; i++){
   if(files[i].isDirectory()){
    var name = files[i].getName();
    if(name.match(/^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/)){
     backups.push({
      file: files[i],
      name: name,
      time: files[i].lastModified()
     });
    }
   }
  }
 }
 
 backups.sort(function(a, b){ 
  if(a.name < b.name) return -1;
  if(a.name > b.name) return 1;
  return 0;
 });
 
 while(backups.length > 90){
  var oldest = backups.shift();
  try { deleteDirectory(oldest.file); } catch(e){}
 }
}

function exportScripts(){
 var root = new File(EXPORT_ROOT);
 if(!root.exists()) root.mkdirs();
 var dummy = new File(root, ".dummy_" + new java.util.Date().getTime());
 try { dummy.createNewFile(); dummy.delete(); } catch(e){}
 try { MediaScannerConnection.scanFile(LL.getContext(), [EXPORT_ROOT], null, null); } catch(e){}
 
 // Get the previous backup directory (the one right before this export)
 var lastBackup = getPreviousBackupDir(timestamp);
 
 var scripts = LL.getAllScriptMatching(0);
 var exported = [];
 
 for(var i=0; i<scripts.getLength(); i++){
  try{
   var s = scripts.getAt(i);
   var scriptName = s.getName() || "Script_"+s.getId();
   var fileName = scriptName.replace(/[<>:"\/\\|?*]/g,"_");
   var newContent = "" + s.getText();
   var scriptCrc = getScriptChecksum(s);
   
   // Build the full path relative to root
   var p = s.getPath();
   var subPath = "";
   if(p && p!=="/"){
    subPath = p.replace(/^\/+/,"");
   }
   
   // Create directories
   var d = root;
   if(subPath){
    var pts = subPath.split("/");
    for(var j=0; j<pts.length; j++){
     if(pts[j]){
      d = new File(d, pts[j]);
      if(!d.exists()) d.mkdirs();
     }
    }
   }
   
   // Check if script has changed from previous backup using CRC
   var hasChanged = true;
   if(lastBackup){
    try{
     // Build the same path in previous backup
     var lastD = lastBackup;
     if(subPath){
      var pts = subPath.split("/");
      for(var j=0; j<pts.length; j++){
       if(pts[j]){
        lastD = new File(lastD, pts[j]);
       }
      }
     }
     // Check both regular and starred versions
     var lastFile = new File(lastD, fileName + ".js");
     if(!lastFile.exists()){
      lastFile = new File(lastD, fileName + " ★" + ".js");
     }
     if(lastFile.exists()){
      var lastCrc = getFileChecksum(lastFile);
      if(lastCrc == scriptCrc){
       hasChanged = false;
      }
     }
    } catch(e){}
   }
   
   // Always export, add star if changed
   var finalFileName = fileName + (hasChanged ? " ★" : "") + ".js";
   var f = new File(d, finalFileName);
   var raf = new RandomAccessFile(f, "rw");
   raf.setLength(0);
   raf.write(new java.lang.String(newContent).getBytes("UTF-8"));
   raf.close();
   exported.push(f);
   
  } catch(e){}
 }
 try { MediaScannerConnection.scanFile(LL.getContext(), [EXPORT_ROOT], null, null); } catch(e){}
 try { java.lang.Runtime.getRuntime().exec("sync"); } catch(e){}
 return { exported: exported };
}

manageBackups();

var maxAttempts = 5, allExported = false, attempts = 0;
var totalExported = 0;

while(!allExported && attempts < maxAttempts){
 attempts++;
 var result = exportScripts();
 totalExported += result.exported.length;
 var scripts = LL.getAllScriptMatching(0);
 var missing = [], ok = 0;
 for(var i=0; i<scripts.getLength(); i++){
  try{
   var s = scripts.getAt(i);
   var scriptName = s.getName() || "Script_"+s.getId();
   var fileName = scriptName.replace(/[<>:"\/\\|?*]/g,"_");
   var p = s.getPath();
   var subPath = "";
   if(p && p!=="/"){
    subPath = p.replace(/^\/+/,"");
   }
   
   var d = new File(EXPORT_ROOT);
   if(subPath){
    var pts = subPath.split("/");
    for(var j=0; j<pts.length; j++){
     if(pts[j]){
      d = new File(d, pts[j]);
     }
    }
   }
   //hh
   var f = new File(d, fileName + ".js");
   var starF = new File(d, fileName + " ★" + ".js");
   var fileCrc = -1;
   if(starF.exists()) { fileCrc = getFileChecksum(starF); }
   else if(f.exists()) { fileCrc = getFileChecksum(f); }
   var scriptCrc = getScriptChecksum(s);
   if((f.exists() && fileCrc == scriptCrc) || (starF.exists() && fileCrc == scriptCrc)){ ok++; }
   else { missing.push(s.getName()); }
  } catch(e){ missing.push("unknown"); }
 }
 var total = scripts.getLength();
 if(missing.length > 0){
  if(attempts < maxAttempts){ java.lang.Thread.sleep(200); continue; }
  else { allExported = true; }
 } else {
  allExported = true;
 }
}

Tc(totalExported, 1, 1);