const { getUsersData, saveUserData } = require('../utils/utils')
exports.userAddController = (req, res) => {
  const existUsers = getUsersData()
  const userData = req.body
  //check if the userData fields are missing
  if (
    userData.email == null ||
    userData.username == null ||
    userData.password == null
  ) {
    return res.status(401).send({ error: true, msg: 'User data missing' })
  }
  let sendData = {
    ...userData,
    pictures: req.file.path,
  }
  //append the user data
  existUsers.push(sendData)
  //save the new user data
  saveUserData(existUsers)
  res.send({ success: true, msg: 'User data added successfully' })
}

exports.userUpdateController = (req, res) => {
  //get the update data
  const userData = req.body
  //get the existing user data
  const existUsers = getUsersData()
  //check if the userData fields are missing
  if (
    userData.email == null ||
    userData.username == null ||
    userData.password == null
  ) {
    return res.status(401).send({ error: true, msg: 'User data missing' })
  }
  //filter the userdata
  const updateUser = existUsers.filter((user) => user.id != userData.id)

  //push the updated data
  let sendData = {
    ...userData,
    pictures: existUsers[0].pictures,
  }
  updateUser.push(sendData)
  //finally save it
  saveUserData(updateUser)
  res.send({ success: true, msg: 'User data updated successfully' })
}

exports.userListController = (req, res) => {
  const users = getUsersData()
  res.send({
    success: true,
    msg: 'User found successfully',
    data: users.length ? users[0] : null,
  })
}
