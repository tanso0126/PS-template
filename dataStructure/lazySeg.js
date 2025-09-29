/****************************************************/
//https://github.com/tanso0126/PS-template.git
class LazySeg {
    constructor(arr=[]) {
        this.clear(arr)
    }
    max(x,y) {
        return x>y?x:y
    }
    min(x,y) {
        return x<y?x:y
    }
    clear(arr=[]) {
        this.len=arr.length
        for(this.n=1;this.n<this.len;) this.n<<=1
        this.v=new Int32Array(this.n<<1)
        this.lz=new Int32Array(this.n<<1)
        for(var i=0;i<this.len;i++) this.v[i+this.n]=arr[i]
        for(var i=this.n-1;i;i--) this.up(i)
    }
    ap(i,x,s,e) {
        this.v[i]+=x*(e-s+1)
        //this.v[i]+=x
        this.lz[i]+=x
    }
    ps(i,s,e) {
        if(this.lz[i]&&i<this.n) {
            var m=s+e>>1,L=i<<1,R=L|1
            this.ap(L,this.lz[i],s,m)
            this.ap(R,this.lz[i],m+1,e)
            this.lz[i]=0
        }
    }
    up(i) {
        var L=i<<1,R=L|1
        this.v[i]=this.v[L]+this.v[R]
        //this.v[i]=this.max(this.v[L],this.v[R])
        //this.v[i]=this.min(this.v[L],this.v[R])
    }
    rangeQ(l,r,x,i=1,s=0,e=this.n-1) {
        if(r<s||e<l) return
        if(l<=s&&e<=r) return this.ap(i,x,s,e)
        this.ps(i,s,e)
        var m=s+e>>1
        this.rangeQ(l,r,x,i<<1,s,m)
        this.rangeQ(l,r,x,i<<1|1,m+1,e)
        this.up(i)
    }
    set(p,x,i=1,s=0,e=this.n-1) {
        if(s==e) {
            this.v[i]=x,this.lz[i]=0
            return
        }
        this.ps(i,s,e)
        var m=s+e>>1
        p<=m?this.set(p,x,i<<1,s,m):this.set(p,x,i<<1|1,m+1,e)
        this.up(i)
    }
    get(p,i=1,s=0,e=this.n-1) {
        if(s==e) return this.v[i]
        this.ps(i,s,e)
        var m=s+e>>1
        return p<=m?this.get(p,i<<1,s,m):this.get(p,i<<1|1,m+1,e)
    }
    Q(l,r,i=1,s=0,e=this.n-1) {
        if(r<s||e<l) return 0
        //if(r<s||e<l) return -Infinity
        //if(r<s||e<l) return Infinity
        if(l<=s&&e<=r) return this.v[i]
        this.ps(i,s,e)
        var m=s+e>>1
        var L=this.Q(l,r,i<<1,s,m),R=this.Q(l,r,i<<1|1,m+1,e)
        return L+R
        //return this.max(L,R)
        //return this.min(L,R)
    }
}
/****************************************************/