(function(){

var out="";

function add(title){
    out+="\n========== "+title+" ==========\n";
}

function line(k,v){
    out+=k+" : "+v+"\n";
}

function ok(name){
    try{
        return typeof this[name];
    }catch(e){
        return "<error>";
    }
}

function className(o){
    try{
        if(o==null) return "null";
        return o.getClass().getName();
    }catch(e){
        return typeof o;
    }
}

function inspect(name,obj){
    line(name,className(obj));

    try{
        var c=obj.getClass();

        line("Superclass",
            c.getSuperclass()
                ? c.getSuperclass().getName()
                : "null");

        line("Interfaces",
            c.getInterfaces().length);

        line("Fields",
            c.getDeclaredFields().length);

        line("Methods",
            c.getDeclaredMethods().length);

        line("Constructors",
            c.getDeclaredConstructors().length);

    }catch(e){}
}



add("Javascript Engine");

[
"Packages",
"java",
"JavaAdapter",
"JavaImporter",
"bindClass",
"importClass",
"Sync",
"Context",
"LL",
"Android"
].forEach(function(x){
    line(x,ok(x));
});



add("Java");

try{
line("Java Version",
java.lang.System.getProperty("java.version"));
}catch(e){}

try{
line("VM",
java.lang.System.getProperty("java.vm.name"));
}catch(e){}

try{
line("VM Vendor",
java.lang.System.getProperty("java.vm.vendor"));
}catch(e){}

try{
line("VM Version",
java.lang.System.getProperty("java.vm.version"));
}catch(e){}



add("Android");

try{

line("SDK",Build.VERSION.SDK_INT);
line("Release",Build.VERSION.RELEASE);
line("Codename",Build.VERSION.CODENAME);
line("Brand",Build.BRAND);
line("Manufacturer",Build.MANUFACTURER);
line("Model",Build.MODEL);
line("Device",Build.DEVICE);
line("Hardware",Build.HARDWARE);
line("Fingerprint",Build.FINGERPRINT);

}catch(e){}



add("Reflection");

try{

var c=getFloatingScreen().getClass();

line("Declared Fields",
c.getDeclaredFields().length);

line("Declared Methods",
c.getDeclaredMethods().length);

line("Constructors",
c.getDeclaredConstructors().length);

line("Reflection","SUPPORTED");

}catch(e){

line("Reflection","FAILED");
line("Reason",e);

}



add("Lightning Globals");

[
"LL",
"floatingScreen",
"homeScreen",
"activeScreen",
"backgroundScreen",
"lockScreen",
"scriptScreen",
"liveWallpaperScreen",
"engine",
"configuration",
"variables",
"currentScript",
"event_"
].forEach(function(x){
    line(x,ok(x));
});



add("Primary Objects");

try{inspect("LL",LL);}catch(e){}
try{inspect("FloatingScreen",getFloatingScreen());}catch(e){}
try{inspect("CurrentScript",getCurrentScript());}catch(e){}
try{inspect("Event",getEvent_());}catch(e){}
try{inspect("Engine",engine);}catch(e){}



add("Screen Wrapper");

try{

var fs=getFloatingScreen();

var c=fs.getClass();

while(c){

out+="\n["+c.getName()+"]\n";

var f=c.getDeclaredFields();

for(var i=0;i<f.length;i++){

try{

f[i].setAccessible(true);

var v=f[i].get(fs);

out+=f[i].getName()+" -> "+className(v)+"\n";

}catch(e){}

}

c=c.getSuperclass();

}

}catch(e){}



add("Environment");

try{

line("Current Thread",
java.lang.Thread.currentThread().getName());

}catch(e){}

try{

line("ClassLoader",
String(getFloatingScreen()
.getClass()
.getClassLoader()));

}catch(e){}

try{

line("Package",
getFloatingScreen()
.getClass()
.getPackage()
.getName());

}catch(e){}



add("Global Symbols");

var count=0;

for(var k in this){

count++;

try{
out+=k+" : "+typeof this[k]+"\n";
}catch(e){}

}

line("Total Globals",count);



Tc(out,1,1);

})();