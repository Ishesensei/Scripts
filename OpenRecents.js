var Runtime = java.lang.Runtime;
Runtime.getRuntime().exec([
    "sh",
    "-c",
    "am start -n com.mi.android.globallauncher/com.miui.home.recents.RecentsActivity"
]);