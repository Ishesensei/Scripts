// ===== Lightning Launcher Runtime =====

// Rhino Language Version : <unavailable>
// Optimization Level : <unavailable>

// ===== Java =====
// Java Version : 0
// VM Name : Dalvik
// VM Vendor : The Android Project
// VM Version : 2.1.0

// ===== Android =====
// SDK : 36
// Release : 16
// Codename : REL
// Brand : POCO
// Manufacturer : Xiaomi
// Device : onyx
// Model : 25053PC47I
// Hardware : qcom
// Fingerprint : POCO/onyx_in/onyx:16/BP2A.250605.031.A3/OS3.0.301.0.WOLINXM:user/release-keys

// ===== Lightning Launcher =====
// LL Class : net.pierrox.lightning_launcher.script.api.LL
// FloatingScreen : net.pierrox.lightning_launcher.script.api.screen.Screen
// Event : net.pierrox.lightning_launcher.script.api.Event
var out = "===== Lightning Launcher Runtime =====\n\n";

try {
    bindClass("org.mozilla.javascript.Context");
    out += "Rhino Language Version : " +
        Context.getCurrentContext().getLanguageVersion() + "\n";
} catch(e) {
    out += "Rhino Language Version : <unavailable>\n";
}

try {
    out += "Optimization Level : " +
        Context.getCurrentContext().getOptimizationLevel() + "\n";
} catch(e) {
    out += "Optimization Level : <unavailable>\n";
}

try {
    out += "Generating Debug : " +
        Context.getCurrentContext().isGeneratingDebug() + "\n";
} catch(e) {}

try {
    out += "Generating Source : " +
        Context.getCurrentContext().isGeneratingSource() + "\n";
} catch(e) {}

try {
    out += "Instruction Threshold : " +
        Context.getCurrentContext().getInstructionObserverThreshold() + "\n";
} catch(e) {}

out += "\n===== Java =====\n";

try {
    out += "Java Version : " + java.lang.System.getProperty("java.version") + "\n";
    out += "VM Name : " + java.lang.System.getProperty("java.vm.name") + "\n";
    out += "VM Vendor : " + java.lang.System.getProperty("java.vm.vendor") + "\n";
    out += "VM Version : " + java.lang.System.getProperty("java.vm.version") + "\n";
} catch(e) {}

out += "\n===== Android =====\n";

try {
    bindClass("android.os.Build");

    out += "SDK : " + Build.VERSION.SDK_INT + "\n";
    out += "Release : " + Build.VERSION.RELEASE + "\n";
    out += "Codename : " + Build.VERSION.CODENAME + "\n";
    out += "Brand : " + Build.BRAND + "\n";
    out += "Manufacturer : " + Build.MANUFACTURER + "\n";
    out += "Device : " + Build.DEVICE + "\n";
    out += "Model : " + Build.MODEL + "\n";
    out += "Hardware : " + Build.HARDWARE + "\n";
    out += "Fingerprint : " + Build.FINGERPRINT + "\n";
} catch(e) {}

out += "\n===== Lightning Launcher =====\n";

try {
    out += "LL Class : " + LL.getClass().getName() + "\n";
} catch(e) {}

try {
    var fs = getFloatingScreen();
    out += "FloatingScreen : " + fs.getClass().getName() + "\n";
} catch(e) {}

try {
    var ev = getEvent();
    out += "Event : " + ev.getClass().getName() + "\n";
} catch(e) {}

Tc(out,1,1);