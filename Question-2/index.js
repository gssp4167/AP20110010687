const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/numbers", async (req, res) => {
  const params = req.query;

  let numbersArr = [];
  let uniqueArray = [];

  const requests = params.url.map((url) => axios.get(url));

  const data = await axios.all(requests).then((responses) => {
    responses.forEach((resp) => {
      let msg = {
        server: resp.headers.server,
        status: resp.status,
        fields: Object.keys(resp.data).toString(),
        data: resp.data,
      };

      msg.data.numbers.map((ele) => {
        numbersArr.push(ele);
      });
    });

    uniqueArray = [...new Set(numbersArr)];

    return uniqueArray.sort((a, b) => a - b);
  });

  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
