//================================================
// SETUP CODE - FIXED
//================================================

// ---------- DESKTOP IDS ----------
var d={
idS:0,
idD:2,
idF1:3,
idF2:6,
idH:1
};

// ---------- TEMP STATE ----------
var t={
FlO:""
};

// ---------- NAVIGATION ----------
var n={
idB:0
};

// ---------- ICON PACKS ----------
var ip={
idIP:0
};

// ---------- APP SEARCHER DEFAULTS ----------
var as={
CID:64,
MAX:30,
WIDTH:60,
PAD:28,
RAD:48,
SH:160,
SF:18,
SR:40,
RH:240,
RPH:16,
RPV:12,
IR:32,
LF:20,
LG:24,
BG:"#18181B",
SBG:"#27272A",
TC:"#FFFFFF",
HC:"#A1A1AA"
};

// ---------- GLOBAL FUNCTIONS ----------
var g = {
TAnim:"TAnim=function(v,p,t,s,d,vel){\
if(typeof SA=='undefined'){\
bindClass('miuix.system.animation.physics.SpringAnimation');\
bindClass('miuix.system.animation.physics.SpringForce');\
bindClass('miuix.system.animation.property.ViewProperty');\
SA=SpringAnimation;SF=SpringForce;\
}\
p=p=='ALPHA'?ViewProperty.ALPHA:p=='SCALE_X'?ViewProperty.SCALE_X:p=='SCALE_Y'?ViewProperty.SCALE_Y:p=='TRANSLATION_X'?ViewProperty.TRANSLATION_X:p=='TRANSLATION_Y'?ViewProperty.TRANSLATION_Y:ViewProperty.ROTATION;\
s=s=='STIFFNESS_HIGH'?SF.STIFFNESS_HIGH:s=='STIFFNESS_MEDIUM'?SF.STIFFNESS_MEDIUM:SF.STIFFNESS_LOW;\
d=d=='DAMPING_RATIO_NO_BOUNCY'?SF.DAMPING_RATIO_NO_BOUNCY:d=='DAMPING_RATIO_MEDIUM_BOUNCY'?SF.DAMPING_RATIO_MEDIUM_BOUNCY:SF.DAMPING_RATIO_LOW_BOUNCY;\
var a=new SA(v,p,t),f=new SF(t);\
f.setStiffness(s);\
f.setDampingRatio(d);\
a.setSpring(f);\
if(vel!=null)a.setStartVelocity(vel);\
a.start();\
};",
TFloating:"TFloating=(function(){\
var F0,W,FS,OK=0;\
return function(){\
try{\
if(!OK){\
var S=getFloatingScreen().getScreen();\
F0=S.getClass().getDeclaredField('this$0');\
F0.setAccessible(true);\
W=F0.get(S);\
FS=W.getClass().getDeclaredField('mIsShown');\
FS.setAccessible(true);\
OK=1;\
}\
return FS.getBoolean(W);\
}catch(e){\
return false;\
}\
};\
})();",
TDump:"TDump=function(cfg){try{var c=cfg||{},t=c.target||'net.pierrox.lightning_launcher.data.',to=c.toast||1,cp=c.copy||1,ex=c.export||1,dir=c.dir||'/storage/emulated/0/Download/Manish/LL/ll findouts',maxCls=c.maxClasses||9999,depth=c.depth||3,cons=c.constructors||1,fields=c.fields||1,methods=c.methods||1,interfaces=c.interfaces||1,inner=c.inner||1,superC=c.super||1,inherited=c.inherited||1,ret=c.returnTypes||0,recInt=c.recInterfaces||0,recSup=c.recSuper||0,recRet=c.recReturn||0,cFilter=c.classFilter||'',mFilter=c.methodFilter||'',fFilter=c.fieldFilter||'',pub=c.publicOnly||0,stat=c.staticOnly||0,sortCls=c.sortClasses||1,sortM=c.sortMethods||1,sortF=c.sortFields||1,dex=c.dex||1,fail=c.fail||1,counts=c.counts||1,summ=c.summary||1,resolve=c.resolve||1;bindClass('java.lang.Class');bindClass('java.io.File');bindClass('java.io.FileWriter');bindClass('java.text.SimpleDateFormat');bindClass('java.util.Date');bindClass('java.lang.reflect.Modifier');var O='',SEEN={},clsCnt=0,methodCnt=0,fieldCnt=0,consCnt=0;function A(x){O+=x+'\\n'}function isPkg(x){var p=['android.widget','android.view','android.graphics','android.text','android.content','android.os','android.util','android.app','android.media','java.lang','java.io','java.util','net.pierrox'];for(var i=0;i<p.length;i++){if(x.indexOf(p[i])===0)return true}return false}function S(c){var n=''+c.getName();if(SEEN[n])return true;SEEN[n]=true;return false}function isPub(m){try{return Modifier.isPublic(m.getModifiers())}catch(e){return false}}function isStat(m){try{return Modifier.isStatic(m.getModifiers())}catch(e){return false}}function filterM(m){var n=m.getName();if(mFilter&&n.indexOf(mFilter)===-1)return false;if(pub&&!isPub(m))return false;if(stat&&!isStat(m))return false;return true}function filterF(f){var n=f.getName();if(fFilter&&n.indexOf(fFilter)===-1)return false;if(pub&&!isPub(f))return false;if(stat&&!isStat(f))return false;return true}function filterC(c){var n=c.getName();if(cFilter&&n.indexOf(cFilter)===-1)return false;return true}function D(c,d){if(!c||d>depth||S(c))return;if(!filterC(c))return;clsCnt++;A('');A('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');A('📦 '+c.getName());A('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');try{A('📁 Package: '+c.getPackage().getName())}catch(e){}if(superC){try{var sc=c.getSuperclass();if(sc&&sc.getName()!=='java.lang.Object'){A('⬆️ Extends: '+sc.getName());if(recSup)D(sc,d+1)}}catch(e){}}if(interfaces){try{var inf=c.getInterfaces();if(inf&&inf.length>0){A('🔌 Implements:');for(var i=0;i<inf.length;i++){A('  '+inf[i].getName());if(recInt)D(inf[i],d+1)}}}catch(e){}}if(inner){try{var ic=c.getDeclaredClasses();if(ic&&ic.length>0){A('');A('--- INNER CLASSES ---');for(var i=0;i<ic.length;i++){A('  '+ic[i].getName());D(ic[i],d+1)}}}catch(e){}}if(cons){try{var cs=c.getDeclaredConstructors();if(cs&&cs.length>0){A('');A('🔧 CONSTRUCTORS:');var list=[];for(var i=0;i<cs.length;i++){list.push('  '+cs[i].toString());consCnt++}if(sortM)list.sort();for(var i=0;i<list.length;i++)A(list[i])}}catch(e){}}if(fields){try{var fs=c.getDeclaredFields();if(fs&&fs.length>0){A('');A('📁 FIELDS:');var list=[];for(var i=0;i<fs.length;i++){if(filterF(fs[i])){list.push('  '+fs[i].toString());fieldCnt++}}if(sortF)list.sort();for(var i=0;i<list.length;i++)A(list[i])}}catch(e){}}if(methods){try{var ms=inherited?c.getMethods():c.getDeclaredMethods();if(ms&&ms.length>0){A('');A('📋 METHODS:');var list=[];for(var i=0;i<ms.length;i++){if(filterM(ms[i])){list.push('  '+ms[i].toString());methodCnt++}}if(sortM)list.sort();for(var i=0;i<list.length&&i<100;i++)A(list[i]);if(list.length>100)A('  ... and '+(list.length-100)+' more')}}catch(e){}}if(ret){try{var ms=c.getMethods();A('');A('📤 RETURN TYPES:');var map={};for(var i=0;i<ms.length;i++){var rt=ms[i].getReturnType();if(rt){var n=rt.getName();map[n]=(map[n]||0)+1;if(recRet)D(rt,d+1)}}var keys=Object.keys(map);if(sortM)keys.sort();for(var i=0;i<keys.length;i++){A('  '+keys[i]+' ('+map[keys[i]]+'x)')}}catch(e){}}}function dumpPkg(p){A('═══════════════════════════════════════════════════════════════');A('📦 PACKAGE DUMP: '+p);A('═══════════════════════════════════════════════════════════════');A('');var cls=[],seen={};var map={'android.widget':['Button','TextView','EditText','ImageView','FrameLayout','LinearLayout','RelativeLayout','ScrollView','ListView','GridView','SeekBar','ProgressBar','CheckBox','RadioButton','Switch','Spinner','AdapterView'],'android.view':['View','ViewGroup','SurfaceView','TextureView','ViewStub','ViewPropertyAnimator','ViewTreeObserver'],'android.graphics':['Bitmap','Canvas','Paint','Rect','RectF','Color','Matrix','Path','Shader','BitmapShader','LinearGradient'],'android.graphics.drawable':['GradientDrawable','BitmapDrawable','ShapeDrawable','ColorDrawable','Drawable'],'android.content':['Context','Intent','SharedPreferences','ContentResolver'],'android.os':['Bundle','Handler','Looper','Message','Parcel','Environment'],'java.lang':['String','Integer','Boolean','Long','Float','Double','System','Thread'],'java.io':['File','FileWriter','BufferedReader','BufferedWriter']};var found=map[p]||[];for(var i=0;i<found.length;i++){try{var cl=Class.forName(p+'.'+found[i]);if(cl&&!seen[found[i]]){cls.push(found[i]);seen[found[i]]=true}}catch(e){}}if(sortCls)cls.sort();A('📊 Found '+cls.length+' classes');A('');for(var i=0;i<cls.length&&i<maxCls;i++){try{var cl=Class.forName(p+'.'+cls[i]);D(cl,0)}catch(e){if(fail)A('❌ Failed: '+cls[i]+' - '+e)}}if(cls.length>maxCls)A('... and '+(cls.length-maxCls)+' more')}A('═══════════════════════════════════════════════════════════════');A('📱 TPACKAGEDUMP');A('═══════════════════════════════════════════════════════════════');A('');A('Target: '+t);A('Generated: '+new Date());A('');try{if(isPkg(t)||t.endsWith('.')){dumpPkg(t)}else{try{var cl=Class.forName(t);A('═══════════════════════════════════════════════════════════════');A('📦 CLASS DUMP: '+t);A('═══════════════════════════════════════════════════════════════');D(cl,0)}catch(e){try{var obj=eval(t);if(obj&&obj.getClass){A('═══════════════════════════════════════════════════════════════');A('📦 OBJECT DUMP: '+t);A('═══════════════════════════════════════════════════════════════');D(obj.getClass(),0)}}catch(e2){A('❌ Could not resolve: '+t)}}}}catch(e){A('❌ Error: '+e)}if(summ){A('');A('═══════════════════════════════════════════════════════════════');A('📊 SUMMARY');A('═══════════════════════════════════════════════════════════════');A('');A('Target: '+t);A('Classes: '+clsCnt);A('Constructors: '+consCnt);A('Methods: '+methodCnt);A('Fields: '+fieldCnt);A('Generated: '+new Date())}if(ex){try{var d=new File(dir);if(!d.exists())d.mkdirs();var safe=(''+t).replace(/[<>:\"\\/\\\\|?*]/g,'.').replace(/\\s+/g,'_');var ts=new SimpleDateFormat('yyyy-MM-dd_HH-mm-ss').format(new Date());var f=new File(d,safe+'__'+ts+'.txt');var w=new FileWriter(f);w.write(O);w.close();if(to)Tc('✅ Exported: '+f.getAbsolutePath(),1,cp);return f.getAbsolutePath()}catch(e){if(to)Tc('❌ Export failed: '+e,1,cp)}}if(to){if(O.length>3000)Tc(O.substring(0,3000)+'\\n... (truncated)',1,cp);else Tc(O,1,cp)}return O}catch(e){Tc('TDump error: '+e,1,1)}}",
TIconPackManager:"TIconPackManager=function(){try{bindClass('java.io.File');bindClass('android.content.Intent');bindClass('android.graphics.Bitmap$CompressFormat');var d=LL.getEvent().getData();if(d==null)return;d=d.substring(0);if(d.length<2||d.charAt(0)!='I')return;var ip=parseInt(d.substring(1),10);if(isNaN(ip))return;var v=LL.getVariables();v.edit().setInteger('idIP',ip).commit();var root='/sdcard/LL/IconCache/IP'+ip;var dir=new File(root);if(!dir.exists())dir.mkdirs();var done=new File(root+'/.built');if(done.exists())return;Ticonpacks();var pm=LL.getContext().getPackageManager();var ipp=v.getString('IP'+ip);if(!ipp)return;var launch={};var a=pm.queryIntentActivities(new Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER),0);for(var i=0;i<a.size();i++)launch[''+a.get(i).activityInfo.packageName]=1;var r=pm.getResourcesForApplication(ipp);var xmlid=r.getIdentifier('appfilter','xml',ipp);if(!xmlid)return;var x=r.getXml(xmlid),e,c=0,seen={};while((e=x.next())!=1){try{if(e!=2)continue;if(String(x.getName())!='item')continue;var pkg=''+x.getAttributeValue(null,'component');var draw=''+x.getAttributeValue(null,'drawable');var p1=pkg.indexOf('{');if(p1==-1)continue;p1++;var p2=pkg.indexOf('/',p1);if(p2==-1)continue;pkg=pkg.substring(p1,p2);if(!launch[pkg])continue;if(seen[pkg])continue;seen[pkg]=1;var out=new File(root+'/'+pkg+'.png');if(out.exists()){c++;continue;}var res=r.getIdentifier(draw,'drawable',ipp);if(!res)continue;var b=r.getDrawable(res).getBitmap();if(!b)continue;var img=LL.createImage(b.getWidth(),b.getHeight());img.draw().drawBitmap(b,0,0,null);if(img.saveToFile(out.getAbsolutePath(),CompressFormat.PNG,100))c++;}catch(ex){}}done.createNewFile();Tc('IP'+ip+' cached '+c);}catch(e){Tc(e);}}",
Ticonpacks:"Ticonpacks=function(){bindClass('android.content.Intent');var pm=LL.getContext().getPackageManager(),e=LL.getVariables().edit(),a=pm.queryIntentActivities(new Intent('org.adw.launcher.THEMES'),0);e.setInteger('IP_COUNT',a.size());e.setString('IP0','Default');e.setString('IPN0','Default');for(var i=0;i<a.size();i++){var r=a.get(i);e.setString('IP'+(i+1),r.activityInfo.packageName);e.setString('IPN'+(i+1),''+r.loadLabel(pm));}e.commit();return a.size();}",
TUseIconPack:"TUseIconPack=function(id){var v=LL.getVariables(),m=v.getInteger('IP_COUNT');if(id<0)id=0;if(id>m)id=m;v.edit().setInteger('idIP',id).commit();return id;}",
TGetIconPack:"TGetIconPack=function(){return LL.getVariables().getInteger('idIP');}",
TIconCache:"TIconCache=function(pkg,ip,name){LL.getVariables().edit().setString('IP'+ip+'_'+pkg,name).commit();return name;}",
Tshortcut:"imp('Tc','Tcn');Tshortcut=function(pkg,c,ip,x,y,it){try{bindClass('java.io.File');var pm=LL.getContext().getPackageManager();c=Tcn(c);if(x==null)x=0;if(y==null)y=0;if(ip==null)ip=0;var v=LL.getVariables(),m=v.getInteger('IP_COUNT');if(ip<0)ip=0;if(ip>m)ip=m;if(!it)it=pm.getLaunchIntentForPackage(pkg);if(!it)return Tc('Intent not found: '+pkg);var lbl=pkg;try{lbl=''+pm.getApplicationLabel(pm.getApplicationInfo(pkg,0));}catch(e){}var s=c.addShortcut(lbl,it,x,y);try{if(ip<=0){var d=pm.getApplicationIcon(pkg),b=d.getBitmap(),img=LL.createImage(b.getWidth(),b.getHeight());img.draw().drawBitmap(b,0,0,null);s.setDefaultIcon(img);}else{var p='/sdcard/LL/IconCache/IP'+ip+'/'+pkg+'.png';if(new File(p).exists()){try{var img=LL.createImage(p);if(img)s.setDefaultIcon(img);else throw 'img null';}catch(ex){var d=pm.getApplicationIcon(pkg),b=d.getBitmap(),img=LL.createImage(b.getWidth(),b.getHeight());img.draw().drawBitmap(b,0,0,null);s.setDefaultIcon(img);}}else{var d=pm.getApplicationIcon(pkg),b=d.getBitmap(),img=LL.createImage(b.getWidth(),b.getHeight());img.draw().drawBitmap(b,0,0,null);s.setDefaultIcon(img);}}}catch(e){Tc('Tshortcut icon error\\n'+e);}return s;}catch(e){Tc(e);return null;}}",
Tcn:"Tcn=function(c){if(c===undefined||c===null)return LL.getCurrentDesktop();if(typeof c=='number')return LL.getContainerById(c);if(typeof c=='string')return LL.getContainerById(+c);return c;}",
Tc:"Tc=function(x,t,c){var a=getActiveScreen().getContext();if(x===undefined)x='undefined';else if(x===null)x='null';else try{x=String(x);}catch(e){x='[object]';}if(arguments.length<2)t=1;if(arguments.length<3)c=1;if(c)a.getSystemService(a.CLIPBOARD_SERVICE).setText(x);if(t){bindClass('android.widget.Toast');Toast.makeText(a,x,0).show();}return x;}",
imp:"imp=function(){for(var i=0;i<arguments.length;i++)eval(LL.getVariables().getString(arguments[i]));}",
Titem:"Titem=function(n,c){try{if(typeof c=='number')c=LL.getContainerById(c);else if(typeof c=='string'){var d=LL.getDesktopByName(c);c=d?d:LL.getContainerById(+c);}if(!c)return null;var i=c.getItemByLabel(n);if(!i&&c.getAllItems){var a=c.getAllItems();for(var j=0;j<a.getLength();j++){var x=a.getAt(j);if(x.getName&&x.getName()==n){i=x;break;}}}return i;}catch(e){Tc(e);return null;}}"
};

//================================================
// SAVE VARIABLES
//================================================

var e=LL.getVariables().edit();

for(var k in d) e.setInteger(k,d[k]);
for(var k in t) e.setString(k,t[k]);
for(var k in n) e.setInteger(k,n[k]);
for(var k in ip) e.setInteger(k,ip[k]);
for(var k in g) e.setString(k,g[k]);

// Set app searcher config from as object
for(var k in as) {
 if(typeof as[k] === 'number') {
  e.setInteger(k, as[k]);
 } else {
  e.setString(k, as[k]);
 }
}

e.commit();
var v=LL.getVariables();

//================================================
// IMPORT FUNCTIONS INTO CURRENT CONTEXT
//================================================

eval(v.getString("imp"));
imp("Tc", "Tcn", "Titem", "Ticonpacks", "TUseIconPack", "TGetIconPack", "TIconCache", "Tshortcut", "TIconPackManager", "TDump");

///================================================
// FINAL STATUS TOAST - FULL
//================================================

try {
 var ctx = getActiveScreen().getContext();
 bindClass("android.widget.Toast");
 
 var result = "";
 
 // Desktop IDs
 result += "📁 ";
 var first = true;
 for(var k in d) {
  if(!first) result += " | ";
  result += k + "=" + d[k];
  first = false;
 }
 
 // App Searcher Config
 result += "\n🔍 CID=" + as.CID + " MAX=" + as.MAX + " WIDTH=" + as.WIDTH + " RAD=" + as.RAD;
 
 // Functions - show on multiple lines if needed
 var funcList = [];
 for(var k in g) {
  funcList.push(k);
 }
 funcList.sort();
 result += "\n⚡ " + funcList.join(", ");
 
 // Variables
 var allVars = LL.getVariables();
 result += "\n📊 CID=" + allVars.getInteger("CID") + " MAX=" + allVars.getInteger("MAX") + " IP=" + allVars.getInteger("idIP");
 
 result += "\n✅ Ready!";
 
 // Show toast with full text using setText
 var toast = Toast.makeText(ctx, "", Toast.LENGTH_LONG);
 toast.setText(result);
 toast.show();
 
} catch(e) {
 try {
  Tc("✅ Setup Complete!", 1, 1);
 } catch(e2) {}
}