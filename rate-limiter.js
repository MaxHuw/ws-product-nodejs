let leakRate = setInterval(leakBucket, 5000); //how often to drain the 'buckets'
let bucketLimit = 10; //limit at which a user will no longer be able to make any more api calls.

let usersBuckets = {
}

function leakBucket(){

  for (let bucket in usersBuckets){
    if (usersBuckets[bucket] > 0){
      usersBuckets[bucket] -= 1;
    }
  }
}

let checkBucket = function (req, res, next) {

  let ip = req.connection.remoteAddress

  if (usersBuckets[ip] && usersBuckets[ip] < bucketLimit){
    usersBuckets[ip] ++
    return next();
  } else if (usersBuckets[ip] && usersBuckets[ip] === bucketLimit){
    return res.status(500).json({error: 'Rate Limit Exceeded'});
  } else {
    usersBuckets[ip] = 1;
    return next();
  }

}

module.exports = {checkBucket};