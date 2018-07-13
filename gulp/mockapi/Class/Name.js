// Description
// 傳入
// data: { prop: 傳述參數 }
module.exports = function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(
    {
      'data_1': 'data 1 content',
      'data_2': 'data 2 content'
    }
  ))
}
