try{

bindClass("android.os.Handler");
bindClass("java.lang.Runnable");

var o="";

var fs=getFloatingScreen(),f=fs.getClass().getDeclaredField("mScreen");
f.setAccessible(true);
var ws=f.get(fs);

f=ws.getClass().getDeclaredField("this$0");
f.setAccessible(true);
var svc=f.get(ws);

var c=svc.getClass();

function G(n){
 var x=c.getDeclaredField(n);
 x.setAccessible(true);
 return x.get(svc);
}

var pos=G("mOverlayShowHandlePosition");
var w=G("mWorkspaceView");

var m=c.getDeclaredMethod(
 "showWorkspace",
 pos.getClass(),
 java.lang.Boolean.TYPE,
 java.lang.Long.TYPE
);
m.setAccessible(true);
m.invoke(svc,[pos,java.lang.Boolean.TRUE,new java.lang.Long("40")]);

new Handler().postDelayed(new Runnable({
run:function(){

o+="Before TY="+w.getTranslationY()+"\n";

w.animate().cancel();
w.setTranslationY(0);

o+="After TY="+w.getTranslationY();

Tc(o);

}
}),1000);

}catch(e){
Tc(e+"\nL:"+e.lineNumber);
}