# random-val

# Install

```
npm i -S random-val
```

# Usage

```javascript
import RandomVal from 'random-val';

// Create a random-val instance
const serverList = new RandomVal();
serverList.add('http://xxx.xx.com');
serverList.add('http://xxy.xx.com');

// Getting a random value
serverList.getVal(); // http://xxx.xx.com
```