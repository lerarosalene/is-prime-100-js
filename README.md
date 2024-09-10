## is-prime-100-js: JS Port Of A Revolutionary O(1) Algorithm for Prime Detection

Read more in-depth information in [original Python repository](https://github.com/mawerty/is-prime-100)

### API

```ts
import isPrime from "is-prime-100";

console.log(isPrime(1)); // false
console.log(isPrime(2n)); // true, and also works with BigInt's!
// ...
console.log(isPrime(121)); // false
console.log(isPrime(503)); // true
```

Sadly, current implementation can't handle numbers bigger than 500_000. Our team of scientists is working on that.
