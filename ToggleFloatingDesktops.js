imp("TFloating");

try{
    var i=getEvent().getData(),
        c=getConfiguration();

    if(!i){
        if(TFloating()) LL.runAction(43);
    }else if(TFloating() && c.getFloatingDesktopId()==i){
        LL.runAction(43);
    }else{
        c.setFloatingDesktopId(parseInt(i,10));
        try{getFloatingScreen().getCurrentDesktop().setPosition(0,0,1,false);}catch(e){}
        LL.runAction(42);
    }
}catch(e){}