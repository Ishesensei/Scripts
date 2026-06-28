// ============================================
// LIGHTNING LAUNCHER OVERLAY v5 – POCO F7
// Unified Launcher UX | Virtualized | Rhino JS
// ============================================
try{

// --- BIND ---
var cls="android.widget.FrameLayout,android.widget.LinearLayout,android.widget.ScrollView,android.widget.HorizontalScrollView,android.widget.EditText,android.widget.TextView,android.widget.ImageView,android.graphics.Color,android.graphics.drawable.GradientDrawable,android.view.Gravity,android.view.View,android.text.TextWatcher,android.content.Intent,android.content.pm.PackageManager,android.content.ComponentName,java.lang.Runnable,android.os.Handler,android.text.style.ForegroundColorSpan,android.text.Spanned,android.view.ViewTreeObserver,android.graphics.Rect,miuix.system.animation.physics.SpringAnimation,miuix.system.animation.physics.SpringForce,miuix.system.animation.property.ViewProperty,android.text.TextUtils".split(",");
for(var i=0;i<cls.length;i++)bindClass(cls[i]);

// --- ALIASES ---
var L=LinearLayout,F=FrameLayout,T=TextView,E=EditText,I=ImageView,GD=GradientDrawable,G=Gravity,V=View,C=Color,TT=TextUtils;
var CTX=LL.getContext(),PM=CTX.getPackageManager(),H=new Handler();
var DM=CTX.getResources().getDisplayMetrics(),W=DM.widthPixels,SH=DM.heightPixels;
var VIS=V.VISIBLE,GON=V.GONE,MP=-1,WC=-2,CEN=17,BOT=80;
var pC=function(h){return C.parseColor(h);};

// ============================================
// CONFIG — Edit freely
// ============================================
var CFG={
 mode:"D",
 glass:{r:40,sw:3,blur:120},
 search:{h:130,ts:16,pad:[40,0,40,0],rpad:[20,10,20,10],gap:15},
 btn:{sz:120,isz:60,pad:[15,15,15,15],r:30},
 pill:{h:160,pad:[30,15,30,15],iw:80,ih:80,igap:30,ts:16},
 desk:{w:Math.floor(W*0.25),h:560,pad:[15,15,15,15],wpad:[20,10,20,10]},
 drawer:{ppad:40,ts:12,cpad:[10,5,10,10]},
 spring:{
  fi:[SpringForce.STIFFNESS_MEDIUM,SpringForce.DAMPING_RATIO_MEDIUM_BOUNCY,1],
  si:[SpringForce.STIFFNESS_LOW,SpringForce.DAMPING_RATIO_LOW_BOUNCY,1],
  pd:[SpringForce.STIFFNESS_HIGH,SpringForce.DAMPING_RATIO_MEDIUM_BOUNCY,1],
  pu:[SpringForce.STIFFNESS_HIGH,SpringForce.DAMPING_RATIO_MEDIUM_BOUNCY,1],
  nu:[SpringForce.STIFFNESS_HIGH,0.1,1]
 },
 db:{vs:40,s:80,l:100},
 show:{desk:true,phone:true,drawer:true},
 ly:{sw:0.60,dw:0.98,mw:0},
 pool:10
};
for(var k in CFG.spring){var s=CFG.spring[k];s[0]*=s[2];}
var CL={
 D:{t:"#FFFFFFFF",h:"#88FFFFFF",gb:"#33FFFFFF",gs:"#55FFFFFF",dn:"#88FFFFFF",di:"#88FFFFFF",err:"#FFFF0000"},
 L:{t:"#FF000000",h:"#88000000",gb:"#33FFFFFF",gs:"#55FFFFFF",dn:"#88000000",di:"#88000000",err:"#FFFF0000"}
},M=CL[CFG.mode];
for(var k in M)M[k]=pC(M[k]);

// --- SHORT ALIASES ---
var SB=CFG.search,QB=CFG.btn,RP=CFG.pill,DP=CFG.desk,DR=CFG.drawer,LY=CFG.ly,SP=CFG.spring,DB=CFG.db;

// --- UTILS ---
function anim(v,p,tg,st,dm,vl){
 try{var a=new SpringAnimation(v,p,tg);var pd=Math.max(200,Math.abs(tg)*1.5+100);a.setMaxValue(tg+pd);a.setMinValue(tg-pd);var f=new SpringForce(tg);f.setStiffness(st);f.setDampingRatio(dm);a.setSpring(f);if(vl)a.setStartVelocity(vl);a.start();}catch(e){}
}
function glass(v,rd){
 var r=rd||CFG.glass.r;var d=new GD();d.setColor(M.gb);d.setCornerRadius(r);d.setStroke(CFG.glass.sw,M.gs);v.setBackground(d);
 try{v.setBackgroundBlur(CFG.glass.blur,[r,r,r,r,r,r,r,r]);}catch(e){}
}
function pad(v,a,b,c,d){v.setPadding(a,b,c,d);}
function lp(w,h){return new L.LayoutParams(w,h);}
function lpw(w,h,wt){return new L.LayoutParams(w,h,wt);}
function flp(w,h){return new F.LayoutParams(w,h);}
var DT=new V.OnTouchListener({onTouch:function(v,e){v.getParent().requestDisallowInterceptTouchEvent(true);return false;}});
var BT=new V.OnTouchListener({onTouch:function(v,e){v.getParent().requestDisallowInterceptTouchEvent(true);return true;}});
function TS(sc,ve){return new V.OnTouchListener({onTouch:function(v,e){var a=e.getAction();if(a===0){anim(v,ViewProperty.SCALE_X,sc,SP.pd[0],SP.pd[1]);anim(v,ViewProperty.SCALE_Y,sc,SP.pd[0],SP.pd[1]);}else if(a===1||a===3){anim(v,ViewProperty.SCALE_X,1,SP.pu[0],SP.pu[1],ve);anim(v,ViewProperty.SCALE_Y,1,SP.pu[0],SP.pu[1],-ve);}return false;}});}

// --- DATA ---
var Apps=[],Desk=[],Phone=null,Idx={};
(function(){
 var it=new Intent(Intent.ACTION_MAIN);it.addCategory(Intent.CATEGORY_LAUNCHER);
 var ls=PM.queryIntentActivities(it,0);
 for(var i=0;i<ls.size();i++){
  var ai=ls.get(i).activityInfo,nm=ls.get(i).loadLabel(PM).toString();
  var a={n:nm,l:nm.toLowerCase(),cn:new ComponentName(ai.packageName,ai.name),icon:null};
  Apps.push(a);var ch=a.l.charAt(0);if(!Idx[ch])Idx[ch]=[];Idx[ch].push(a);
  if(!Phone&&a.l.indexOf("phone")>-1)Phone=a;
 }
 Apps.sort(function(a,b){return a.n<b.n?-1:1;});
 try{var ids=LL.getAllDesktops();for(var i=0;i<ids.length;i++){var id=ids.getAt(i),ct=LL.getContainerById(id),nm="Desktop "+id;try{if(ct&&ct.getName)nm=ct.getName();}catch(e){}Desk.push({id:id,name:nm});}}catch(e){}
})();
function gIcon(a){if(!a.icon)try{a.icon=PM.getActivityIcon(a.cn);}catch(e){}return a.icon;}

// --- STATE ---
var md="HOME",spd=false,vis=false,bt=true;
function fo(){
 try{var s=LL.getFloatingScreen().getScreen(),f=s.getClass().getDeclaredField("this$0");f.setAccessible(true);var w=f.get(s),o=w.getClass().getDeclaredField("mIsShown");o.setAccessible(true);return o.getBoolean(w);}catch(e){return false;}
}
function clsF(){
 if(spd)return;spd=true;try{LL.runAction(43);}catch(e){}
 var im=CTX.getSystemService("input_method");if(im&&srch.hasWindowFocus())im.hideSoftInputFromWindow(srch.getWindowToken(),0);
 H.postDelayed(new Runnable({run:function(){spd=false;}}),200);
}
var clk=new V.OnClickListener({onClick:function(v){
 var a=v.getTag();if(!a)return;clsF();
 try{CTX.startActivity(new Intent(Intent.ACTION_MAIN).setComponent(a.cn).setFlags(Intent.FLAG_ACTIVITY_NEW_TASK));}catch(e){}
}});

// --- NAVIGATION (unified launcher UX) ---
function go(to){
 if(md===to)return;md=to;
 var im=CTX.getSystemService("input_method");
 if(to==="DRAWER"){
  if(im&&srch.hasWindowFocus())im.hideSoftInputFromWindow(srch.getWindowToken(),0);
  srch.clearFocus();srch.setFocusable(false);srch.setFocusableInTouchMode(false);
  deskS.setVisibility(GON);res.setVisibility(GON);scr.setVisibility(VIS);
  drw.setVisibility(VIS);drw.setAlpha(1);drw.setScaleX(1);drw.setScaleY(1);ldPg(0);
 }else if(to==="SEARCH"){
  srch.setFocusable(true);srch.setFocusableInTouchMode(true);drw.setVisibility(GON);
  if(srch.getText().toString().trim()===""){deskS.setVisibility(VIS);res.setVisibility(GON);scr.setVisibility(VIS);}
  else{deskS.setVisibility(GON);res.setVisibility(VIS);scr.setVisibility(VIS);}
  if(im)im.showSoftInput(srch,1);srch.requestFocus();
 }else{
  // HOME
  if(im&&srch.hasWindowFocus())im.hideSoftInputFromWindow(srch.getWindowToken(),0);
  srch.clearFocus();drw.setVisibility(GON);res.setVisibility(GON);
  srch.setText("");deskS.setVisibility(VIS);scr.setVisibility(VIS);
 }
 var tw=to==="DRAWER"?LY.dw:LY.sw;
 var tlp=top.getLayoutParams();tlp.weight=tw;top.setLayoutParams(tlp);
 var blp=spc.getLayoutParams();blp.weight=1-tw;spc.setLayoutParams(blp);
}
function goHome(){go("HOME");}
function goSearch(){go("SEARCH");}
function goDrawer(){go("DRAWER");}

// --- BUILD UI ---
var root=new L(CTX);root.setOrientation(1);root.setClipChildren(false);root.setClipToPadding(false);
root.setLayoutParams(LY.mw>0?lp(LY.mw,MP):lp(MP,MP));
var top=new L(CTX);top.setOrientation(1);top.setGravity(BOT|G.CENTER_HORIZONTAL);top.setClipChildren(false);top.setClipToPadding(false);

var scr=new ScrollView(CTX);scr.setVerticalScrollBarEnabled(false);scr.setOverScrollMode(2);scr.setVisibility(GON);scr.setClipChildren(false);scr.setClipToPadding(false);scr.setFillViewport(true);scr.setOnTouchListener(DT);
var sc=new L(CTX);sc.setOrientation(1);sc.setGravity(BOT);sc.setClipChildren(false);sc.setClipToPadding(false);

// --- DESKTOP STRIP ---
var deskS=new HorizontalScrollView(CTX);deskS.setHorizontalScrollBarEnabled(false);deskS.setOverScrollMode(2);deskS.setOnTouchListener(DT);
var dw=new L(CTX);dw.setOrientation(0);pad(dw,DP.wpad[0],DP.wpad[1],DP.wpad[2],DP.wpad[3]);
var dclk=new V.OnClickListener({onClick:function(v){
 var id=v.getTag();if(id==null)return;var c= getConfiguration(),o=c.getHomeDesktopId();
 try{srch.clearFocus();}catch(e){}try{LL.runAction(43);}catch(e){}
 H.post(new Runnable({run:function(){
  try{c.setHomeDesktopId(id);c.setCurrentDesktopId(id);CTX.startActivity(new Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_HOME).setFlags(Intent.FLAG_ACTIVITY_NEW_TASK));}catch(e){}
  H.postDelayed(new Runnable({run:function(){
   try{c.setHomeDesktopId(o);LL.getHomeScreen().goToDesktopPosition(id,0,0,1,true);}catch(e){H.postDelayed(new Runnable({run:function(){try{LL.getHomeScreen().goToDesktopPosition(id,0,0,1,true);}catch(e){}}}),300);}
  }}),300);
 }}));
}});
for(var i=0;i<Desk.length;i++){
 (function(id,nm,idx){
  var p=new L(CTX);p.setOrientation(1);p.setGravity(CEN);pad(p,DP.pad[0],DP.pad[1],DP.pad[2],DP.pad[3]);glass(p);p.setOnTouchListener(TS(0.94,10));p.setLayoutParams(lp(DP.w,DP.h));p.setTag(id);
  var n=new T(CTX);n.setText(String(idx+1));n.setTextColor(M.dn);n.setGravity(CEN);p.addView(n);
  var t=new T(CTX);t.setText(nm);t.setTextColor(M.t);t.setGravity(CEN);p.addView(t,lpw(MP,WC,1));
  var d=new T(CTX);d.setText("ID:"+id);d.setTextColor(M.di);d.setTextSize(10);d.setGravity(CEN);p.addView(d);
  p.setAlpha(0.85);p.setTranslationY(30);
  p.postDelayed(new Runnable({run:(function(v){return function(){anim(v,ViewProperty.ALPHA,1,SP.fi[0],SP.fi[1]);anim(v,ViewProperty.TRANSLATION_Y,0,SP.si[0],SP.si[1]);}})(p)}),idx*80);
  p.setOnClickListener(dclk);dw.addView(p);
 })(Desk[i].id,Desk[i].name,i);
}
deskS.addView(dw);sc.addView(deskS,lp(MP,WC));

// --- RESULTS POOL ---
var res=new L(CTX);res.setOrientation(1);res.setGravity(BOT);res.setClipChildren(false);res.setClipToPadding(false);res.setPadding(0,0,0,15);
var pool=[];
for(var j=0;j<CFG.pool;j++){
 var rp=new L(CTX);rp.setOrientation(0);rp.setGravity(16);pad(rp,RP.pad[0],RP.pad[1],RP.pad[2],RP.pad[3]);glass(rp);rp.setOnTouchListener(TS(0.94,10));rp.setLayoutParams(lp(MP,RP.h));
 var ic=new I(CTX);rp.addView(ic,lp(RP.iw,RP.ih));
 var lb=new T(CTX);lb.setTextColor(M.t);lb.setTextSize(RP.ts);lb.setPadding(RP.igap,0,0,0);lb.setSingleLine(false);lb.setMaxLines(2);lb.setGravity(16|G.CENTER_VERTICAL);
 rp.addView(lb,lp(MP,WC));rp.setVisibility(GON);rp.setOnClickListener(clk);
 pool.push({v:rp,icon:ic,label:lb});res.addView(rp,0);
}
sc.addView(res,lp(MP,WC));

// --- VIRTUALIZED DRAWER ---
var drw=new F(CTX);drw.setVisibility(GON);glass(drw);drw.setOnTouchListener(BT);
var dsc=new HorizontalScrollView(CTX);dsc.setHorizontalScrollBarEnabled(false);dsc.setOverScrollMode(2);dsc.setOnTouchListener(DT);
var aw=W-DR.ppad,tm=180;
var COLS=Math.max(4,Math.floor(aw/tm)),ROWS=4,CW=Math.floor(aw/COLS),CH=Math.floor(CW*1.4),ISZ=Math.min(Math.floor(CW*0.65),120),PP=COLS*ROWS,cpg=-1;
var pgv=new L(CTX);pgv.setOrientation(1);pgv.setLayoutParams(lp(aw,MP));
var cells=[];
for(var r=0;r<ROWS;r++){
 var row=new L(CTX);row.setOrientation(0);row.setLayoutParams(lpw(MP,0,1));
 for(var c=0;c<COLS;c++){
  var cl=new L(CTX);cl.setOrientation(1);cl.setGravity(CEN);cl.setLayoutParams(lpw(0,MP,1));
  var ci=new I(CTX);cl.addView(ci,lp(ISZ,ISZ));
  var ct=new T(CTX);ct.setTextColor(M.t);ct.setTextSize(DR.ts);ct.setGravity(CEN);ct.setSingleLine(true);pad(ct,DR.cpad[0],DR.cpad[1],DR.cpad[2],DR.cpad[3]);
  try{ct.setEllipsize(TT.TruncateAt.END);}catch(e){}
  cl.addView(ct,lp(MP,WC));cl.setScaleX(0.8);cl.setScaleY(0.8);cl.setAlpha(0);cl.setTag(null);cl.setOnClickListener(clk);cl.setOnTouchListener(TS(0.92,6));
  cells.push({v:cl,icon:ci,label:ct});row.addView(cl);
 }
 pgv.addView(row);
}
dsc.addView(pgv);drw.addView(dsc,flp(MP,MP));
dsc.setOnScrollChangeListener(new V.OnScrollChangeListener({onScrollChange:function(v,sx,sy,ox,oy){var pg=Math.round(sx/aw);if(pg!==cpg){cpg=pg;ldPg(pg);}}}));
function ldPg(pg){var st=pg*PP;for(var i=0;i<cells.length;i++){var cl=cells[i],ix=st+i;if(ix<Apps.length){var a=Apps[ix];cl.v.setTag(a);cl.icon.setImageDrawable(gIcon(a));cl.label.setText(a.n);cl.v.setVisibility(VIS);cl.v.postDelayed(new Runnable({run:(function(v,ix){return function(){anim(v,ViewProperty.SCALE_X,1,SP.fi[0],SP.fi[1],4);anim(v,ViewProperty.SCALE_Y,1,SP.fi[0],SP.fi[1],-3);anim(v,ViewProperty.ALPHA,1,SP.fi[0],SP.fi[1]);}})(cl.v,ix)}),i*10);}else{cl.v.setTag(null);cl.v.setVisibility(GON);}}}
sc.addView(drw,lpw(MP,0,1));scr.addView(sc);top.addView(scr,lp(MP,WC));root.addView(top,lpw(MP,0,LY.sw));

// --- SEARCH BAR ---
var srow=new L(CTX);srow.setOrientation(0);srow.setGravity(16);pad(srow,SB.rpad[0],SB.rpad[1],SB.rpad[2],SB.rpad[3]);
function qb(ic,ac){
 var b=new F(CTX);pad(b,QB.pad[0],QB.pad[1],QB.pad[2],QB.pad[3]);glass(b,QB.r);b.setOnTouchListener(TS(0.94,10));
 var iv=new I(CTX);if(typeof ic==="number")iv.setImageResource(ic);else if(ic)iv.setImageDrawable(ic);
 b.addView(iv,flp(QB.isz,QB.isz));b.setOnClickListener(new V.OnClickListener({onClick:ac}));return b;
}
var phb=qb(Phone?gIcon(Phone):android.R.drawable.sym_action_call,function(){if(Phone){clsF();try{CTX.startActivity(new Intent(Intent.ACTION_MAIN).setComponent(Phone.cn).setFlags(Intent.FLAG_ACTIVITY_NEW_TASK));}catch(e){}}});
var apb=qb(android.R.drawable.ic_menu_sort_by_size,function(){if(md==="DRAWER")goHome();else goDrawer();});
var swrp=new F(CTX);glass(swrp,100);
var srch=new E(CTX);srch.setHint("Theo...");srch.setTextColor(M.t);srch.setHintTextColor(M.h);srch.setSingleLine(true);pad(srch,SB.pad[0],SB.pad[1],SB.pad[2],SB.pad[3]);srch.setTextSize(SB.ts);srch.setBackground(null);srch.setGravity(CEN);swrp.addView(srch,flp(MP,MP));
srow.addView(phb,lp(QB.sz,QB.sz));var slp=lpw(0,SB.h,1);slp.setMargins(SB.gap,0,SB.gap,0);srow.addView(swrp,slp);srow.addView(apb,lp(QB.sz,QB.sz));root.addView(srow,lp(MP,WC));
var spc=new V(CTX);var bw=1-LY.sw;if(bw>0)root.addView(spc,lpw(MP,0,bw));

// --- SEARCH ---
var sTmr=null,ndg=false,redS=new ForegroundColorSpan(C.RED);
function nd(){
 if(ndg)return;ndg=true;anim(swrp,ViewProperty.TRANSLATION_X,0,SP.nu[0],SP.nu[1],3500);
 H.postDelayed(new Runnable({run:function(){ndg=false;}}),300);
}
srch.addTextChangedListener(new TextWatcher({
 beforeTextChanged:function(){},onTextChanged:function(){},
 afterTextChanged:function(s){
  var q=s.toString().toLowerCase().trim(),len=q.length;
  if(sTmr)H.removeCallbacks(sTmr);
  if(len===0){try{s.removeSpan(redS);}catch(e){}res.setVisibility(GON);deskS.setVisibility(VIS);scr.setVisibility(VIS);if(md==="SEARCH")goHome();return;}
  if(md!=="SEARCH")goSearch();
  sTmr=new Runnable({run:function(){
   var ch=q.charAt(0),cds=Idx[ch]||Apps,mt=[];
   for(var i=0;i<cds.length;i++){
    if(cds[i].l.indexOf(q)!==-1){var sc=cds[i].l.indexOf(q)===0?0:cds[i].l.indexOf(" "+q)>-1?1:2;mt.push({a:cds[i],s:sc});if(mt.length>=CFG.pool*3)break;}
   }
   mt.sort(function(a,b){return a.s-b.s||a.a.l.indexOf(q)-b.a.l.indexOf(q);});if(mt.length>CFG.pool)mt.length=CFG.pool;
   deskS.setVisibility(GON);scr.setVisibility(VIS);res.setVisibility(VIS);
   if(mt.length===0){
    nd();var vl=0;
    for(var l=q.length;l>=0;l--){var px=q.substring(0,l);if(px.length===0)break;var fd=false;for(var j=0;j<cds.length;j++){if(cds[j].l.indexOf(px)!==-1){fd=true;break;}}if(fd){vl=l;break;}}
    if(vl<q.length)try{s.setSpan(redS,vl,q.length,Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);}catch(e){}
    for(var i=0;i<CFG.pool;i++)pool[i].v.setVisibility(GON);return;
   }
   try{s.removeSpan(redS);}catch(e){}
   for(var i=0;i<CFG.pool;i++){var itm=pool[i];if(i<mt.length){(function(a,iv,icv,lbv,ix){iv.setVisibility(VIS);iv.setAlpha(0.85);iv.setTranslationY(30);iv.setTag(a);icv.setImageDrawable(gIcon(a));lbv.setText(a.n);iv.postDelayed(new Runnable({run:function(){anim(iv,ViewProperty.ALPHA,1,SP.fi[0],SP.fi[1]);anim(iv,ViewProperty.TRANSLATION_Y,0,SP.si[0],SP.si[1]);}}),ix*25);})(mt[i].a,itm.v,itm.icon,itm.label,i);}else{itm.v.setVisibility(GON);}}
   scr.post(new Runnable({run:function(){scr.fullScroll(130);}}));
  }});
  H.postDelayed(sTmr,len===1?DB.l:len===2?DB.s:DB.vs);
 }
}));

// --- LIFECYCLE ---
function ckVis(){
 if(bt){bt=false;}var r=new Rect();
 if(root.getGlobalVisibleRect(r)&&root.getWidth()>0&&(r.width()/root.getWidth())>0.8){if(!vis){vis=true;opn();}}
 else if(vis){vis=false;sus();}
}
function opn(){
 goHome();srch.setText("");res.setVisibility(GON);deskS.setVisibility(VIS);
 if(!srch.hasFocus()){spd=false;root.setElevation(20);srch.setFocusable(true);srch.setFocusableInTouchMode(true);srch.requestFocus();if(scr.getVisibility()!==VIS)scr.setVisibility(VIS);
  var tr=0;var kr=new Runnable({run:function(){if(!srch.hasFocus())srch.requestFocus();if(srch.hasWindowFocus()){var im=CTX.getSystemService("input_method");if(im)im.showSoftInput(srch,1);}else if(tr++<15)srch.postDelayed(this,15);}});srch.postDelayed(kr,10);}
}
function sus(){vis=false;root.setElevation(0);var im=CTX.getSystemService("input_method");if(im&&srch.hasWindowFocus())im.hideSoftInputFromWindow(srch.getWindowToken(),0);res.setVisibility(GON);srch.setText("");srch.setFocusable(false);srch.setFocusableInTouchMode(false);srch.clearFocus();}
root.addOnAttachStateChangeListener(new V.OnAttachStateChangeListener({onViewAttachedToWindow:function(v){root.post(new Runnable({run:ckVis}));},onViewDetachedFromWindow:function(v){}}));
root.getViewTreeObserver().addOnScrollChangedListener(new ViewTreeObserver.OnScrollChangedListener({onScrollChanged:function(){ckVis();}}));
root.getViewTreeObserver().addOnWindowFocusChangeListener(new ViewTreeObserver.OnWindowFocusChangeListener({onWindowFocusChanged:function(h){if(h)ckVis();}}));
srch.setOnFocusChangeListener(new V.OnFocusChangeListener({onFocusChange:function(v,h){if(!h&&!spd&&!bt&&md!=="DRAWER"){srch.postDelayed(new Runnable({run:function(){if(!srch.hasFocus()&&!spd)sus();}}),50);}}}));
if(fo())opn();
return root;
}catch(e){var er=new android.widget.TextView(LL.getContext());er.setText("L:"+e.lineNumber+" "+e.toString());er.setTextColor(android.graphics.Color.RED);return er;}