/****************************************************/
//https://github.com/tanso0126/PS-template
class UF {
    constructor(n) {
        this.p=new Array(n+1)
        for(var i=0;i<=n;i++) this.p[i]=i
    }
    find(x) {
        return this.p[x]==x?x:this.p[x]=this.find(this.p[x])
    }
    union(x,y) {
        x=this.find(x)
        y=this.find(y)
        if (x==y) return 0
        this.p[y]=x
        return 1
    }
    isUnion(x,y) {
        return this.find(x)==this.find(y)
    }
}
/****************************************************/