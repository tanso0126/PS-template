/****************************************************/
//https://github.com/tanso0126/PS-template.git
class SCC {
    constructor(n,cap=4) {
        this.n=n
        this.h=new Int32Array(n+1).fill(-1)
        this.t=new Int32Array(cap+1)
        this.nx=new Int32Array(cap+1)
        this.e=0
    }
    clear(n=this.n) {
        this.n=n
        this.h=new Int32Array(n+1).fill(-1)
        this.e=0
        this.cap=4
        this.t=new Int32Array(this.cap+1)
        this.nx=new Int32Array(this.cap+1)
    }
    add(u,v) {
        if(++this.e>this.t.length-1) this.grow()
        this.t[this.e]=v
        this.nx[this.e]=this.h[u]
        this.h[u]=this.e
    }
    grow() {
        var s=this.t.length<<1
        var a=new Int32Array(s),b=new Int32Array(s)
        a.set(this.t),b.set(this.nx)
        this.t=a,this.nx=b
    }
    solve() {
        var n=this.n
        var d=new Int32Array(n+1),l=new Int32Array(n+1),c=new Int32Array(n+1),s=new Uint8Array(n+1),stk=new Int32Array(n+1),fv=new Int32Array((n+1)<<1),fe=new Int32Array((n+1)<<1),fs=new Int8Array((n+1)<<1),fc=new Int32Array((n+1)<<1)
        var tp=0,tm=0,id=0,ft=0
        for(var i=1;i<=n;i++) {
            if(d[i]) continue
            fv[ft]=i;fe[ft]=this.h[i];fs[ft++]=0
            while(ft) {
                var j=ft-1,v=fv[j],st=fs[j],e=fe[j]
                if(!st) {
                    d[v]=l[v]=++tm;s[v]=1;stk[++tp]=v;fs[j]=1
                }else if(st==2) {
                    var u=fc[j]
                    if(l[v]>l[u]) l[v]=l[u]
                    fs[j]=1
                }
                var p=0
                for(;e!=-1;e=this.nx[e]) {
                    var u=this.t[e]
                    if(!d[u]) {
                        fe[j]=this.nx[e];fc[j]=u;fs[j]=2;fv[ft]=u;fe[ft]=this.h[u];fs[ft++]=0;p=1;break
                    }else if(s[u] && l[v]>d[u]) l[v]=d[u]
                }
                if(p) continue
                if(l[v]==d[v]) {
                    id++
                    while(1) {
                        var u=stk[tp--]
                        s[u]=0;c[u]=id
                        if(u==v) break
                    }
                }
                ft--
            }
        }
        return {c:id,v:c}
    }
}

class SAT2 { //js7777 SET
    constructor(n) {
        this.n=n
        this.scc=new SCC(n*2)
    }
    var(x) {
        return x>0?x:-x+this.n
    }
    not(x) {
        return x>this.n?x-this.n:x+this.n
    }
    clear(n=this.n) {
        this.n=n
        this.scc.clear(n*2)
    }
    add(a,b) {
        var A=this.var(a),B=this.var(b)
        this.scc.add(this.not(A),B)
        this.scc.add(this.not(B),A)
    }
    make1(x) {this.add(x,x)}
    make0(x) {this.add(-x,-x)}
    m(x,y) {this.add(-x,y)}
    s(x,y) {this.add(-x,y);this.add(-y,x)}
    xor(x,y) {this.add(x,y);this.add(-x,-y)}
    solve() {
        var v=this.scc.solve().v
        for(var i=1;i<=this.n;i++) {
            if(v[i]==v[i+this.n]) return {ok:0}
        }
        var dab = Array.from({length:this.n},(q,i)=>+(v[i+1]<v[i+1+this.n]))
        return {ok:1,dab:dab}
    }
}
/****************************************************/