// import all the relevent functions from data getter
const {sanitisor} = require('./dataGetter.js');

async function returnData() {
  let data = await sanitisor();
  console.log(data)
  return data
}

returnData()
// create a cookie file for monday

// open monday with the correct cookies

// run the data getter function to bring the data to monday function

// create the logic for
