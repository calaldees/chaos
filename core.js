export function assertEquals(comparison_tuples) {
    for (let [a, b] of comparison_tuples) {
        //console.debug(a, b)
        if (! (a==b)) {throw `${a} should-equal ${b}`}
        //console.assert(a == b, `${a} should-equal ${b}`)  // this does nothing! It prints nothing .. I don't know why
    }
}
export function assertEqualsObject(comparison_tuples) {
    return assertEquals(comparison_tuples.map(v => v.map(JSON.stringify)))
}

export function isObject(obj) {
    return obj != null && obj.constructor.name === "Object";
}

// https://stackoverflow.com/a/40953718/3356840
export function clearObject(obj) {
    for (let key in obj) {
        delete obj[key];
    }
}

export function* range(target, start=0, step=1) {
    for (let i=start ; i<target ; i+=step) {yield i;}
}
assertEqualsObject([
    [ [...range(3)], [0,1,2] ],
]);

export function* enumerate(iterable) {
    let count = 0;
    for (let item of iterable) {
        //yield (item[Symbol.iterator]) ? [count++, ...item] : [count++, item];
        yield [count++, item];
    }
}
assertEqualsObject([
    [ [...enumerate(['a','b','c'])], [[0,'a'],[1, 'b'],[2,'c']] ],
    [ [...enumerate([['a','a'],['b','b'],['c','c']])], [[0,['a','a']],[1,['b','b']],[2,['c','c']]] ],
]);
