var github = require('octonode');

/*
client.get('/user', {}, function (err, status, body, headers) {
  console.log(body); //json object
}); */

//async function getPullRequests (params) {
    const client = github.client(params.githubAccessToken);
    const repo = client.repo("Area");

    const result = await repo.prsAsync({ per_page: 100 });
    return result[0];
  //}