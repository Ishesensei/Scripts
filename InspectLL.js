(function(){

var out="";

function w(s){
    out+=s+"\n";
}

function cls(o){
    try{
        return o.getClass();
    }catch(e){
        return null;
    }
}

function cname(o){
    try{
        if(o==null) return "null";
        return o.getClass().getName();
    }catch(e){
        return String(o);
    }
}

function inspect(obj){

    var c=cls(obj);

    if(c==null){
        w("Not a Java object");
        return;
    }

    var level=0;

    while(c){

        w("==================================================");
        w("LEVEL "+level);
        w("Class : "+c.getName());

        try{
            w("Superclass : "+(c.getSuperclass()?c.getSuperclass().getName():"null"));
        }catch(e){}

        try{
            w("Modifiers : "+java.lang.reflect.Modifier.toString(c.getModifiers()));
        }catch(e){}

        //---------------- Interfaces ----------------

        try{

            var is=c.getInterfaces();

            w("\nInterfaces ("+is.length+")");

            for(var i=0;i<is.length;i++)
                w("  + "+is[i].getName());

        }catch(e){}

        //---------------- Constructors ----------------

        try{

            var ct=c.getDeclaredConstructors();

            w("\nConstructors ("+ct.length+")");

            for(var i=0;i<ct.length;i++)
                w("  + "+ct[i].toGenericString());

        }catch(e){}

        //---------------- Fields ----------------

        try{

            var fs=c.getDeclaredFields();

            w("\nFields ("+fs.length+")");

            for(var i=0;i<fs.length;i++){

                try{

                    fs[i].setAccessible(true);

                    var v=fs[i].get(obj);

                    w(
                        "  + "+
                        java.lang.reflect.Modifier.toString(fs[i].getModifiers())+
                        " "+
                        fs[i].getType().getSimpleName()+
                        " "+
                        fs[i].getName()+
                        " = "+
                        cname(v)
                    );

                }catch(ex){

                    w("  + "+fs[i].getName());

                }

            }

        }catch(e){}

        //---------------- Methods ----------------

        try{

            var ms=c.getDeclaredMethods();

            w("\nMethods ("+ms.length+")");

            for(var i=0;i<ms.length;i++){

                try{

                    ms[i].setAccessible(true);

                    w("  + "+ms[i].toGenericString());

                }catch(ex){}

            }

        }catch(e){}

        c=c.getSuperclass();
        level++;

    }

}

function getField(obj,name){

    var c=obj.getClass();

    while(c){

        try{

            var f=c.getDeclaredField(name);

            f.setAccessible(true);

            return f.get(obj);

        }catch(e){}

        c=c.getSuperclass();

    }

    return null;

}

//==================================================
// CHANGE THIS OBJECT
//==================================================

// Examples:
//
// inspect(engine);
// inspect(getFloatingScreen());
// inspect(getCurrentScript());

inspect(engine);

// Example:
// var ws=getField(getField(getFloatingScreen(),"mScreen"),"this$0");
// inspect(ws);

Tc(out,1,1);

})();