# Easy Guid Generator

Generates a guid/multiple guids
This package includes a types file for typescript projects


## Installation

```javascript

npm install easy-guid-generator

```

##  Usage

```javascript
var easyGuidGenerator = require('easy-guid-generator');

var guidWithBrackets = easyGuidGenerator.generateGuid(true)
var guidWithoutBrackets = easyGuidGenerator.generateGuid(false)
var guidNiceTry = easyGuidGenerator.generateGuid('true')
var emptyGuid = easyGuidGenerator.emptyGuid()
```


## Output
```
console.log(guidWithBrackets) // "{EE151A55-51EE-0641-3999-15B5E6CC18F4}"
console.log(guidWithoutBrackets) // "301EEF86-FA8B-9E03-94E6-D2F7C81286C0"
console.log(guidNiceTry) // "E3819D76-7F93-71AE-9528-E02B83C402DB"
console.log(emptyGuid) // "00000000-0000-0000-0000-000000000000"
```

### Future realease

I plan to have some functionality that allows you to generate multiple guids at a time