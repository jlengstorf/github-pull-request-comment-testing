const { App } = require('@octokit/app');
const { request } = require('@octokit/request');

const privateKey = process.env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n');

exports.handler = async () => {
  const app = new App({
    id: process.env.GITHUB_APP_ID,
    privateKey,
  });

  const token = await app.getInstallationAccessToken({
    installationId: 11773325,
  });

  await request('POST /repos/:owner/:repo/issues/:issue_number/comments', {
    owner: 'jlengstorf',
    repo: 'github-pull-request-comment-testing',
    issue_number: 1,
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/vnd.github.v3+json',
    },
    body: `A new comment was posted by Some User!

> I really like the way this looks!

![screenshot](https://res.cloudinary.com/jlengstorf/image/upload/w_800,q_auto,f_auto/v1597879827/netlify/integrations/create-oauth-app.png)

<details>
<summary> Browser details </summary>

* OS: macOS Catalina 
</details>
`,
  });

  return {
    statusCode: 200,
    body: 'posted a comment',
  };
};
