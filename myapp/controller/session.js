class Session{
    constructor(){
        this.sessionTable={};
    }
    randomSID() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var sid = '';
    for (var i = 0; i < 30; i++)
        sid += chars.charAt(Math.floor(Math.random() * chars.length));
    return sid;
    }
    getSession(sid){
        if(sid in this.sessionTable)
            return true;
    }
    setSession(userEmail){
        const sid=this.randomSID();
        this.sessionTable[sid]=userEmail;
        return sid;
    }
    deleteSession(sid){
        delete this.sessionTable[sid];
    }
}

module.exports=new Session();