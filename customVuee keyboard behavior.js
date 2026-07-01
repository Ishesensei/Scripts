try {
    bindClass("android.widget.FrameLayout");
    bindClass("android.widget.LinearLayout");
    bindClass("android.widget.EditText");
    bindClass("android.graphics.Color");
    bindClass("android.graphics.drawable.GradientDrawable");
    bindClass("android.view.Gravity");
    bindClass("android.view.View");
    bindClass("android.view.WindowInsets");
    bindClass("android.graphics.Rect"); // Added for absolute positioning

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

    // --- THE "EXACT OVERLAP" FIX ---
    root.setOnApplyWindowInsetsListener(new View.OnApplyWindowInsetsListener({
        onApplyWindowInsets: function(v, insets) {
            var imeHeight = 0;
            try {
                // Get raw keyboard height from absolute bottom of screen
                imeHeight = insets.getInsets(android.view.WindowInsets.Type.ime()).bottom;
            } catch(e) {
                imeHeight = insets.getSystemWindowInsetBottom();
            }
            
            // Get the total absolute screen height
            var screenHeight = root.getRootView().getHeight();
            
            // Calculate exactly where the top edge of the keyboard is on the screen
            var keyboardTop = screenHeight - imeHeight;
            
            // Get exactly where the bottom of our Custom View is on the screen
            var r = new Rect();
            root.getGlobalVisibleRect(r);
            
            // How much does the keyboard physically overlap our specific view?
            var overlap = r.bottom - keyboardTop;

            // If overlap is positive, the keyboard is covering us. Push up exactly that much.
            var targetOffset = overlap > 0 ? -overlap : 0;
            
            searchContainer.setTranslationY(targetOffset);
            
            return insets;
        }
    }));
    
    // Request initial insets to trigger the listener immediately
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
    err.setText("Err 3: " + e.toString());
    err.setTextColor(android.graphics.Color.RED);
    return err;
}
