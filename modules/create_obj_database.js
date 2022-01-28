import db from '../index.js'

const createObjDatabase = (data, arr) => {
  let postID
  if (arr.length) {
    postID = +arr[arr.length-1].id + 1
  } else {
    postID = 1
  }
  const postObj = {
    id: postID,
    ...data
  }
  db.posts.push(postObj)
}

export default createObjDatabase