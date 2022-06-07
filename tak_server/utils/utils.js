const fs = require('fs')
/* util functions */
//read the user data from json file
const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync('./utils/users.json', stringifyData)
}
//get the user data from json file
const getUsersData = () => {
  const jsonData = fs.readFileSync('./utils/users.json')
  return JSON.parse(jsonData)
}

//read the news data from json file
const saveNewsData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync('./utils/news.json', stringifyData)
}
//get the news data from json file
const getNewsData = () => {
  const jsonData = fs.readFileSync('./utils/news.json')
  return JSON.parse(jsonData)
}
/* util functions ends */

module.exports = {
  saveUserData,
  getUsersData,
  saveNewsData,
  getNewsData,
}
