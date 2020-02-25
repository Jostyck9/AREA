var github = require('octonode');
const client = github.client("8171914f6d6159179ae2");

client.get('/user', {}, function (err, status, body, headers) {
    const repo = client.repo("Area");
    const result = await repo.prsAsync({ per_page: 100 });
  console.log(body); //json object
});

//async function getPullRequests (params) {
 /*   const client = github.client(params.githubAccessToken);

    const result = await repo.prsAsync({ per_page: 100 });
    return result[0];*/
  //}