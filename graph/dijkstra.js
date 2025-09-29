/****************************************************/
//https://github.com/tanso0126/PS-template
class PQ {
    constructor(cmp=(a,b)=>a<b) {
        this.q=[]
        this.cmp=cmp
    }
    size() {
        return this.q.length
    }
    empty() {
        return this.q.length==0
    }
    top() {
        return this.q[0]
    }
    push(x) {
        var a=this.q
        a.push(x)
        var i=a.length-1,temp
        while(i) {
            var p=(i-1)>>1
            if(!this.cmp(a[i],a[p])) break
            temp=a[i],a[i]=a[p],a[p]=temp
            i=p
        }
    }
    pop() {
        var a=this.q
        if(!a.length) return
        var d=a[0],x=a.pop()
        if(!a.length) return d
        a[0]=x
        var i=0,n=a.length,temp
        while(1){
            var l=2*i+1,r=l+1,b=i
            if(l<n&&this.cmp(a[l],a[b])) b=l
            if(r<n&&this.cmp(a[r],a[b])) b=r
            if(b==i) break
            temp=a[i],a[i]=a[b],a[b]=temp
            i=b
        }
        return d
    }
}

function dijkstra(n,a,s) {
    var d=new Array(n+1).fill(Infinity),g=new Array(n+1).fill(-1)
    var pq=new PQ((a,b)=>a[0]<b[0])
    d[s]=0
    pq.push([0,s])
    while(!pq.empty()) {
        var [di,u]=pq.pop()
        if(d[u]<di) continue
        for(var[v,w]of a[u]) {
            var nd=di+w
            if(nd<d[v]) {
                d[v]=nd
                g[v]=u
                pq.push([nd,v])
            }
        }
    }
    return {dist:d,from:g}
}

function path(to,f) {
    var p=[]
    while(to!=-1){
        p.push(to)
        to=f[to]
    }
    return p.reverse()
}
/****************************************************/