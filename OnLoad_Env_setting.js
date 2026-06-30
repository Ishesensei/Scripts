// ============================================
// ENVIRONMENT SETUP v11 — With Tcomp + App Cache
// ============================================

// ---------- BIND ALL CLASSES ----------
var cls="android.content.Intent,android.content.pm.PackageManager,android.content.ComponentName,android.graphics.Bitmap,android.graphics.Canvas,android.graphics.Paint,android.graphics.drawable.BitmapDrawable,android.graphics.BitmapFactory,android.graphics.drawable.Drawable,java.io.File,android.util.TypedValue,android.widget.FrameLayout,android.widget.LinearLayout,android.widget.TextView,android.widget.ImageView,android.graphics.drawable.GradientDrawable,android.view.Gravity,android.view.View,android.text.TextUtils".split(",");
for(var i=0;i<cls.length;i++)bindClass(cls[i]);

// ---------- DESKTOP IDS ----------
var d={idS:0,idD:2,idF1:3,idF2:6,idH:1};

// ---------- TEMP STATE ----------
var t={FlO:""};

// ---------- NAVIGATION ----------
var n={idB:0};

// ---------- ICON PACKS ----------
var ip={idIP:0};

// ---------- APP SEARCHER DEFAULTS ----------
var as={CID:64,MAX:30,WIDTH:60,PAD:28,RAD:48,SH:160,SF:18,SR:40,RH:240,RPH:16,RPV:12,IR:32,LF:20,LG:24,BG:"#18181B",SBG:"#27272A",TC:"#FFFFFF",HC:"#A1A1AA"};

// ---------- BUILD APP CACHE ----------
var PM=LL.getContext().getPackageManager();
var apps=[],alias={},pkgs={};
var intent=new Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER);
var list=PM.queryIntentActivities(intent,0);
for(var i=0;i<list.size();i++){var ri=list.get(i),ai=ri.activityInfo;apps.push({n:ri.loadLabel(PM).toString(),l:ri.loadLabel(PM).toString().toLowerCase(),p:ai.packageName,c:ai.name});}
apps.sort(function(a,b){return a.l<b.l?-1:(a.l>b.l?1:0);});
for(var i=0;i<apps.length;i++){apps[i].i=i;alias[apps[i].l]=i;pkgs[apps[i].p]=i;}

var iconPacks=[{pkg:"default",name:"Default"}];
try{var ipIntent=new Intent("org.adw.launcher.THEMES"),ipList=PM.queryIntentActivities(ipIntent,0);for(var i=0;i<ipList.size();i++){var r=ipList.get(i);iconPacks.push({pkg:r.activityInfo.packageName,name:""+r.loadLabel(PM)});}}catch(e){}

// ---------- GLOBAL FUNCTIONS ----------
var g={

// App Library
AppAll:"AppAll=function(){var v=LL.getVariables();var a=v.getString('__apps');return a?JSON.parse(a):[];};",
AppFind:"AppFind=function(q){var v=LL.getVariables();var apps=JSON.parse(v.getString('__apps'));var alias=JSON.parse(v.getString('__alias'));if(!apps||!alias)return null;q=q.toLowerCase();var i=alias[q];if(i!==undefined)return apps[i];for(var j=0;j<apps.length;j++){if(apps[j].l.indexOf(q)===0)return apps[j];}for(var j=0;j<apps.length;j++){if(apps[j].l.indexOf(q)>-1)return apps[j];}return null;};",
AppSearch:"AppSearch=function(q,max){var v=LL.getVariables();var apps=JSON.parse(v.getString('__apps'));if(!apps)return[];q=q.toLowerCase();var matches=[];for(var i=0;i<apps.length&&matches.length<(max||20)*3;i++){var pos=apps[i].l.indexOf(q);if(pos>-1){var sc=pos===0?0:apps[i].l.indexOf(' '+q)>-1?1:2;matches.push({a:apps[i],s:sc});}}matches.sort(function(a,b){return a.s-b.s;});var result=[];for(var i=0;i<matches.length&&result.length<(max||20);i++)result.push(matches[i].a);return result;};",
AppByPkg:"AppByPkg=function(pkg){var v=LL.getVariables();var pkgs=JSON.parse(v.getString('__pkg'));var apps=JSON.parse(v.getString('__apps'));if(!apps||!pkgs)return null;var i=pkgs[pkg];return i!==undefined?apps[i]:null;};",
AppIntent:"AppIntent=function(a){if(!a||!a.p)return null;return new Intent(Intent.ACTION_MAIN).setComponent(new ComponentName(a.p,a.c)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);};",
AppLaunch:"AppLaunch=function(a){var it=AppIntent(a);if(it)try{LL.getContext().startActivity(it);}catch(e){}};",
AppIcon:"AppIcon=function(a){if(!a||!a.p)return null;if(!a._icon)try{a._icon=LL.getContext().getPackageManager().getActivityIcon(new ComponentName(a.p,a.c));}catch(e){}return a._icon||null;};",
AppIconPack:"AppIconPack=function(a,ipId){var v=LL.getVariables();var ip=ipId||v.getInteger('idIP')||0;if(!a||!a.p||ip<=0)return null;try{var p='/sdcard/LL/IconCache/IP'+ip+'/'+a.p+'.png';if(new java.io.File(p).exists()){var bmp=BitmapFactory.decodeFile(p);if(bmp)return new BitmapDrawable(LL.getContext().getResources(),bmp);}}catch(e){}return null;};",
AppIconPacks:"AppIconPacks=function(){var v=LL.getVariables();var p=v.getString('__iconPacks');return p?JSON.parse(p):[];};",
AppSetIconPack:"AppSetIconPack=function(id){var v=LL.getVariables();v.edit().setInteger('idIP',id).commit();return id;};",
AppGetIconPack:"AppGetIconPack=function(){return LL.getVariables().getInteger('idIP')||0;};",

// Tapp — unified app access
Tapp:"Tapp=(function(){var v=LL.getVariables();var apps=JSON.parse(v.getString('__apps')||'[]');var alias=JSON.parse(v.getString('__alias')||'{}');var pkgs=JSON.parse(v.getString('__pkg')||'{}');var activeIp=0;function resolve(a){return typeof a==='string'?apps[alias[a.toLowerCase()]]:a;}return{usePack:function(id){activeIp=(typeof id==='number')?id:0;},all:function(){return apps;},find:function(name){return resolve(name)||null;},byPkg:function(pkg){var idx=pkgs[pkg];return idx!==undefined?apps[idx]:null;},launch:function(name){var a=resolve(name);if(!a)return false;try{var it=new Intent(Intent.ACTION_MAIN).setComponent(new ComponentName(a.p,a.c)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);LL.getContext().startActivity(it);return true;}catch(e){return false;}},icon:function(name,overrideIp){var a=resolve(name);if(!a)return null;var ipId=(overrideIp!==undefined&&overrideIp!==null)?overrideIp:activeIp;if(ipId>0){try{var path='/sdcard/LL/IconCache/IP'+ipId+'/'+a.p+'.png';if(new java.io.File(path).exists()){var bmp=BitmapFactory.decodeFile(path);if(bmp)return new BitmapDrawable(LL.getContext().getResources(),bmp);}}catch(e){}}try{return LL.getContext().getPackageManager().getActivityIcon(new ComponentName(a.p,a.c));}catch(e){return null;}}};})();",

// Tcomp — GlassButton component
Tcomp:"Tcomp={GlassButton:function(Q,packId){var ctx=LL.getContext();var BOX={p:[16,12,16,12],gap:18,r:280,bg:'#33FFFFFF',bc:'#55FFFFFF',bw:2};var BLUR={on:true,radius:80};var ICON={margin:.10,wrapBg:'#00000000',wrapOn:true,wrapRad:0,minSize:24};var TEXT={c:'#FFFFFFFF',tm:1,ts:1,Ts:18,sidePad:25};function glass(v,rd){var r=rd||BOX.r;v.setClipToOutline(false);var d=new GradientDrawable();d.setColor(Color.TRANSPARENT);d.setCornerRadius(r);d.setStroke(BOX.bw,Color.parseColor(BOX.bc));v.setBackground(d);if(BLUR.on){try{v.setBackgroundBlur(BLUR.radius,[r,r,r,r,r,r,r,r]);if(typeof v.setBackgroundBlurAlpha==='function')v.setBackgroundBlurAlpha(1.0);if(typeof v.setBackgroundBlurCrop==='function')v.setBackgroundBlurCrop(true);if(typeof v.disableMiBackgroundContainBelow==='function')v.disableMiBackgroundContainBelow();if(typeof v.clearMiBackgroundBlendColor==='function')v.clearMiBackgroundBlendColor();if(typeof v.addMiBackgroundBlendColor==='function')v.addMiBackgroundBlendColor(Color.parseColor(BOX.bg),1);}catch(e){}}}var app=Tapp.find(Q);var appName=app?app.n:Q;var appIcon=Tapp.icon(Q,packId);var R=new FrameLayout(ctx);R.setMinimumWidth(20);R.setMinimumHeight(20);glass(R);var iw=new FrameLayout(ctx);iw.setClipToOutline(true);var iwGd=new GradientDrawable();iwGd.setColor(Color.parseColor(ICON.wrapBg));iwGd.setStroke(BOX.bw,Color.parseColor(BOX.bc));iw.setBackground(iwGd);iw.setVisibility(ICON.wrapOn?0:8);var iv=new ImageView(ctx);if(appIcon)iv.setImageDrawable(appIcon);iv.setScaleType(ImageView.ScaleType.FIT_CENTER);iw.addView(iv,new FrameLayout.LayoutParams(-1,-1));var lb=new TextView(ctx);lb.setText(appName);lb.setTextColor(Color.parseColor(TEXT.c));lb.setGravity(Gravity.CENTER);lb.setSingleLine(false);lb.setMaxLines(TEXT.tm);lb.setEllipsize(null);var W=new LinearLayout(ctx);W.setGravity(Gravity.CENTER);W.addView(iw);W.addView(lb);R.addView(W,new FrameLayout.LayoutParams(-1,-1));var iwLp=new LinearLayout.LayoutParams(0,0);var iLp=new FrameLayout.LayoutParams(0,0,Gravity.CENTER);var tLp=new LinearLayout.LayoutParams(0,0);R.addOnLayoutChangeListener(new View.OnLayoutChangeListener({onLayoutChange:function(v,l,t,r,b){var w=r-l,h=b-t;if(w<2||h<2)return;var H=w>h,c=Math.min(w,h),p=Math.round(c*.12),g=Math.round(c*.08);W.setPadding(p,p,p,p);var aw=w-p*2,ah=h-p*2,wrap,icon;var rr=Math.floor(c/2);var bg=R.getBackground();if(bg){try{if(bg.getClass&&bg.getClass().getName&&bg.getClass().getName().indexOf('LayerDrawable')>-1){var d0=bg.getDrawable(0);if(d0&&d0.setCornerRadius)d0.setCornerRadius(rr);}}catch(e){}glass(R,rr);}var words=appName.split(' ');var minWordW=0;lb.setTextSize(TypedValue.COMPLEX_UNIT_SP,TEXT.ts);var paint=lb.getPaint();for(var wi=0;wi<words.length;wi++){var ww=Math.ceil(paint.measureText(words[wi]));if(ww>minWordW)minWordW=ww;}var sidePad=Math.round(c*(TEXT.sidePad/200));if(H){W.setOrientation(0);wrap=ah;icon=Math.round(wrap*(1-ICON.margin*2));if(icon<ICON.minSize)icon=ICON.minSize;var lw=aw-wrap-g-sidePad;while(lw<minWordW&&sidePad>2){sidePad--;lw++;}while(lw<minWordW&&g>2){g--;lw++;}while(lw<minWordW&&p>2){p--;W.setPadding(p,p,p,p);aw=w-p*2;lw=aw-wrap-g-sidePad;}while(lw<minWordW&&wrap>c*.2){wrap-=2;icon=Math.round(wrap*(1-ICON.margin*2));if(icon<ICON.minSize)icon=ICON.minSize;lw=aw-wrap-g-sidePad;}iwLp.width=wrap;iwLp.height=wrap;iwLp.weight=0;iw.setLayoutParams(iwLp);iLp.width=icon;iLp.height=icon;iv.setLayoutParams(iLp);tLp.width=0;tLp.height=-1;tLp.weight=1;tLp.setMargins(g,0,sidePad,0);lb.setLayoutParams(tLp);lb.setGravity(17);lb.setSingleLine(false);lb.setMaxLines(TEXT.tm);lb.setEllipsize(null);lb.setAutoSizeTextTypeUniformWithConfiguration(TEXT.ts,TEXT.Ts*4,1,TypedValue.COMPLEX_UNIT_SP);}else{W.setOrientation(1);wrap=aw;icon=Math.round(wrap*(1-ICON.margin*2));if(icon<ICON.minSize)icon=ICON.minSize;var lh=ah-wrap-g-sidePad;while(lh<TEXT.ts*TEXT.tm*1.5&&sidePad>2){sidePad--;lh++;}while(lh<TEXT.ts*TEXT.tm*1.5&&g>2){g--;lh++;}while(lh<TEXT.ts*TEXT.tm*1.5&&p>2){p--;W.setPadding(p,p,p,p);ah=h-p*2;lh=ah-wrap-g-sidePad;}iwLp.width=wrap;iwLp.height=wrap;iwLp.weight=0;iw.setLayoutParams(iwLp);iLp.width=icon;iLp.height=icon;iv.setLayoutParams(iLp);tLp.width=-1;tLp.height=0;tLp.weight=1;tLp.setMargins(0,g,0,sidePad);lb.setLayoutParams(tLp);lb.setGravity(17);lb.setSingleLine(false);lb.setMaxLines(TEXT.tm);lb.setEllipsize(null);lb.setAutoSizeTextTypeUniformWithConfiguration(TEXT.ts,TEXT.Ts*4,1,TypedValue.COMPLEX_UNIT_SP);}if(ICON.wrapOn){var wr=ICON.wrapRad>0?Math.round(c*(ICON.wrapRad/200)):Math.round(wrap/2);iwGd.setCornerRadius(wr);}}}));R.setClickable(true);R.setOnTouchListener(new View.OnTouchListener({onTouch:function(v,e){var a=e.getAction();if(a===0){v.animate().scaleX(.95).scaleY(.95).setDuration(80).setInterpolator(new android.view.animation.DecelerateInterpolator()).start();v.setAlpha(.8);}else if(a===1||a===3){v.animate().scaleX(1).scaleY(1).setDuration(200).setInterpolator(new android.view.animation.OvershootInterpolator(1.5)).start();v.setAlpha(1);}return false;}}));R.setOnClickListener(new View.OnClickListener({onClick:function(){Tapp.launch(Q);}}));return R;}};",

// Core utilities
imp:"imp=function(){for(var i=0;i<arguments.length;i++)eval(LL.getVariables().getString(arguments[i]));};",
Tc:"Tc=function(x,t,c){var a=getActiveScreen().getContext();if(x===undefined)x='undefined';else if(x===null)x='null';else try{x=String(x);}catch(e){x='[object]';}if(arguments.length<2)t=1;if(arguments.length<3)c=1;if(c)a.getSystemService(a.CLIPBOARD_SERVICE).setText(x);if(t){bindClass('android.widget.Toast');Toast.makeText(a,x,0).show();}return x;}",
Tcn:"Tcn=function(c){if(c===undefined||c===null)return LL.getCurrentDesktop();if(typeof c=='number')return LL.getContainerById(c);if(typeof c=='string')return LL.getContainerById(+c);return c;}",
Titem:"Titem=function(n,c){try{if(typeof c=='number')c=LL.getContainerById(c);else if(typeof c=='string'){var d=LL.getDesktopByName(c);c=d?d:LL.getContainerById(+c);}if(!c)return null;var i=c.getItemByLabel(n);if(!i&&c.getAllItems){var a=c.getAllItems();for(var j=0;j<a.getLength();j++){var x=a.getAt(j);if(x.getName&&x.getName()==n){i=x;break;}}}return i;}catch(e){Tc(e);return null;}}",
Ticonpacks:"Ticonpacks=function(){return AppIconPacks().length-1;};",
TUseIconPack:"TUseIconPack=function(id){return AppSetIconPack(id);};",
TGetIconPack:"TGetIconPack=function(){return AppGetIconPack();};",
TIconPackManager:"TIconPackManager=function(){try{var d=LL.getEvent().getData();if(d==null)return;d=d.substring(0);if(d.length<2||d.charAt(0)!='I')return;var ip=parseInt(d.substring(1),10);if(isNaN(ip))return;AppSetIconPack(ip);}catch(e){}}",
Tshortcut:"imp('Tc','Tcn');Tshortcut=function(pkg,c,ip,x,y,it){try{var pm=LL.getContext().getPackageManager();c=Tcn(c);if(x==null)x=0;if(y==null)y=0;if(ip==null)ip=AppGetIconPack();var v=LL.getVariables(),m=v.getInteger('IP_COUNT');if(ip<0)ip=0;if(ip>m)ip=m;if(!it)it=pm.getLaunchIntentForPackage(pkg);if(!it)return Tc('Intent not found: '+pkg);var lbl=pkg;try{lbl=''+pm.getApplicationLabel(pm.getApplicationInfo(pkg,0));}catch(e){}var s=c.addShortcut(lbl,it,x,y);try{if(ip<=0){var d=pm.getApplicationIcon(pkg),b=d.getBitmap(),img=LL.createImage(b.getWidth(),b.getHeight());img.draw().drawBitmap(b,0,0,null);s.setDefaultIcon(img);}else{var p='/sdcard/LL/IconCache/IP'+ip+'/'+pkg+'.png';if(new java.io.File(p).exists()){try{var img=LL.createImage(p);if(img)s.setDefaultIcon(img);else throw 'img null';}catch(ex){var d=pm.getApplicationIcon(pkg),b=d.getBitmap(),img=LL.createImage(b.getWidth(),b.getHeight());img.draw().drawBitmap(b,0,0,null);s.setDefaultIcon(img);}}else{var d=pm.getApplicationIcon(pkg),b=d.getBitmap(),img=LL.createImage(b.getWidth(),b.getHeight());img.draw().drawBitmap(b,0,0,null);s.setDefaultIcon(img);}}}catch(e){Tc('Tshortcut icon error\\n'+e);}return s;}catch(e){Tc(e);return null;}}"
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
e.setString("__apps",JSON.stringify(apps));
e.setString("__alias",JSON.stringify(alias));
e.setString("__pkg",JSON.stringify(pkgs));
e.setString("__iconPacks",JSON.stringify(iconPacks));
e.setInteger("__appVer",apps.length);
e.setInteger("IP_COUNT",iconPacks.length-1);
e.setString("IP0","default");e.setString("IPN0","Default");
for(var i=1;i<iconPacks.length;i++){e.setString("IP"+i,iconPacks[i].pkg);e.setString("IPN"+i,iconPacks[i].name);}
for(var k in as){if(typeof as[k]==='number')e.setInteger(k,as[k]);else e.setString(k,as[k]);}
e.commit();
var v=LL.getVariables();

//================================================
// IMPORT
//================================================
eval(v.getString("imp"));
imp("Tc","Tcn","Titem","Ticonpacks","TUseIconPack","TGetIconPack","Tshortcut","TIconPackManager","Tapp","Tcomp","AppAll","AppFind","AppSearch","AppByPkg","AppIntent","AppLaunch","AppIcon","AppIconPack","AppIconPacks","AppSetIconPack","AppGetIconPack");

//================================================
// TOAST
//================================================
bindClass("android.widget.Toast");
Toast.makeText(getActiveScreen().getContext(),"📱 "+apps.length+" apps | 🎨 "+(iconPacks.length-1)+" packs | ✅ v11 Ready",0).show();