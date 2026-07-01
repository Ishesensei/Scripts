try {
    bindClass("android.widget.FrameLayout");
    bindClass("android.widget.LinearLayout");
    bindClass("android.widget.EditText");
    bindClass("android.graphics.Color");
    bindClass("android.graphics.drawable.GradientDrawable");
    bindClass("android.view.Gravity");
    bindClass("android.view.View");
    bindClass("android.view.WindowInsets");
    bindClass("android.graphics.Rect");

    var ctx = LL.getContext();
    var root = new FrameLayout(ctx);
    root.setLayoutParams(new FrameLayout.LayoutParams(-1, -1));
    
    var searchContainer = new LinearLayout(ctx);
    searchContainer.setOrientation(0);
    searchContainer.setGravity(Gravity.CENTER_VERTICAL);
    searchContainer.setPadding(40, 20, 40, 20);
    
    var bg = new GradientDrawable();
    bg.setColor(Color.parseColor("#44000000"));
    searchContainer.setBackground(bg);

    var searchBox = new EditText(ctx);
    searchBox.setHint("Absolute Position Sync...");
    searchBox.setTextColor(Color.WHITE);
    searchBox.setHintTextColor(Color.parseColor("#88FFFFFF"));
    searchBox.setSingleLine(true);
    searchBox.setPadding(50, 40, 50, 40);
    searchBox.setTextSize(16);
    
    var pillGd = new GradientDrawable();
    pillGd.setColor(Color.parseColor("#33FFFFFF"));
    pillGd.setCornerRadius(100);
    pillGd.setStroke(3, Color.parseColor("#55FFFFFF"));
    searchBox.setBackground(pillGd);
    try { searchBox.setTextCursorDrawable(0); } catch(e) {}

    searchContainer.addView(searchBox, new LinearLayout.LayoutParams(-1, -2));
    root.addView(searchContainer, new FrameLayout.LayoutParams(-1, -2, Gravity.BOTTOM));

    root.setOnApplyWindowInsetsListener(new View.OnApplyWindowInsetsListener({
        onApplyWindowInsets: function(v, insets) {
            var imeHeight = insets.getInsets(android.view.WindowInsets.Type.ime()).bottom || insets.getSystemWindowInsetBottom();
            var screenHeight = root.getRootView().getHeight();
            var keyboardTop = screenHeight - imeHeight;
            var r = new Rect();
            root.getGlobalVisibleRect(r);
            var overlap = r.bottom - keyboardTop;
            var targetOffset = overlap > 0 ? -(overlap + searchBox.getHeight() + 20) : 0;
            searchContainer.setTranslationY(targetOffset);
            return insets;
        }
    }));
    
    root.requestApplyInsets();

    root.setOnClickListener(new View.OnClickListener({
        onClick: function(v) {
            searchBox.clearFocus();
            var imm = ctx.getSystemService("input_method");
            if (imm) imm.hideSoftInputFromWindow(searchBox.getWindowToken(), 0);
        }
    }));

    return root;

} catch (e) {
    var err = new android.widget.TextView(LL.getContext());
    err.setText("Err: " + e.toString());
    err.setTextColor(android.graphics.Color.RED);
    return err;
}