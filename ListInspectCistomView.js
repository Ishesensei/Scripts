bindClass("android.widget.FrameLayout");bindClass("android.widget.LinearLayout");bindClass("android.widget.TextView");bindClass("android.widget.ScrollView");bindClass("android.graphics.Color");bindClass("android.view.Gravity");bindClass("android.view.View");

var ctx=LL.getContext();
var root=new LinearLayout(ctx);root.setOrientation(1);root.setPadding(10,10,10,10);
var scr=LL.getCurrentScript();

function add(title,val){
    var r=new LinearLayout(ctx);r.setPadding(0,3,0,3);
    var t=new TextView(ctx);t.setText(title+": ");t.setTextColor(Color.parseColor("#FF888888"));t.setTextSize(10);
    var v=new TextView(ctx);v.setText(val===null?"null":val===undefined?"undefined":String(val));v.setTextColor(Color.parseColor("#FF00FF00"));v.setTextSize(10);
    r.addView(t);r.addView(v);root.addView(r);
}

function addSection(s){
    var tv=new TextView(ctx);tv.setText("─── "+s+" ───");tv.setTextColor(Color.parseColor("#FFFFAA00"));tv.setTextSize(12);tv.setPadding(0,8,0,4);root.addView(tv);
}

// ===== SCRIPT =====
addSection("SCRIPT");
add("ID",scr.getId());
add("Name",scr.getName());
add("Path",scr.getPath());
try{add("Tag",scr.getTag());}catch(e){}
try{add("Tag(label)",scr.getTag("label"));}catch(e){}
try{add("Tag(name)",scr.getTag("name"));}catch(e){}
try{add("Tag(data)",scr.getTag("data"));}catch(e){}
try{add("Text",scr.getText().substring(0,80)+"...");}catch(e){}

// ===== CONTAINER =====
addSection("CONTAINER");
var con=LL.getContainerById(scr.getId());
add("Container",con);
if(con){
    try{add("getName",con.getName());}catch(e){}
    try{add("getType",con.getType());}catch(e){}
    try{add("getLabel",con.getLabel());}catch(e){}
    try{add("getTag()",con.getTag());}catch(e){}
    try{add("getTag('label')",con.getTag("label"));}catch(e){}
    try{add("getTag('name')",con.getTag("name"));}catch(e){}
    try{add("getTag('data')",con.getTag("data"));}catch(e){}
    try{add("getTag('app')",con.getTag("app"));}catch(e){}
    try{add("getTag('title')",con.getTag("title"));}catch(e){}
}

// ===== PROPERTIES =====
addSection("PROPERTIES");
try{
    var props=con.getProperties();
    if(props){
        var pm=props.getClass().getMethods();
        for(var i=0;i<pm.length;i++){
            var m=pm[i];
            if(m.getParameterTypes().length===0){
                try{add("Prop."+m.getName(),m.invoke(props));}catch(e){}
            }
        }
    }
}catch(e){add("Props error",e.toString());}

// ===== VIEW =====
addSection("VIEW");
try{
    var vw=con.getView();
    add("View",vw);
    if(vw){
        add("Class",vw.getClass().getName());
        add("Children",vw.getChildCount());
        try{add("getTag",vw.getTag());}catch(e){}
        for(var i=0;i<vw.getChildCount();i++){
            var c=vw.getChildAt(i);
            add("Child "+i,c.getClass().getName());
            try{add("  getTag",c.getTag());}catch(e){}
            try{add("  getId",c.getId());}catch(e){}
        }
    }
}catch(e){add("View error",e.toString());}

// ===== EVENT =====
addSection("EVENT");
var ev=null;try{ev=LL.getEvent();}catch(e){}
add("LL.getEvent()",ev);
if(ev){
    var em=ev.getClass().getMethods();
    for(var i=0;i<em.length;i++){
        if(em[i].getParameterTypes().length===0){
            try{add("Event."+em[i].getName(),em[i].invoke(ev));}catch(e){}
        }
    }
}

// ===== VARIABLES =====
addSection("VARIABLES");
var vv=LL.getVariables();
var keys=["app_name","cv_data","label","name","data","title","app","__sc_app","current_app"];
for(var i=0;i<keys.length;i++){
    try{add("var."+keys[i],vv.getString(keys[i]));}catch(e){}
}

// ===== GLOBALS =====
addSection("GLOBALS");
try{add("getEvent",typeof getEvent);}catch(e){}
try{add("getConfiguration",typeof getConfiguration);}catch(e){}
try{add("event_",typeof event_);}catch(e){}
try{add("currentScript",typeof currentScript);}catch(e){}

return root;