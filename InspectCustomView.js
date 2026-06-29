bindClass("android.widget.FrameLayout");bindClass("android.widget.LinearLayout");bindClass("android.widget.TextView");bindClass("android.widget.ScrollView");bindClass("android.graphics.Color");bindClass("android.view.Gravity");bindClass("android.view.View");bindClass("java.io.File");bindClass("java.io.FileWriter");bindClass("java.io.BufferedWriter");bindClass("android.os.Environment");

var ctx=LL.getContext();
var output="=== CUSTOM VIEW INSPECTION ===\n\n";
function log(line){output+=line+"\n";}

var scr=LL.getCurrentScript();
var con=LL.getContainerById(scr.getId());

log("Script ID: "+scr.getId());
log("Container: "+con);
log("");

// getMy
try{
    var my=con.getMy();
    log("getMy: "+my);
    log("getMy type: "+typeof my);
    var myClass=java.lang.Class.forName(my.toString().split("@")[0]);
    log("getMy class: "+myClass.getName());
    var mm=myClass.getMethods();
    log("getMy methods:");
    for(var i=0;i<mm.length;i++){
        var m=mm[i];
        log("  "+m.getName());
        if(m.getParameterTypes().length===0){
            try{log("    -> "+m.invoke(my));}catch(e){}
        }
    }
}catch(e){log("getMy error: "+e);}
log("");

// getView
try{
    var vw=con.getView();
    log("getView: "+vw);
    log("View class: "+vw.getClass().getName());
    var vm=vw.getClass().getMethods();
    log("View methods:");
    for(var i=0;i<vm.length;i++)log("  "+vm[i].getName());
    try{log("View childCount: "+vw.getChildCount());}catch(e){}
    try{log("View getTag(): "+vw.getTag());}catch(e){}
}catch(e){log("View error: "+e);}
log("");

// getProperties
try{
    var props=con.getProperties();
    log("getProperties: "+props);
    var pm=props.getClass().getMethods();
    for(var i=0;i<pm.length;i++){
        var m=pm[i];
        if(m.getParameterTypes().length===0){
            try{log("Prop."+m.getName()+"(): "+m.invoke(props));}catch(e){}
        }
    }
}catch(e){log("Props error: "+e);}
log("");

// Script
log("Script getName: "+scr.getName());
log("Script getPath: "+scr.getPath());
try{log("Script getText (first 200): "+scr.getText().substring(0,200));}catch(e){}
try{log("Script getTag: "+scr.getTag());}catch(e){}
try{log("Script getTag(label): "+scr.getTag("label"));}catch(e){}
try{log("Script getTag(data): "+scr.getTag("data"));}catch(e){}
try{log("Script getTag(name): "+scr.getTag("name"));}catch(e){}

// All tags
log("\nAll Container Tags:");
var tagKeys=["","label","name","data","text","id","app","title","shortcut","icon","package"];
for(var i=0;i<tagKeys.length;i++){
    try{log("  getTag('"+tagKeys[i]+"'): "+con.getTag(tagKeys[i]));}catch(e){}
}

// Save
try{
    var dir=android.os.Environment.getExternalStorageDirectory()+"/Download";
    var file=new java.io.File(dir,"custom_view_inspect.txt");
    var fw=new java.io.FileWriter(file);
    var bw=new java.io.BufferedWriter(fw);
    bw.write(output);
    bw.close();
    log("\n✅ Saved to Downloads/custom_view_inspect.txt");
}catch(e){log("\nSave error: "+e);}

// Also show on screen
var root=new LinearLayout(ctx);root.setOrientation(1);root.setPadding(15,15,15,15);
var tv=new TextView(ctx);tv.setText(output);tv.setTextColor(Color.WHITE);tv.setTextSize(10);
root.addView(tv);
return root;