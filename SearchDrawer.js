// ============================================
// LIGHTNING LAUNCHER OVERLAY v6 — Fixed Layout
// ============================================
try{
eval(LL.getVariables().getString("imp"));
imp("Tapp","AppIcon","AppLaunch","AppSearch","Tshortcut","Tc","TAnim","TSpring");

var L=LinearLayout,F=FrameLayout,T=TextView,E=EditText,I=ImageView,GD=GradientDrawable,G=Gravity,V=View,C=Color,TT=TextUtils;
var CTX=LL.getContext(),H=new Handler(),DM=CTX.getResources().getDisplayMetrics(),W=DM.widthPixels,SH=DM.heightPixels;
var VIS=V.VISIBLE,GON=V.GONE,MP=-1,WC=-2,CEN=17,BOT=80,pC=function(h){return C.parseColor(h);};
var blurOn=true;try{blurOn=LL.getVariables().getInteger("BLUR_ON")===1;}catch(e){}
var solidC="#DD8B4513";try{solidC=LL.getVariables().getString("SOLID_COLOR")||"#DD8B4513";}catch(e){}

var CFG={
 glass:{r:40,sw:3,blur:200},search:{h:190,ts:16,pad:[40,0,40,0],rpad:[20,10,20,10],gap:15},
 btn:{sz:120,isz:68,pad:[15,15,15,15],r:30},pill:{h:260,pad:[30,15,120,15],iw:-2,ih:-2,igap:60,ts:18},
 desk:{w:Math.floor(W*0.25),h:260,pad:[15,15,15,15],wpad:[20,10,20,10],gap:12},
 db:{vs:40,s:80,l:100},ly:{sw:0.60,dw:0.95},pool:5
};
var M={t:pC("#FFFFFFFF"),h:pC("#88FFFFFF"),gb:pC("#33FFFFFF"),gs:pC("#55FFFFFF"),dn:pC("#88FFFFFF"),di:pC("#88FFFFFF")};
var SB=CFG.search,QB=CFG.btn,RP=CFG.pill,DP=CFG.desk,LY=CFG.ly,DB=CFG.db,SP=TSpring;

function anim(v,p,tg,st,dm,vl){TAnim(v,p,tg,st,dm,vl);}
function glass(v,rd){var r=rd||CFG.glass.r;var d=new GD();if(blurOn){d.setColor(C.TRANSPARENT);v.setBackground(d);try{v.setBackgroundBlur(CFG.glass.blur,[r,r,r,r,r,r,r,r]);v.setBackgroundBlurAlpha(1.0);v.setBackgroundBlurCrop(true);v.disableMiBackgroundContainBelow();v.clearMiBackgroundBlendColor();v.addMiBackgroundBlendColor(M.gb,1);}catch(e){}}else{d.setColor(pC(solidC));d.setCornerRadius(r);d.setStroke(CFG.glass.sw,M.gs);v.setBackground(d);}}
function pad(v,a,b,c,d){v.setPadding(a,b,c,d);}
function lp(w,h){return new L.LayoutParams(w,h);}
function lpw(w,h,wt){return new L.LayoutParams(w,h,wt);}
function flp(w,h){return new F.LayoutParams(w,h);}
var DT=new V.OnTouchListener({onTouch:function(v,e){v.getParent().requestDisallowInterceptTouchEvent(true);return false;}});
var BT=new V.OnTouchListener({onTouch:function(v,e){v.getParent().requestDisallowInterceptTouchEvent(true);return true;}});
function TS(sc,ve){return new V.OnTouchListener({onTouch:function(v,e){var a=e.getAction();if(a===0){anim(v,ViewProperty.SCALE_X,sc,SP.pd[0],SP.pd[1]);anim(v,ViewProperty.SCALE_Y,sc,SP.pd[0],SP.pd[1]);}else if(a===1||a===3){anim(v,ViewProperty.SCALE_X,1,SP.pu[0],SP.pu[1],ve);anim(v,ViewProperty.SCALE_Y,1,SP.pu[0],SP.pu[1],-ve);}return false;}});}

var Apps=Tapp.all(),Desk=[],Phone=Tapp.find("phone"),Idx={};
try{var ids=LL.getAllDesktops();for(var i=0;i<ids.length;i++){var id=ids.getAt(i),ct=LL.getContainerById(id);Desk.push({id:id,name:ct&&ct.getName?ct.getName():"Desktop "+id});}}catch(e){}
for(var i=0;i<Apps.length;i++){var ch=Apps[i].l.charAt(0);if(!Idx[ch])Idx[ch]=[];Idx[ch].push(Apps[i]);}
function gIcon(a){return AppIcon(a);}

var md="HOME",spd=false,vis=false,bt=true;
function fo(){try{var s=LL.getFloatingScreen().getScreen(),f=s.getClass().getDeclaredField("this$0");f.setAccessible(true);var w=f.get(s),o=w.getClass().getDeclaredField("mIsShown");o.setAccessible(true);return o.getBoolean(w);}catch(e){return false;}}
function clsF(){if(spd)return;spd=true;try{LL.runAction(43);}catch(e){}var im=CTX.getSystemService("input_method");if(im&&srch.hasWindowFocus())im.hideSoftInputFromWindow(srch.getWindowToken(),0);H.postDelayed(new Runnable({run:function(){spd=false;}}),200);}

var menuO=null;
function showMenu(app){if(menuO){try{root.removeView(menuO);}catch(e){}}menuO=new F(CTX);menuO.setBackgroundColor(C.argb(150,0,0,0));menuO.setOnClickListener(new V.OnClickListener({onClick:function(){try{root.removeView(menuO);menuO=null;}catch(e){}}}));var mp=new L(CTX);mp.setOrientation(1);mp.setPadding(25,25,25,25);glass(mp,35);var mlp=new F.LayoutParams(Math.floor(W*0.75),WC);mlp.gravity=CEN;mp.setLayoutParams(mlp);function mi(l,ac){var t=new T(CTX);t.setText(l);t.setTextColor(M.t);t.setTextSize(15);t.setPadding(18,16,18,16);t.setGravity(CEN);t.setOnClickListener(new V.OnClickListener({onClick:function(){try{root.removeView(menuO);menuO=null;}catch(e){}ac();}}));mp.addView(t);}function sep(){var s=new V(CTX);s.setLayoutParams(new L.LayoutParams(MP,2));s.setBackgroundColor(M.gs);mp.addView(s);}var ti=new T(CTX);ti.setText(app.n);ti.setTextColor(M.t);ti.setTextSize(17);ti.setPadding(15,10,15,20);ti.setGravity(CEN);mp.addView(ti);sep();mi("Open",function(){clsF();AppLaunch(app);});mi("Play Store",function(){try{CTX.startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse("market://details?id="+app.p)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));}catch(e){}});mi("Export",function(){try{var i=new Intent(Intent.ACTION_SEND);i.setType("text/plain");i.putExtra(Intent.EXTRA_TEXT,"App: "+app.n+"\nPackage: "+app.p);CTX.startActivity(Intent.createChooser(i,"Export"));}catch(e){}});sep();mi("Shortcut",function(){try{Tshortcut(app.p,getConfiguration().getCurrentDesktop(),0);Tc("Shortcut created",1,0);}catch(e){}});mi("App Info",function(){try{CTX.startActivity(new Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS,Uri.parse("package:"+app.p)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));}catch(e){}});sep();mi("Uninstall",function(){try{CTX.startActivity(new Intent(Intent.ACTION_DELETE,Uri.parse("package:"+app.p)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));}catch(e){}});menuO.addView(mp,mlp);root.addView(menuO,new F.LayoutParams(MP,MP));}

var clk=new V.OnClickListener({onClick:function(v){var a=v.getTag();if(!a)return;clsF();AppLaunch(a);}});
var lclk=new V.OnLongClickListener({onLongClick:function(v){var a=v.getTag();if(!a)return true;showMenu(a);return true;}});

function go(to){if(md===to)return;md=to;var im=CTX.getSystemService("input_method");
if(to==="DRAWER"){if(im&&srch.hasWindowFocus())im.hideSoftInputFromWindow(srch.getWindowToken(),0);srch.clearFocus();srch.setFocusable(false);srch.setFocusableInTouchMode(false);searchArea.setVisibility(GON);drw.setVisibility(VIS);var tlp=topArea.getLayoutParams();tlp.weight=LY.dw;topArea.setLayoutParams(tlp);var blp=spc.getLayoutParams();blp.weight=1-LY.dw;spc.setLayoutParams(blp);ldPg(0);}
else if(to==="SEARCH"){srch.setFocusable(true);srch.setFocusableInTouchMode(true);drw.setVisibility(GON);searchArea.setVisibility(VIS);var tlp=topArea.getLayoutParams();tlp.weight=LY.sw;topArea.setLayoutParams(tlp);var blp=spc.getLayoutParams();blp.weight=1-LY.sw;spc.setLayoutParams(blp);if(srch.getText().toString().trim()===""){deskS.setVisibility(VIS);res.setVisibility(GON);}else{deskS.setVisibility(GON);res.setVisibility(VIS);}if(im)im.showSoftInput(srch,1);srch.requestFocus();}
else{if(im&&srch.hasWindowFocus())im.hideSoftInputFromWindow(srch.getWindowToken(),0);srch.clearFocus();drw.setVisibility(GON);searchArea.setVisibility(VIS);srch.setText("");deskS.setVisibility(VIS);res.setVisibility(GON);var tlp=topArea.getLayoutParams();tlp.weight=LY.sw;topArea.setLayoutParams(tlp);var blp=spc.getLayoutParams();blp.weight=1-LY.sw;spc.setLayoutParams(blp);}}
function goHome(){go("HOME");}function goSearch(){go("SEARCH");}function goDrawer(){go("DRAWER");}

var root=new L(CTX);root.setOrientation(1);root.setClipChildren(false);root.setClipToPadding(false);root.setLayoutParams(lp(MP,MP));

// TOP AREA - contains search/desktop area AND drawer, toggles between them
var topArea=new F(CTX);topArea.setClipChildren(false);

// Search/Desktop area
var searchArea=new L(CTX);searchArea.setOrientation(1);searchArea.setGravity(BOT|G.CENTER_HORIZONTAL);
searchArea.setClipChildren(false);searchArea.setClipToPadding(false);

var deskS=new HorizontalScrollView(CTX);deskS.setHorizontalScrollBarEnabled(false);deskS.setOverScrollMode(2);deskS.setOnTouchListener(DT);
var dw=new L(CTX);dw.setOrientation(0);pad(dw,DP.wpad[0],DP.wpad[1],DP.wpad[2],DP.wpad[3]);
var dclk=new V.OnClickListener({onClick:function(v){var id=v.getTag();if(id==null)return;var c=getConfiguration(),o=c.getHomeDesktopId();try{srch.clearFocus();}catch(e){}try{LL.runAction(43);}catch(e){}H.post(new Runnable({run:function(){try{c.setHomeDesktopId(id);c.setCurrentDesktopId(id);CTX.startActivity(new Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_HOME).setFlags(Intent.FLAG_ACTIVITY_NEW_TASK));}catch(e){}H.postDelayed(new Runnable({run:function(){try{c.setHomeDesktopId(o);LL.getHomeScreen().goToDesktopPosition(id,0,0,1,true);}catch(e){H.postDelayed(new Runnable({run:function(){try{LL.getHomeScreen().goToDesktopPosition(id,0,0,1,true);}catch(e){}}}),300);}}}),300);}}));}});
for(var i=0;i<Desk.length;i++){(function(id,nm,idx){var p=new L(CTX);p.setOrientation(1);p.setGravity(CEN);pad(p,DP.pad[0],DP.pad[1],DP.pad[2],DP.pad[3]);glass(p);p.setOnTouchListener(TS(0.94,10));var dLp=new L.LayoutParams(DP.w,DP.h);dLp.setMargins(0,0,DP.gap,0);p.setLayoutParams(dLp);p.setTag(id);var n=new T(CTX);n.setText(String(idx+1));n.setTextColor(M.dn);n.setGravity(CEN);p.addView(n);var t=new T(CTX);t.setText(nm);t.setTextColor(M.t);t.setGravity(CEN);p.addView(t,lpw(MP,WC,1));var d=new T(CTX);d.setText("ID:"+id);d.setTextColor(M.di);d.setTextSize(10);d.setGravity(CEN);p.addView(d);p.setAlpha(0.85);p.setTranslationY(30);p.postDelayed(new Runnable({run:(function(v){return function(){anim(v,ViewProperty.ALPHA,1,SP.fi[0],SP.fi[1]);anim(v,ViewProperty.TRANSLATION_Y,0,SP.si[0],SP.si[1]);}})(p)}),idx*80);p.setOnClickListener(dclk);dw.addView(p);})(Desk[i].id,Desk[i].name,i);}
deskS.addView(dw);deskS.setVisibility(VIS);searchArea.addView(deskS,lp(MP,WC));

var res=new L(CTX);res.setOrientation(1);res.setGravity(CEN|BOT);res.setPadding(0,0,0,15);res.setVisibility(GON);
var pool=[];
for(var j=0;j<CFG.pool;j++){var rp=new L(CTX);rp.setOrientation(0);rp.setGravity(CEN);pad(rp,RP.pad[0],RP.pad[1],RP.pad[2],RP.pad[3]);glass(rp);rp.setOnTouchListener(TS(0.94,10));var rLp=new L.LayoutParams(WC,RP.h);rLp.gravity=CEN;rLp.setMargins(0,0,0,DP.gap);rp.setLayoutParams(rLp);var ic=new I(CTX);rp.addView(ic,lp(RP.iw,RP.ih));var lb=new T(CTX);lb.setTextColor(M.t);lb.setTextSize(RP.ts);lb.setPadding(RP.igap,0,0,0);lb.setSingleLine(false);lb.setMaxLines(2);lb.setGravity(CEN);rp.addView(lb,lp(MP,WC));rp.setVisibility(GON);rp.setOnClickListener(clk);pool.push({v:rp,icon:ic,label:lb});res.addView(rp,0);}
searchArea.addView(res,lp(MP,WC));
topArea.addView(searchArea,lp(MP,MP));

// Drawer area - separate from search
var drw=new F(CTX);drw.setVisibility(GON);glass(drw);drw.setOnTouchListener(BT);
var dsc=new HorizontalScrollView(CTX);dsc.setHorizontalScrollBarEnabled(false);dsc.setOverScrollMode(0);dsc.setOnTouchListener(DT);dsc.setClipChildren(false);
var COLS=4,ROWS=6,pageW=W-20,CW=Math.floor(pageW/COLS),ISZ=Math.floor(CW*0.65),PP=COLS*ROWS,pageGap=Math.floor(W*0.06),totalP=Math.ceil(Apps.length/PP);
var pagesC=new L(CTX);pagesC.setOrientation(0);var allC=[],built=0,maxB=Math.min(2,totalP);
function bPg(p){var pg=new L(CTX);pg.setOrientation(1);pg.setPadding(10,10,10,10);var plp=new L.LayoutParams(pageW,MP);if(p>0)plp.setMargins(pageGap,0,0,0);pg.setLayoutParams(plp);for(var r=0;r<ROWS;r++){var row=new L(CTX);row.setOrientation(0);row.setLayoutParams(lpw(MP,0,1));for(var c=0;c<COLS;c++){var idx=p*PP+r*COLS+c;var cl=new L(CTX);cl.setOrientation(1);cl.setGravity(CEN);cl.setLayoutParams(lpw(0,MP,1));cl.setPadding(4,4,4,4);var ci=new I(CTX);cl.addView(ci,lp(ISZ,ISZ));var ct=new T(CTX);ct.setTextColor(M.t);ct.setTextSize(11);ct.setGravity(CEN);ct.setSingleLine(true);ct.setPadding(2,4,2,2);try{ct.setEllipsize(TT.TruncateAt.END);}catch(e){}cl.addView(ct,lp(MP,WC));cl.setTag(null);cl.setOnClickListener(clk);cl.setOnLongClickListener(lclk);cl.setOnTouchListener(TS(0.92,6));allC.push({v:cl,icon:ci,label:ct,page:p});row.addView(cl);}pg.addView(row);}return pg;}
for(var p=0;p<maxB;p++){pagesC.addView(bPg(p));built=p+1;}
dsc.addView(pagesC);drw.addView(dsc,flp(MP,MP));
dsc.setOnScrollChangeListener(new V.OnScrollChangeListener({onScrollChange:function(v,sx,sy,ox,oy){var cp=Math.floor(sx/(pageW+pageGap));if(cp>=built-1&&built<totalP){pagesC.addView(bPg(built));built++;}var st=cp*PP;for(var i=0;i<allC.length;i++){var cl=allC[i];if(cl.page===cp||cl.page===cp+1){var ix=cl.page*PP+(i%PP);if(ix<Apps.length){var a=Apps[ix];cl.v.setTag(a);cl.icon.setImageDrawable(gIcon(a));cl.label.setText(a.n);cl.v.setVisibility(VIS);cl.v.setScaleX(1);cl.v.setScaleY(1);cl.v.setAlpha(1);}}}}}));
function ldPg(pg){var st=pg*PP;for(var i=0;i<allC.length;i++){var cl=allC[i];if(cl.page===pg){var ix=pg*PP+(i%PP);if(ix<Apps.length){var a=Apps[ix];cl.v.setTag(a);cl.icon.setImageDrawable(gIcon(a));cl.label.setText(a.n);cl.v.setVisibility(VIS);cl.v.setScaleX(1);cl.v.setScaleY(1);cl.v.setAlpha(1);}}}}
topArea.addView(drw,lp(MP,MP));
root.addView(topArea,lpw(MP,0,LY.sw));

var srow=new L(CTX);srow.setOrientation(0);srow.setGravity(16);pad(srow,SB.rpad[0],SB.rpad[1],SB.rpad[2],SB.rpad[3]);
function qb(ic,ac){var b=new F(CTX);pad(b,QB.pad[0],QB.pad[1],QB.pad[2],QB.pad[3]);glass(b,QB.r);b.setOnTouchListener(TS(0.94,10));var iv=new I(CTX);if(typeof ic==="number")iv.setImageResource(ic);else if(ic)iv.setImageDrawable(ic);b.addView(iv,flp(QB.isz,QB.isz));b.setOnClickListener(new V.OnClickListener({onClick:ac}));return b;}
var phb=qb(Phone?gIcon(Phone):android.R.drawable.sym_action_call,function(){if(Phone){clsF();AppLaunch(Phone);}});
var apb=qb(android.R.drawable.ic_menu_sort_by_size,function(){if(md==="DRAWER")goHome();else goDrawer();});apb.setClickable(true);apb.setFocusable(true);
var swrp=new F(CTX);glass(swrp,100);
var srch=new E(CTX);srch.setHint("Search...");srch.setTextColor(M.t);srch.setHintTextColor(M.h);srch.setSingleLine(true);pad(srch,SB.pad[0],SB.pad[1],SB.pad[2],SB.pad[3]);srch.setTextSize(SB.ts);srch.setBackground(null);srch.setGravity(CEN);swrp.addView(srch,flp(MP,MP));
srow.addView(phb,lp(QB.sz,QB.sz));var slp=lpw(0,SB.h,1);slp.setMargins(SB.gap,0,SB.gap,0);srow.addView(swrp,slp);srow.addView(apb,lp(QB.sz,QB.sz));root.addView(srow,lp(MP,WC));
var spc=new V(CTX);var bw=1-LY.sw;if(bw>0)root.addView(spc,lpw(MP,0,bw));

var swY=0,swOn=false;
srow.setOnTouchListener(new V.OnTouchListener({onTouch:function(v,e){var a=e.getAction();if(a===0){swY=e.getY();swOn=true;return false;}if(a===2&&swOn){if(e.getY()-swY>100){swOn=false;sus();try{LL.runAction(43);}catch(err){}return true;}return false;}if(a===1||a===3){swOn=false;return false;}return false;}}));
root.setOnTouchListener(new V.OnTouchListener({onTouch:function(v,e){var a=e.getAction();if(a===0){swY=e.getY();swOn=true;return false;}if(a===2&&swOn){if(e.getY()-swY>120){swOn=false;sus();try{LL.runAction(43);}catch(err){}return true;}return false;}if(a===1||a===3){swOn=false;return false;}return false;}}));
srch.setOnTouchListener(new V.OnTouchListener({onTouch:function(v,e){if(e.getAction()===1){if(md!=="SEARCH")goSearch();else{srch.requestFocus();var im=CTX.getSystemService("input_method");if(im)im.showSoftInput(srch,1);}}return false;}}));

var sTmr=null,ndg=false,redS=new ForegroundColorSpan(C.RED);
function nd(){if(ndg)return;ndg=true;anim(swrp,ViewProperty.TRANSLATION_X,0,SP.nu[0],SP.nu[1],3500);H.postDelayed(new Runnable({run:function(){ndg=false;}}),300);}
srch.addTextChangedListener(new TextWatcher({beforeTextChanged:function(){},onTextChanged:function(){},afterTextChanged:function(s){var q=s.toString().toLowerCase().trim(),len=q.length;if(sTmr)H.removeCallbacks(sTmr);if(len===0){try{s.removeSpan(redS);}catch(e){}res.setVisibility(GON);deskS.setVisibility(VIS);if(md==="SEARCH")goHome();return;}if(md!=="SEARCH")goSearch();sTmr=new Runnable({run:function(){var mt=AppSearch(q,CFG.pool);if(mt.length>CFG.pool)mt.length=CFG.pool;deskS.setVisibility(GON);res.setVisibility(VIS);if(mt.length===0){nd();for(var i=0;i<CFG.pool;i++)pool[i].v.setVisibility(GON);return;}for(var i=0;i<CFG.pool;i++){var itm=pool[i];if(i<mt.length){(function(a,iv,icv,lbv,ix){iv.setVisibility(VIS);iv.setAlpha(0.85);iv.setTranslationY(20+ix*3);iv.setTag(a);icv.setImageDrawable(gIcon(a));lbv.setText(a.n);iv.postDelayed(new Runnable({run:function(){anim(iv,ViewProperty.ALPHA,1,SP.fi[0],SP.fi[1]);anim(iv,ViewProperty.TRANSLATION_Y,0,SP.si[0],SP.si[1]);}}),ix*25);})(mt[i],itm.v,itm.icon,itm.label,i);}else{itm.v.setVisibility(GON);}}}});H.postDelayed(sTmr,len===1?DB.l:len===2?DB.s:DB.vs);}}));

function ckVis(){if(bt){bt=false;}var r=new Rect();if(root.getGlobalVisibleRect(r)&&root.getWidth()>0&&(r.width()/root.getWidth())>0.8){if(!vis){vis=true;opn();}}else if(vis){vis=false;sus();}}
function opn(){goHome();srch.setText("");res.setVisibility(GON);deskS.setVisibility(VIS);if(!srch.hasFocus()){spd=false;root.setElevation(20);srch.setFocusable(true);srch.setFocusableInTouchMode(true);srch.requestFocus();var tr=0;var kr=new Runnable({run:function(){if(!srch.hasFocus())srch.requestFocus();if(srch.hasWindowFocus()){var im=CTX.getSystemService("input_method");if(im)im.showSoftInput(srch,1);}else if(tr++<15)srch.postDelayed(this,15);}});srch.postDelayed(kr,10);}}
function sus(){vis=false;root.setElevation(0);var im=CTX.getSystemService("input_method");if(im&&srch.hasWindowFocus())im.hideSoftInputFromWindow(srch.getWindowToken(),0);res.setVisibility(GON);srch.setText("");srch.setFocusable(false);srch.setFocusableInTouchMode(false);srch.clearFocus();}
root.addOnAttachStateChangeListener(new V.OnAttachStateChangeListener({onViewAttachedToWindow:function(v){root.post(new Runnable({run:ckVis}));},onViewDetachedFromWindow:function(v){}}));
root.getViewTreeObserver().addOnScrollChangedListener(new ViewTreeObserver.OnScrollChangedListener({onScrollChanged:function(){ckVis();}}));
root.getViewTreeObserver().addOnWindowFocusChangeListener(new ViewTreeObserver.OnWindowFocusChangeListener({onWindowFocusChanged:function(h){if(h)ckVis();}}));
srch.setOnFocusChangeListener(new V.OnFocusChangeListener({onFocusChange:function(v,h){if(!h&&!spd&&!bt&&md!=="DRAWER"){srch.postDelayed(new Runnable({run:function(){if(!srch.hasFocus()&&!spd)sus();}}),50);}}}));
if(fo())opn();
return root;
}catch(e){var er=new android.widget.TextView(LL.getContext());er.setText("L:"+e.lineNumber+" "+e.toString());er.setTextColor(android.graphics.Color.RED);return er;}
