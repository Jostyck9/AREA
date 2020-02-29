require('dotenv').config();
var graph = require('@microsoft/microsoft-graph-client');

let parms = { title: 'Inbox', active: { inbox: true } };

const accessToken = await authHelper.getAccessToken(req.cookies, res);
const userName = req.cookies.graph_user_name;

if (accessToken && userName) {
  parms.user = userName;

  // Initialize Graph client
  const client = graph.Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    }
  });
    // Get the 10 newest messages from inbox
    const result = await client
    .api('/me/mailfolders/inbox/messages')
    .top(10)
    .select('subject,from,receivedDateTime,isRead')
    .orderby('receivedDateTime DESC')
    .get();

    parms.debug = `Graph request returned: ${JSON.stringify(result, null, 2)}`;
}
