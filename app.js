const {deturminIfFilesAreNeeded} = require('./functions/stateGetterFunctions')
const {getData} = require ('./dataGetterMultiple.js')
const {inputData} = require('./monday.js')


async function main() {
  await getData().then((data) => inputData(data))
  // do you set a variable inside the fucntion
  // do you add a thing to the json
  // do you create a variable on this page
}

deturminIfFilesAreNeeded()
main()
