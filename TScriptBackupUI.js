// TSCRIPTS VERSION CONTROL - ARROWS & TIMELINE RESTORE  
// ============================================================  
  
var BASE_ROOT = "/storage/emulated/0/Download/LL/Scripts";  
// ------------------------------------------------------------  
// SAFE CLASS BINDING  
// ------------------------------------------------------------  
bindClass("android.widget.FrameLayout");   
bindClass("android.widget.LinearLayout");   
bindClass("android.widget.ScrollView");  
bindClass("android.widget.TextView");  
bindClass("android.widget.EditText");  
bindClass("android.graphics.Color");   
bindClass("android.graphics.drawable.GradientDrawable");   
bindClass("android.view.View");   
bindClass("android.view.Gravity");  
bindClass("android.app.AlertDialog");  
bindClass("android.content.DialogInterface");  
bindClass("android.content.Intent");  
bindClass("android.net.Uri");  
bindClass("java.io.File");  
bindClass("java.io.RandomAccessFile");  
bindClass("java.util.zip.CRC32");  
bindClass("java.text.SimpleDateFormat");  
bindClass("java.util.Date");  
bindClass("java.lang.String");  
  
var ctx = LL.getContext();  
var JRunnable = java.lang.Runnable;   
  
// ------------------------------------------------------------  
// STATE MANAGEMENT  
// ------------------------------------------------------------  
var selections = { commits: {}, files: {} };  
var allPillContainers = [];   
var allArrows = [];  
  
// Timeline State  
var tlSelectedNode = null;  
var tlSelectedView = null;  
  
// ------------------------------------------------------------  
// UTILITY & STYLING HELPERS  
// ------------------------------------------------------------  
function getPanelBg(radius, colorHex, strokeHex) {  
    var bg = new GradientDrawable();  
    bg.setColor(Color.parseColor(colorHex));  
    bg.setCornerRadius(radius);  
    if (strokeHex) bg.setStroke(2, Color.parseColor(strokeHex));  
    return bg;  
}  
  
function applyBlur(view, radius) {  
    try { view.setBackgroundBlur(radius, [radius, radius, radius, radius, radius, radius, radius, radius]); } catch(e) {}  
}  
  
function createText(text, size, color, isBold) {  
    var tv = new TextView(ctx);  
    tv.setText(text);  
    tv.setTextSize(size);  
    tv.setTextColor(Color.parseColor(color));  
    if (isBold) tv.setTypeface(null, 1);  
    return tv;  
}  
  
// ------------------------------------------------------------  
// MT MANAGER / FILE EXPLORER INTENT  
// ------------------------------------------------------------  
function openInFileExplorer(customPath) {  
    var targetPath = customPath || BASE_ROOT;  
    var file = new File(targetPath);  
    if (!file.exists()) file.mkdirs();  
  
    var pm = ctx.getPackageManager();  
    var mtIntent = pm.getLaunchIntentForPackage("bin.mt.plus");  
  
    if (mtIntent) {  
        mtIntent.setAction(Intent.ACTION_VIEW);  
        mtIntent.setDataAndType(Uri.parse("file://" + targetPath), "*/*");  
        ctx.startActivity(mtIntent);  
    } else {  
        try {  
            var fallbackIntent = new Intent(Intent.ACTION_VIEW);  
            fallbackIntent.setDataAndType(Uri.parse("file://" + targetPath), "*/*");  
            fallbackIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);  
            ctx.startActivity(fallbackIntent);  
        } catch (err) {  
            new AlertDialog.Builder(ctx)  
                .setMessage("No default file explorer found to open:\n" + targetPath)  
                .setPositiveButton("OK", null).show();  
        }  
    }  
}  
  
// ------------------------------------------------------------  
// REPOSITORY ENGINE  
// ------------------------------------------------------------  
function getContentChecksum(content){  
    try{  
        var bytes = new java.lang.String(content).getBytes("UTF-8");  
        var crc = new CRC32(); crc.update(bytes, 0, bytes.length);  
        var hex = crc.getValue().toString(16);  
        while(hex.length < 8) hex = "0" + hex; return hex;  
    } catch(e){ return "00000000"; }  
}  
  
function readFile(path){  
    try{  
        var f = new File(path); if(!f.exists()) return null;  
        var raf = new RandomAccessFile(f, "r");  
        var bytes = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, raf.length());  
        raf.readFully(bytes); raf.close();  
        return new java.lang.String(bytes, "UTF-8") + "";   
    } catch(e){ return null; }  
}  
  
function writeFile(path, content){  
    try{  
        var f = new File(path); var parent = f.getParentFile();  
        if(parent && !parent.exists()) parent.mkdirs();  
        var raf = new RandomAccessFile(f, "rw");  
        raf.setLength(0); raf.write(new java.lang.String(content).getBytes("UTF-8")); raf.close();  
        return true;  
    } catch(e){ return false; }  
}  
  
function getCurrentScripts(){  
    var scripts = LL.getAllScriptMatching(0);  
    var files = [];  
    for(var i=0; i<scripts.getLength(); i++){  
        try{  
            var s = scripts.getAt(i);  
            var path = s.getPath() || "";  
            var name = s.getName() || "Script_" + s.getId();  
            var fileName = name.replace(/[<>:"\/\\|?*]/g,"_") + ".js";  
            var fullPath = path + (path ? "/" : "") + fileName;  
            while(fullPath.indexOf("//") !== -1) fullPath = fullPath.replace("//", "/");  
            files.push({ path: fullPath, content: "" + s.getText(), hash: getContentChecksum("" + s.getText()) });  
        } catch(e){}  
    }  
    return files;  
}  
  
function getAllCommits() {  
    var dir = new File(BASE_ROOT + "/Commits");  
    if(!dir.exists()) dir.mkdirs();  
    var commits = [];  
    var files = dir.listFiles();  
    if(files) {  
        for(var i=0; i<files.length; i++){  
            if(files[i].isDirectory()){  
                var json = readFile(files[i].getAbsolutePath() + "/commit.json");  
                if(json) { try { commits.push(JSON.parse(json)); } catch(e) {} }  
            }  
        }  
    }  
    commits.sort(function(a, b) { return a.timestamp < b.timestamp ? 1 : -1; });  
    return commits;  
}  
  
function doCommit(commitName) {  
    try {  
        var currentFiles = getCurrentScripts();  
        var allCommits = getAllCommits();  
        var latestCommit = allCommits.length > 0 ? allCommits[0].timestamp : null;  
          
        var previousFiles = {};  
        if (allCommits.length > 0) {  
            for (var i=0; i<allCommits[0].files.length; i++) previousFiles[allCommits[0].files[i].path] = allCommits[0].files[i];  
        }  
          
        var newFiles = [], modifiedFiles = [], unchangedFiles = [], deletedFiles = [], currentMap = {};  
        for(var i=0; i<currentFiles.length; i++) currentMap[currentFiles[i].path] = currentFiles[i];  
          
        for(var i=0; i<currentFiles.length; i++){  
            var f = currentFiles[i]; var prev = previousFiles[f.path];  
            if(!prev) { f.status = "new"; newFiles.push(f); }  
            else if(prev.hash !== f.hash) { f.status = "modified"; f.previousHash = prev.hash; modifiedFiles.push(f); }  
            else { f.status = "unchanged"; unchangedFiles.push(f); }  
        }  
          
        for(var path in previousFiles) if(!currentMap[path]) deletedFiles.push({ path: path, hash: previousFiles[path].hash, status: "deleted" });  
          
        if(newFiles.length === 0 && modifiedFiles.length === 0 && deletedFiles.length === 0){  
            new AlertDialog.Builder(ctx).setMessage("No changes detected.").setPositiveButton("OK", null).show(); return;  
        }  
          
        var df = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");  
        var commitTimestamp = df.format(new Date()) + "-" + ("00" + (new Date().getTime() % 1000)).slice(-3);  
        var commitPath = BASE_ROOT + "/Commits/" + commitTimestamp;  
        new File(commitPath).mkdirs();  
          
        function saveHashed(file) {  
            var parts = file.path.split("/"); var fileName = parts.pop();  
            var baseName = fileName.replace(/\.[^/.]+$/, ""); var ext = fileName.match(/\.[^/.]+$/) || "";  
            writeFile(commitPath + (parts.length > 0 ? "/" + parts.join("/") : "") + "/" + baseName + "_" + file.hash + ext, file.content);  
        }  
          
        for(var i=0; i<newFiles.length; i++) saveHashed(newFiles[i]);  
        for(var i=0; i<modifiedFiles.length; i++) saveHashed(modifiedFiles[i]);  
          
        var allFiles = currentFiles.concat(deletedFiles);  
        var jsonStr = JSON.stringify({  
            version: "1.0.0", timestamp: commitTimestamp, name: commitName || "", previous: latestCommit,  
            files: allFiles.map(function(f) { return { path: f.path, hash: f.hash, status: f.status }; })  
        }, null, 2);  
          
        writeFile(commitPath + "/commit.json", jsonStr);  
        loadUI();   
    } catch(e) {   
        new AlertDialog.Builder(ctx).setMessage("Error: " + e.message).setPositiveButton("OK", null).show();  
    }  
}  
  
function restoreSingleFileEngine(cTimestamp, fPath, fHash) {  
    var scriptManager = LL.getAllScriptMatching(0);  
    var parts = fPath.split("/"); var fileName = parts.pop();  
    var baseName = fileName.replace(/\.[^/.]+$/, ""); var ext = fileName.match(/\.[^/.]+$/) || "";  
    var backupPath = BASE_ROOT + "/Commits/" + cTimestamp + (parts.length > 0 ? "/" + parts.join("/") : "") + "/" + baseName + "_" + fHash + ext;  
    var content = readFile(backupPath);  
    if (content) {  
        for(var j=0; j<scriptManager.getLength(); j++){  
            var s = scriptManager.getAt(j);  
            var fullPath = (s.getPath() || "") + ((s.getPath() || "") ? "/" : "") + (s.getName() || "Script_"+s.getId()).replace(/[<>:"\/\\|?*]/g,"_") + ".js";  
            while(fullPath.indexOf("//") !== -1) fullPath = fullPath.replace("//", "/");  
            if (fullPath === fPath) { s.setText(content); return true; }  
        }  
    }  
    return false;  
}  
  
function processRestore() {  
    var count = 0;  
    try {  
        for (var key in selections.commits) {  
            var c = selections.commits[key].data;  
            for (var i=0; i<c.files.length; i++) {   
                if (c.files[i].status !== "deleted" && restoreSingleFileEngine(c.timestamp, c.files[i].path, c.files[i].hash)) count++;   
            }  
        }  
        for (var key in selections.files) {  
            var fData = selections.files[key].data; var cData = selections.files[key].commit;  
            if (fData.status !== "deleted" && restoreSingleFileEngine(cData.timestamp, fData.path, fData.hash)) count++;  
        }  
          
        clearSelection();  
        new AlertDialog.Builder(ctx).setMessage("Restoration Complete.\nRestored " + count + " file instances.").setPositiveButton("OK", null).show();  
    } catch(e) {  
        new AlertDialog.Builder(ctx).setMessage("Restore failed: " + e.message).setPositiveButton("OK", null).show();  
    }  
}  
  
// ------------------------------------------------------------  
// BASE LAYOUT CONSTRUCTION  
// ------------------------------------------------------------  
var absoluteRoot = new FrameLayout(ctx);  
  
var mainLayout = new LinearLayout(ctx);  
mainLayout.setOrientation(1);  
mainLayout.setBackground(getPanelBg(30, "#73000000"));  
applyBlur(mainLayout, 60);  
mainLayout.setPadding(24, 24, 24, 24);  
  
// 1. TOP STRIP  
var topStrip = new LinearLayout(ctx);  
topStrip.setOrientation(0);  
topStrip.setGravity(16);  
topStrip.setPadding(0, 0, 0, 20);  
  
function createTopBtn(label) {  
    var b = createText(label, 13, "#FFFFFF", true);  
    b.setBackground(getPanelBg(30, "#33FFFFFF"));  
    b.setPadding(20, 15, 20, 15);  
    var lp = new LinearLayout.LayoutParams(0, -2, 1.0); lp.setMargins(0,0,10,0);  
    b.setLayoutParams(lp); b.setGravity(17);  
    return b;  
}  
var btnExpandAll = createTopBtn("Expand All");  
var btnCollapseAll = createTopBtn("Collapse All");  
var btnRefresh = createTopBtn("↻ Refresh");  
btnRefresh.setLayoutParams(new LinearLayout.LayoutParams(0, -2, 1.0));  
topStrip.addView(btnExpandAll); topStrip.addView(btnCollapseAll); topStrip.addView(btnRefresh);  
  
btnExpandAll.setOnClickListener(new View.OnClickListener({ onClick: function() {   
    for(var i=0; i<allPillContainers.length; i++) allPillContainers[i].setVisibility(0);   
    for(var i=0; i<allArrows.length; i++) allArrows[i].setText("▲");  
}}));  
btnCollapseAll.setOnClickListener(new View.OnClickListener({ onClick: function() {   
    for(var i=0; i<allPillContainers.length; i++) allPillContainers[i].setVisibility(8);   
    for(var i=0; i<allArrows.length; i++) allArrows[i].setText("▼");  
}}));  
btnRefresh.setOnClickListener(new View.OnClickListener({ onClick: function() { loadUI(); } }));  
mainLayout.addView(topStrip);  
  
// 2. SCROLLABLE COMMIT LIST  
var scroll = new ScrollView(ctx);  
var listLp = new LinearLayout.LayoutParams(-1, 0, 1.0); scroll.setLayoutParams(listLp);  
var listContainer = new LinearLayout(ctx); listContainer.setOrientation(1);  
scroll.addView(listContainer);  
mainLayout.addView(scroll);  
  
// 3. DEFAULT BOTTOM BAR (Create Commits)  
var bottomBar = new LinearLayout(ctx);  
bottomBar.setOrientation(0); bottomBar.setPadding(0, 20, 0, 0);  
var btnFast = createText("Create Commit Now", 14, "#FFFFFF", true);  
btnFast.setBackground(getPanelBg(50, "#4D00E5FF")); btnFast.setGravity(17); btnFast.setPadding(10, 35, 10, 35);  
var bfLp = new LinearLayout.LayoutParams(0, -2, 1.0); bfLp.setMargins(0,0,12,0); btnFast.setLayoutParams(bfLp);  
btnFast.setOnClickListener(new View.OnClickListener({ onClick: function() { doCommit(null); } }));  
bottomBar.addView(btnFast);  
  
var btnName = createText("Named Commit", 14, "#FFFFFF", true);  
btnName.setBackground(getPanelBg(50, "#4D00E5FF")); btnName.setGravity(17); btnName.setPadding(10, 35, 10, 35);  
btnName.setLayoutParams(new LinearLayout.LayoutParams(0, -2, 1.0));  
btnName.setOnClickListener(new View.OnClickListener({   
    onClick: function() {   
        var input = new EditText(ctx);  
        var b = new AlertDialog.Builder(ctx).setTitle("Name").setView(input);  
        b.setPositiveButton("Execute", new DialogInterface.OnClickListener({ onClick: function(d, w) { doCommit(input.getText().toString()); } }));  
        b.setNegativeButton("Abort", null).show();  
    }   
}));  
bottomBar.addView(btnName);  
mainLayout.addView(bottomBar);  
  
// 4. ACTION STRIP (DYNAMIC OPTIONS)  
var actionStrip = new LinearLayout(ctx);  
actionStrip.setOrientation(1); actionStrip.setBackground(getPanelBg(40, "#FA050505", "#00E5FF"));  
actionStrip.setPadding(24, 30, 24, 30); actionStrip.setVisibility(8);  
var actionStripLp = new LinearLayout.LayoutParams(-1, -2); actionStripLp.setMargins(0, 20, 0, 0); actionStrip.setLayoutParams(actionStripLp);  
  
var actionStatus = createText("", 14, "#00E5FF", true);  
actionStatus.setGravity(17); actionStatus.setPadding(0, 0, 0, 20); actionStrip.addView(actionStatus);  
  
var actionButtonsRow = new LinearLayout(ctx); actionButtonsRow.setOrientation(0);  
function createActionBtn(label, color) {  
    var b = createText(label, 14, "#FFFFFF", true);  
    b.setBackground(getPanelBg(50, color)); b.setGravity(17); b.setPadding(10, 35, 10, 35);   
    var lp = new LinearLayout.LayoutParams(0, -2, 1.0); lp.setMargins(6,0,6,0); b.setLayoutParams(lp);  
    return b;  
}  
var btnRestore = createActionBtn("Restore", "#D000E5FF");  
var btnTimeline = createActionBtn("Timeline", "#66FFFFFF");  
var btnExplore = createActionBtn("Explore", "#66FFFFFF");  
var btnClear = createActionBtn("Cancel", "#66FF3333");  
  
actionButtonsRow.addView(btnRestore); actionButtonsRow.addView(btnTimeline);  
actionButtonsRow.addView(btnExplore); actionButtonsRow.addView(btnClear);  
actionStrip.addView(actionButtonsRow);  
mainLayout.addView(actionStrip);   
  
absoluteRoot.addView(mainLayout, new FrameLayout.LayoutParams(-1, -1));  
  
// ------------------------------------------------------------  
// SELECTION LOGIC  
// ------------------------------------------------------------  
btnClear.setOnClickListener(new View.OnClickListener({ onClick: function() { clearSelection(); } }));  
btnRestore.setOnClickListener(new View.OnClickListener({ onClick: function() { processRestore(); } }));  
  
function updateActionStrip() {  
    var cCount = Object.keys(selections.commits).length;  
    var fCount = Object.keys(selections.files).length;  
      
    if (cCount === 0 && fCount === 0) {  
        actionStrip.setVisibility(8);  
        bottomBar.setVisibility(0);  
        return;  
    }  
    bottomBar.setVisibility(8);  
    actionStrip.setVisibility(0);  
    actionStatus.setText("Selected: " + cCount + " Commits | " + fCount + " Files");  
      
    if (fCount === 1 && cCount === 0) {  
        btnTimeline.setVisibility(0);  
        var fKey = Object.keys(selections.files)[0];  
        btnTimeline.setOnClickListener(new View.OnClickListener({ onClick: function() { showTimeline(selections.files[fKey].data.path, getAllCommits()); } }));  
    } else btnTimeline.setVisibility(8);  
      
    if (cCount === 1 && fCount === 0) {  
        btnExplore.setVisibility(0);  
        var cKey = Object.keys(selections.commits)[0];  
        btnExplore.setOnClickListener(new View.OnClickListener({ onClick: function() { openInFileExplorer(BASE_ROOT + "/Commits/" + cKey); } }));  
    } else btnExplore.setVisibility(8);  
}  
  
function clearCommitSelections() {  
    for (var k in selections.commits) selections.commits[k].view.setBackground(getPanelBg(20, "#1AFFFFFF"));  
    selections.commits = {};  
}  
function clearFileSelections() {  
    for (var k in selections.files) selections.files[k].view.setBackground(selections.files[k].bg);  
    selections.files = {};  
}  
function clearSelection() { clearCommitSelections(); clearFileSelections(); updateActionStrip(); }  
  
// ------------------------------------------------------------  
// TIMELINE OVERLAY  
// ------------------------------------------------------------  
var timelineOverlay = new LinearLayout(ctx);  
timelineOverlay.setOrientation(1); timelineOverlay.setBackground(getPanelBg(30, "#FA050505"));  
timelineOverlay.setVisibility(8); timelineOverlay.setPadding(30, 30, 30, 30);  
  
var tlHeader = createText("Timeline", 20, "#FFFFFF", true);  
var tlContainer = new LinearLayout(ctx); tlContainer.setOrientation(1);  
var tlScroll = new ScrollView(ctx); tlScroll.addView(tlContainer);  
timelineOverlay.addView(tlHeader); timelineOverlay.addView(tlScroll, new LinearLayout.LayoutParams(-1, 0, 1.0));  
  
// Timeline Action Strip  
var tlActionStrip = new LinearLayout(ctx); tlActionStrip.setOrientation(0); tlActionStrip.setPadding(0, 20, 0, 20); tlActionStrip.setVisibility(8);  
var tlRestoreBtn = createText("Restore Selected File State", 16, "#FFFFFF", true);  
tlRestoreBtn.setBackground(getPanelBg(50, "#D000E5FF")); tlRestoreBtn.setGravity(17); tlRestoreBtn.setPadding(0, 30, 0, 30);  
tlRestoreBtn.setLayoutParams(new LinearLayout.LayoutParams(-1, -2));  
tlActionStrip.addView(tlRestoreBtn);  
timelineOverlay.addView(tlActionStrip);  
  
var tlClose = createText("CLOSE TIMELINE", 16, "#FFFFFF", true);  
tlClose.setBackground(getPanelBg(50, "#99FF2222")); tlClose.setGravity(17); tlClose.setPadding(0, 35, 0, 35);  
tlClose.setOnClickListener(new View.OnClickListener({ onClick: function() { timelineOverlay.setVisibility(8); } }));  
timelineOverlay.addView(tlClose, new LinearLayout.LayoutParams(-1, -2));  
absoluteRoot.addView(timelineOverlay, new FrameLayout.LayoutParams(-1, -1));  
  
function showTimeline(filePath, allCommits) {  
    tlContainer.removeAllViews();  
    tlActionStrip.setVisibility(8);  
    tlSelectedNode = null; tlSelectedView = null;  
    tlHeader.setText("History: " + filePath.split("/").pop());  
      
    for(var i=0; i<allCommits.length; i++) {  
        var c = allCommits[i]; var fInC = null;  
        for(var j=0; j<c.files.length; j++) { if(c.files[j].path === filePath && c.files[j].status !== "unchanged") { fInC = c.files[j]; break; } }  
          
        if (fInC) {  
            (function(commit, fileData) {  
                var node = new LinearLayout(ctx); node.setOrientation(1);   
                var normalBg = getPanelBg(20, "#26FFFFFF"); node.setBackground(normalBg); node.setPadding(30,24,30,24);  
                var lp = new LinearLayout.LayoutParams(-1, -2); lp.setMargins(0,0,0,20); node.setLayoutParams(lp);  
                  
                node.addView(createText(commit.timestamp, 13, "#FF888888", false));  
                if(commit.name) node.addView(createText("[" + commit.name + "]", 16, "#FFFFFFFF", true));  
                var sColor = fileData.status === "new" ? "#55FF55" : (fileData.status === "deleted" ? "#FF5555" : "#55AAFF");  
                node.addView(createText(fileData.status.toUpperCase(), 14, sColor, true));  
                  
                node.setOnClickListener(new View.OnClickListener({  
                    onClick: function() {  
                        if (tlSelectedView) tlSelectedView.setBackground(getPanelBg(20, "#26FFFFFF"));  
                        if (tlSelectedNode === fileData) {  
                            tlSelectedNode = null; tlSelectedView = null; tlActionStrip.setVisibility(8);  
                        } else {  
                            tlSelectedNode = fileData; tlSelectedView = node;  
                            node.setBackground(getPanelBg(20, "#6600E5FF", "#00E5FF"));  
                            tlActionStrip.setVisibility(0);  
                              
                            tlRestoreBtn.setOnClickListener(new View.OnClickListener({  
                                onClick: function() {  
                                    if(restoreSingleFileEngine(commit.timestamp, fileData.path, fileData.hash)) {  
                                        new AlertDialog.Builder(ctx).setMessage("File restored successfully!").setPositiveButton("OK", null).show();  
                                        timelineOverlay.setVisibility(8);  
                                    } else {  
                                        new AlertDialog.Builder(ctx).setMessage("Failed to restore file.").setPositiveButton("OK", null).show();  
                                    }  
                                }  
                            }));  
                        }  
                    }  
                }));  
                tlContainer.addView(node);  
            })(c, fInC);  
        }  
    }  
    if(tlContainer.getChildCount() === 0) tlContainer.addView(createText("No modifications tracked.", 15, "#CCCCCC", false));  
    timelineOverlay.setVisibility(0);  
}  
  
// ------------------------------------------------------------  
// DATA RENDERING (GROUPED BY DATE)  
// ------------------------------------------------------------  
function loadUI() {  
    listContainer.removeAllViews(); clearSelection();  
    allPillContainers = []; allArrows = [];  
    var commits = getAllCommits();  
      
    if (commits.length === 0) {  
        listContainer.addView(createText("No commits found.", 15, "#88FFFFFF", false)); return;  
    }  
      
    var grouped = {};  
    for (var i=0; i<commits.length; i++) {  
        var datePart = commits[i].timestamp.split("_")[0];  
        if (!grouped[datePart]) grouped[datePart] = [];  
        grouped[datePart].push(commits[i]);  
    }  
      
    for (var date in grouped) {  
        var dateHeader = createText("📅 " + date, 18, "#00E5FF", true); dateHeader.setPadding(10, 30, 10, 10); listContainer.addView(dateHeader);  
        var dateCommits = grouped[date];  
          
        for (var i=0; i<dateCommits.length; i++) {  
            (function(commit) {  
                var cCard = new LinearLayout(ctx);  
                cCard.setOrientation(1); cCard.setBackground(getPanelBg(20, "#1AFFFFFF")); cCard.setPadding(24, 24, 24, 24);  
                var cardLp = new LinearLayout.LayoutParams(-1, -2); cardLp.setMargins(0, 0, 0, 20); cCard.setLayoutParams(cardLp);  
                  
                var labelRow = new LinearLayout(ctx); labelRow.setOrientation(0); labelRow.setGravity(16);  
                  
                var timePart = commit.timestamp.split("_")[1].replace(/-/g, ":");  
                var timePill = createText(timePart, 12, "#FFFFFF", true);  
                timePill.setBackground(getPanelBg(30, "#33FFFFFF")); timePill.setPadding(16, 8, 16, 8);  
                var tpLp = new LinearLayout.LayoutParams(-2, -2); tpLp.setMargins(0,0,16,0); timePill.setLayoutParams(tpLp);  
                labelRow.addView(timePill);  
                  
                var textMeta = new LinearLayout(ctx); textMeta.setOrientation(1);  
                textMeta.addView(createText(commit.name || "Auto Commit", 16, "#FFFFFF", true));  
                labelRow.addView(textMeta, new LinearLayout.LayoutParams(0, -2, 1.0));  
                  
                // 🚨 EXPAND/COLLAPSE ARROW  
                var arrowBtn = createText("▼", 16, "#00E5FF", true);  
                arrowBtn.setPadding(20, 10, 20, 10);  
                labelRow.addView(arrowBtn);  
                allArrows.push(arrowBtn);  
                  
                cCard.addView(labelRow);  
                  
                var pillContainer = new LinearLayout(ctx); pillContainer.setOrientation(1); pillContainer.setPadding(0, 20, 0, 0);  
                pillContainer.setVisibility(8);  
                allPillContainers.push(pillContainer);  
                  
                // Arrow Click = Toggle Files  
                arrowBtn.setOnClickListener(new View.OnClickListener({  
                    onClick: function() {  
                        var isVis = pillContainer.getVisibility() === 0;  
                        pillContainer.setVisibility(isVis ? 8 : 0);  
                        arrowBtn.setText(isVis ? "▼" : "▲");  
                    }  
                }));  
                  
                // Card Click = Select Commit  
                cCard.setOnClickListener(new View.OnClickListener({  
                    onClick: function() {  
                        clearFileSelections();   
                        if (selections.commits[commit.timestamp]) {  
                            delete selections.commits[commit.timestamp];  
                            cCard.setBackground(getPanelBg(20, "#1AFFFFFF"));  
                        } else {  
                            selections.commits[commit.timestamp] = { data: commit, view: cCard };  
                            cCard.setBackground(getPanelBg(20, "#6600E5FF", "#00E5FF"));   
                        }  
                        updateActionStrip();  
                    }  
                }));  
                  
                var currentRow = new LinearLayout(ctx); currentRow.setOrientation(0); currentRow.setPadding(0, 0, 0, 12);  
                var currentRowChars = 0; var hasChanges = false;  
                  
                for (var j=0; j<commit.files.length; j++) {  
                    (function(file) {  
                        if (file.status !== "unchanged") {  
                            hasChanges = true;  
                            var fName = file.path.split("/").pop();  
                              
                            if (currentRowChars + fName.length > 25 && currentRowChars > 0) {  
                                pillContainer.addView(currentRow);  
                                currentRow = new LinearLayout(ctx); currentRow.setOrientation(0); currentRow.setPadding(0, 0, 0, 12); currentRowChars = 0;  
                            }  
                              
                            var pill = new TextView(ctx); pill.setText(fName); pill.setTextSize(11); pill.setTextColor(Color.parseColor("#FFFFFF")); pill.setPadding(20, 14, 20, 14);  
                            var pillColor = file.status === "new" ? "#4400FF66" : (file.status === "deleted" ? "#44FF3333" : "#4400E5FF");  
                            var normalBg = getPanelBg(30, pillColor); pill.setBackground(normalBg);  
                            var plp = new LinearLayout.LayoutParams(-2, -2); plp.setMargins(0, 0, 12, 0); pill.setLayoutParams(plp);  
                              
                            // Pill Click = Select File  
                            pill.setOnClickListener(new View.OnClickListener({  
                                onClick: function() {  
                                    clearCommitSelections();   
                                    var key = commit.timestamp + "_" + file.path;  
                                    if (selections.files[key]) {  
                                        delete selections.files[key]; pill.setBackground(normalBg);  
                                    } else {  
                                        selections.files[key] = { data: file, commit: commit, view: pill, bg: normalBg };  
                                        pill.setBackground(getPanelBg(30, "#CC00E5FF", "#FFFFFF"));   
                                    }  
                                    updateActionStrip();  
                                }  
                            }));  
                            currentRow.addView(pill); currentRowChars += fName.length + 2;  
                        }  
                    })(commit.files[j]);  
                }  
                if (currentRow.getChildCount() > 0) pillContainer.addView(currentRow);  
                if (!hasChanges) pillContainer.addView(createText("Static revision (No files changed)", 12, "#77FFFFFF", false));  
                cCard.addView(pillContainer); listContainer.addView(cCard);  
            })(dateCommits[i]);  
        }  
    }  
}  
  
absoluteRoot.post(new JRunnable({ run: function() { loadUI(); } }));  
return absoluteRoot;  