import axios from "axios";
export const getLangaugeId = function (langauge) {
  const langaugeMap = {
    JAVA: 62,
    PYTHON: 71,
    JAVASCRIPT: 63,
  };

  return langaugeMap[langauge.toUpperCase()];
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const poolBatchResults = async (tokens) => {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
      }
    );

    const results = data.submissions;

    const isAllDone = results.every((r) => r.status.id > 2); // it only returns true if the status if of the submition is more then 2

    if (isAllDone) {
      return results;
    }

    await sleep(1000); // if status id is less then 2 then it will hit the judge0 again after 1 second
  }
};

export const submitBatch = async (submissions) => {
  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    {
      submissions,
    }
  );
  return data;
};

export const getLangaugeName = function (language_id) {
  const langaugeMap = {
    62: "JAVA",
    71: "PYTHON",
    63: "JAVASCRIPT",
    74: "TYPESCRIPT",
  };

  return langaugeMap[language_id] || "Unknown";
};
