function binarySearch(v,x) { //js7777 SET
    var l=0,r=v.length-1
    while(l<=r) {
        var m=(l+r)>>1
        if(v[m]>x) r=m-1
        else if(v[m]<x) l=m+1
        else return m
    }
    return -1
}