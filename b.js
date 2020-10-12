let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let res = [1, 9, 4]
for (var a in res) {
    arr.splice(res[a], 1)
    for (var c = a - 1 in res) {
        res[c]--
    }
}
console.log(arr)
console.log(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)
1602415958652
1605008006021