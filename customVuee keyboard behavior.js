try {
    bindClass("android.widget.FrameLayout");
    bindClass("android.widget.LinearLayout");
    bindClass("android.widget.EditText");
    bindClass("android.graphics.Color");
    bindClass("android.graphics.drawable.GradientDrawable");
    bindClass("android.view.Gravity");
    bindClass("android.view.View");
    bindClass("android.view.WindowInsets");

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
    searchBox.setHint("WindowInsets Sync...");
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

    // --- SCRIPT 2: WINDOW INSETS METHOD ---
    root.setOnApplyWindowInsetsListener(new View.OnApplyWindowInsetsListener({
        onApplyWindowInsets: function(v, insets) {
            var kbHeight = 0;
            try {
                // Try modern Android 11+ API
                var Type = android.view.WindowInsets.Type;
                var ime = insets.getInsets(Type.ime());
                var nav = insets.getInsets(Type.navigationBars());
                kbHeight = Math.max(0, ime.bottom - nav.bottom);
            } catch(e) {
                // Fallback for Rhino JS or older Android versions
                var sysBottom = insets.getSystemWindowInsetBottom();
                var stableBottom = insets.getStableInsetBottom();
                kbHeight = Math.max(0, sysBottom - stableBottom);
            }
            
            // Apply the offset directly
            searchContainer.setTranslationY(-kbHeight);
            
            // Pass the insets down the view tree so LL doesn't break
            return insets;
        }
    }));
    
    // Request initial insets to trigger the listener
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
    err.setText("Err 2: " + e.toString());
    err.setTextColor(android.graphics.Color.RED);
    return err;
}
