require("dotenv").config();

async function fetchGithub(
  endpoint,
  httpMethod,
  accessToken,
  body = null,
  mediaType = "application/vnd.github+json",
  apiVersion = "2022-11-28"
) {
  const allowedMethods = ["GET", "POST", "PATCH", "PUT", "DELETE"];

  if (!allowedMethods.includes(httpMethod)) {
    throw new Error(
      `Invalid method: ${httpMethod}. Allowed methods are: ${allowedMethods.join(
        ", "
      )}`
    );
  }
  const githubAPIUrl = process.env.GH_API_URL;
  const baseUrl = githubAPIUrl + endpoint;
  const headers = {
    Accept: mediaType,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": apiVersion,
  };

  let options = { method: httpMethod, headers };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(baseUrl, options);
  return response;
}

module.exports = { fetchGithub };
