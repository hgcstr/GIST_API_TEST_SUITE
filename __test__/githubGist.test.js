require("dotenv").config();
const testData = require("../data/gist-data.json");
const { fetchGithub } = require("../utilities/utils");
const { validate } = require("jsonschema");
const getGistSchema = require("../data/getGistSchema.json");

describe("Gist API Tests", () => {
  //process.env.GITHUB_PAT;
  const accessToken = process.env.GITHUB_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("Please provide and access token");
  }

  describe("Successful Scenarios", () => {
    let endpoint = "gists";
    let gistID;
    let method;
    let body;
    let response;
    let responseData;
    let fileName;
    let content;
    test("Create a gist successfully", async () => {
      method = "POST";

      // Accessing createGist data
      body = testData.createGist;

      response = await fetchGithub(endpoint, method, accessToken, body);
      responseData = await response.json();

      // Extracting the file name and content from the createGistData object
      fileName = Object.keys(body.files)[0];
      content = body.files[fileName].content;

      expect(response.status).toBe(201);
      expect(responseData).toHaveProperty("id");
      gistID = responseData.id;
      console.log("We created a gist with ID:", gistID);
      expect(responseData.description).toBe(body.description);
      expect(responseData.public).toBe(body.public);
      // Assert the file name and content
      expect(Object.keys(responseData.files)[0]).toBe(fileName);
      expect(responseData.files[fileName].content).toBe(content);
    });

    test("Get a gist successfully", async () => {
      method = "GET";
      endpoint = `gists/${gistID}`;
      response = await fetchGithub(endpoint, method, accessToken);
      responseData = await response.json();
      expect(response.status).toBe(200);
      // Validate the response against the json schema
      const validationResult = validate(responseData, getGistSchema);
      expect(validationResult.valid).toBe(true);
      expect(responseData.id).toBe(gistID);
    });

    test("Update a gist successfully", async () => {
      method = "PATCH";
      endpoint = `gists/${gistID}`;
      // Accessing updateGist data
      body = testData.updateGist;

      response = await fetchGithub(endpoint, method, accessToken, body);
      responseData = await response.json();

      // Extracting the file name and content from the updateGist object
      fileName = Object.keys(body.files)[0];
      content = body.files[fileName].content;
      expect(response.status).toBe(200);
      expect(responseData).toHaveProperty("id");
      expect(responseData.id).toBe(gistID);
      expect(responseData.description).toBe(body.description);
      // Assert the file name and content
      expect(Object.keys(responseData.files)[0]).toBe(fileName);
      expect(responseData.files[fileName].content).toBe(content);
    });

    test("Delete a gist successfully", async () => {
      method = "DELETE";
      endpoint = `gists/${gistID}`;

      response = await fetchGithub(endpoint, method, accessToken);

      expect(response.status).toBe(204);
      //There's no body response then we just not check that

      // Attempt to retrieve the deleted gist (expect a 404 not found)
      const getResponse = await fetchGithub(endpoint, "GET", accessToken);
      expect(getResponse.status).toBe(404);
    });
  });

  describe("Negative Scenarios", () => {
    test("Attempt to create a gist with invalid data", async () => {
      ///DONT DELETE!!! FOR TESTING THE DATA
      // const body = JSON.stringify(createGist);
    });

    test("Attempt to get a non-existent gist", async () => {});

    test("Attempt to update a non-existent gist", async () => {});

    test("Attempt to delete a non-existent gist", async () => {});

    // Additional negative scenarios
    test("Attempt to create a gist without authentication", async () => {});

    test("Attempt to update a gist with invalid data", async () => {});
  });
});
