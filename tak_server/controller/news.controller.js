const { getNewsData, saveNewsData } = require('../utils/utils')

//! Add News Feed Controller
exports.newsAddController = (req, res) => {
  try {
    const allNews = getNewsData()
    const { headline, category, author } = req.body
    if (!headline || !category || !author || !req.file) {
      return res
        .status(401)
        .send({ success: false, msg: 'Please enter required fields !' })
    } else {
      const newsData = {
        headline,
        category,
        author,
        createdAt: Date.now(),
        imagePath: req.file.path,
      }
      allNews.push(newsData)
      //save the new user data
      saveNewsData(allNews)
      return res.send({ success: true, msg: 'News data added successfully' })
    }
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, msg: 'There are some error' + e })
  }
}
//! List News Feed Controller( With Search )
exports.newsListController = (req, res) => {
  try {
    //get the username from url
    const query = req.query.query
    let allNewsData = getNewsData()
    if (query) {
      allNewsData = allNewsData.filter((item) => {
        return (
          item.author.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        )
      })
    }
    return res.send({
      success: true,
      msg: 'News data fetched successfully',
      data: allNewsData,
    })
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, msg: 'There are some error' + error })
  }
}
