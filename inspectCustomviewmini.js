bindClass("android.widget.FrameLayout");bindClass("android.widget.LinearLayout");bindClass("android.widget.TextView");bindClass("android.widget.ScrollView");bindClass("android.graphics.Color");bindClass("android.view.Gravity");bindClass("android.view.View");

var ctx=LL.getContext();
var root=new LinearLayout(ctx);root.setOrientation(1);root.setPadding(10,10,10,10);

function add(label,val){
    var r=new LinearLayout(ctx);r.setPadding(0,1,0,1);
    var l=new TextView(ctx);l.setText(label+": ");l.setTextColor(Color.WHITE);l.setTextSize(9);
    var v=new TextView(ctx);v.setText(val===null?"null":val===undefined?"undefined":String(val));v.setTextColor(Color.parseColor("#FF00FF00"));v.setTextSize(9);
    r.addView(l);r.addView(v);root.addView(r);
}

var d=item;

add("toString",""+d);
add("getLabel",d.getLabel());
add("getName",d.getName());
add("getTag()",d.getTag());
add("getTag(label)",d.getTag("label"));
add("getTag(name)",d.getTag("name"));

return root;