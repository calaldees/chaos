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
])

export function all(iterable) {
    for (let i of iterable) {
        if (!i) {return false}
    }
    return true
}
assertEquals([
    [ all([true, true]) , true],
    [ all([true, false]) , false],
    [ all([true, 'bob', 1]) , true],
])


export function* zip(...iterables) {
    const iterators = [...iterables].map(iterable => iterable[Symbol.iterator]())
    while (true) {
        const iterable_items = iterators.map(iterator => iterator.next())
        if (all(iterable_items.map(i => i.done))) {break}
        yield iterable_items.map(i => i.value)
    }
}
assertEqualsObject([
    [ [...zip(['a','b'],['c','d'])], [['a','c'],['b','d']] ],
    [ [...zip(['a','b'],['c','d'],['e','f'])], [['a','c','e'],['b','d','f']] ],
    [ [...zip(['a','b'],['c'])], [['a','c'],['b',null]] ],
])

// correct modulo operator
// https://stackoverflow.com/a/17323608
export function mod(n, m) {
    return ((n % m) + m) % m;
}
assertEquals([
    [-13 % 64, -13],
    [mod(-13, 64), 51],
]);


// https://stackoverflow.com/a/37319954/3356840
export function filterInPlace(a, condition, thisArg) {
    let j = 0;
    a.forEach((e, i) => {
        if (condition.call(thisArg, e, i, a)) {
            if (i!==j) a[j] = e;
            j++;
        }
    });
    a.length = j;
    return a;
}
assertEqualsObject([
    [ filterInPlace([1,2,3,4,5], (i)=>i%2), [1,3,5] ],
]);



export class Dimension {
    constructor(width, height, depth=1) {
        this.dimensions = [width, height, depth]
    }

    get width() {return this.dimensions[0]}
    get height() {return this.dimensions[1]}
    get depth() {return this.dimensions[2]}
    get size() {return this.dimensions.reduce((prev, current) => prev * current)}

    normalise_position(x,y,z) {
        return [mod(x, this.width), mod(y, this.height), mod(z, this.depth)]
    }

    index_to_position(i) {
        return [
            mod(i, this.width),
            mod(Math.floor(i/this.width), this.height),
            Math.floor(i/(this.width * this.height)),
        ]
    }

    position_to_index(x,y,z) {
        const [_x,_y,_z] = this.normalise_position(x,y,z)
        return (this.width * this.height * _z) + (this.width * _y) + _x
    }
}
assertEqualsObject([
    [(new Dimension(3, 3, 3)).normalise_position(0,0,0), [0,0,0]],
    [(new Dimension(3, 3, 3)).normalise_position(-1,-1,-1), [2,2,2]],

    // index_to_position
    [(new Dimension(8, 8, 3)).index_to_position(0), [0,0,0]],
    [(new Dimension(8, 8, 3)).index_to_position(7), [7,0,0]],
    [(new Dimension(8, 8, 3)).index_to_position(8), [0,1,0]],
    [(new Dimension(8, 8, 3)).index_to_position(64), [0,0,1]],
    [(new Dimension(8, 8, 3)).index_to_position(73), [1,1,1]],
    [(new Dimension(8, 8, 3)).index_to_position(146), [2,2,2]],
    [(new Dimension(4, 8, 2)).index_to_position(46), [2,3,1]],
    [(new Dimension(4, 8, 2)).index_to_position(63), [3,7,1]],
    // position_to_index (inverse of index_to_position)
    [(new Dimension(8, 8, 3)).position_to_index(0,0,0), 0],
    [(new Dimension(8, 8, 3)).position_to_index(7,0,0), 7],
    [(new Dimension(8, 8, 3)).position_to_index(0,1,0), 8],
    [(new Dimension(8, 8, 3)).position_to_index(0,0,1), 64],
    [(new Dimension(8, 8, 3)).position_to_index(1,1,1), 73],
    [(new Dimension(8, 8, 3)).position_to_index(2,2,2), 146],
    [(new Dimension(4, 8, 2)).position_to_index(2,3,1), 46],
    [(new Dimension(4, 8, 2)).position_to_index(3,7,1), 63],
    // wrap edges
    // 0 1 2   9 10 11  18 19 20
    // 3 4 5  12 13 14  21 22 23
    // 6 7 8  15 16 17  24 25 26
    [(new Dimension(3, 3, 3)).position_to_index(-1,0,0), 2],
    [(new Dimension(3, 3, 3)).position_to_index(-2,0,0), 1],
    [(new Dimension(3, 3, 3)).position_to_index(-3,0,0), 0],
    [(new Dimension(3, 3, 3)).position_to_index(-4,0,0), 2],
    [(new Dimension(3, 3, 3)).position_to_index(0,-1,0), 6],
    [(new Dimension(3, 3, 3)).position_to_index(-1,-1,0), 8],
    [(new Dimension(3, 3, 3)).position_to_index(0,0,-1), 18],
    [(new Dimension(3, 3, 3)).position_to_index(-1,-1,-1), 26],
    [(new Dimension(3, 3, 3)).position_to_index(-2,-2,-2), 13],
    [(new Dimension(3, 3, 3)).position_to_index(1,1,1), 13],
    [(new Dimension(3, 3, 3)).position_to_index(3,3,0), 0],
]);
