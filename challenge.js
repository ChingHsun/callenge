require("dotenv").config();

const axios = require("axios");

const apiUrl = "https://flag-gilt.vercel.app/api/challenge";
const token = process.env.API_TOKEN;

async function postChallengeAPI({ cursor }) {
  try {
    const response = await axios.post(
      apiUrl,
      { cursor: cursor },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    if (response.data.nextCursor) {
      await postChallengeAPI({ cursor: response.data.nextCursor });
    } else {
      console.log("FINISHED");
    }
  } catch (error) {
    console.error(
      "ERROR:",
      error.response ? error.response.data : error.message
    );
  }
}

postChallengeAPI({ cursor: null });
