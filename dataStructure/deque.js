/****************************************************/
//https://github.com/tanso0126/PS-template.git
class DQ {
    constructor(cap=1e5) {
        this.cap=cap
        this.q=new Array(cap)
        this.f=0,this.b=0,this.s=0
    }
    clear(cap=this.cap) {
        this.cap=cap
        this.q=new Array(cap)
        this.f=this.b=this.s=0
    }
    size() {
        return this.s
    }
    empty() {
        return this.s==0
    }
    grow() {
        var n=this.cap<<1,a=new Array(n)
        for(var i=0;i<this.s;i++) a[i]=this.q[(this.f+i)%this.cap]
        this.q=a,this.f=0,this.b=this.s,this.cap=n
    }
    pushB(x) {
        if(this.s==this.cap) this.grow()
        this.q[this.b]=x
        this.b=(this.b+1)%this.cap
        this.s++
    }
    pushF(x) {
        if(this.s==this.cap) this.grow()
        this.f=(this.f-1+this.cap)%this.cap
        this.q[this.f]=x
        this.s++
    }
    popF() {
        if(this.s==0) return undefined
        var x=this.q[this.f]
        this.f=(this.f+1)%this.cap
        this.s--
        return x
    }
    popB() {
        if(this.s==0) return undefined
        this.b=(this.b-1+this.cap)%this.cap
        var x=this.q[this.b]
        this.s--
        return x
    }
    F() {
        if(this.s==0) return undefined
        return this.q[this.f]
    }
    B() {
        if(this.s==0) return undefined
        return this.q[(this.b-1+this.cap)%this.cap]
    }
    get(i) {
        if(i<0||i>=this.s) return undefined
        return this.q[(this.f+i)%this.cap]
    }
}
/****************************************************/