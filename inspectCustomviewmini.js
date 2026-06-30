bindClass("android.widget.LinearLayout");
bindClass("android.widget.TextView");
bindClass("android.graphics.Color");

var ctx = LL.getContext();
var root = new LinearLayout(ctx);
root.setOrientation(1);

var t1 = new TextView(ctx);
t1.setText("Name: " + item.getName());
t1.setTextColor(Color.WHITE);
root.addView(t1);

var t2 = new TextView(ctx);
t2.setText("Label: " + item.getLabel());
t2.setTextColor(Color.WHITE);
root.addView(t2);

return root;