const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.get("/buy", async (req, res) => {
  const url = "https://www.nigeriapropertycentre.com/for-sale";
  axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const PropCentreForSale = $('[itemprop="itemListElement"]');
      const data = [];

      // get data from html elements
      PropCentreForSale.each(function() {
        const img = $(this)
          .find(".wp-block-img-container img")
          .attr("src");
        const link = $(this)
          .find(".wp-block-img a")
          .attr("href");

        const title = $(this)
          .find(".wp-block-body .wp-block-content h4")
          .text();

        const address = $(this)
          .find(".wp-block-body .wp-block-content address")
          .text();
        const getPrice = $(this)
          .find(".wp-block-body .wp-block-content .price")
          .text();
        let price = getPrice.split(",").join("");
        let getcurrency = price.split("");
        price = price.split("₦").join(""); //extract currency
        let currency = getcurrency[0];
        const bedroom = $(this)
          .find(".wp-block-footer ul li:nth-child(1)")
          .text();
        const state = address.split(", ").pop(); //extract state
        const city = address.split(", ").slice(-2)[0]; //extract city
        data.push({
          title,
          address,
          currency,
          state,
          city,
          link: `https://www.nigeriapropertycentre.com${link}`,
          category: "Buy_pc",
          created_at: "2019-12-11 14:00:21",
          updated_at: "2019-12-11 14:22:14",
          country: "NIGERIA",
          flag: "https://kwaba.ng/api/public/uploads/countryflags/NG.png",
          price,
          bedroom,
          source: "property_centre",
          pictures: [{ fileurl: img }]
        });
      });
      data.splice(0, 3);
      data.pop();
      let filteredData = data.filter(el => {
        return !el.pictures[0].fileurl.includes("noimage"); // filters results that has no images
      });
      // filteredData.splice(0,13)
      console.log(data.length, filteredData.length);
      // console.log(data);
      res.send(filteredData);
    })
    .catch(console.error);
});

app.post("/buy/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://www.nigeriapropertycentre.com/for-sale?page=${id}`;
  console.log(parseInt(req.params.id), "here here");
  await axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const PropCentreForSale = $('[itemprop="itemListElement"]');
      const data = [];

      // get data from html elements
      PropCentreForSale.each(function() {
        const img = $(this)
          .find(".wp-block-img-container img")
          .attr("src");
        const link = $(this)
          .find(".wp-block-img a")
          .attr("href");

        const title = $(this)
          .find(".wp-block-body .wp-block-content h4")
          .text();

        const address = $(this)
          .find(".wp-block-body .wp-block-content address")
          .text();
        const getPrice = $(this)
          .find(".wp-block-body .wp-block-content .price")
          .text();
        let price = getPrice.split(",").join("");
        let getcurrency = price.split("");
        price = price.split("₦").join("");

        let currency = getcurrency[0];
        const bedroom = $(this)
          .find(".wp-block-footer ul li:nth-child(1)")
          .text();
        const state = address.split(", ").pop();
        const city = address.split(", ").slice(-2)[0];
        //   console.log(test,"test data")

        data.push({
          title,
          address,
          currency,
          state,
          city,
          flag: "https://kwaba.ng/api/public/uploads/countryflags/NG.png",
          country: "NIGERIA",
          link: `https://www.nigeriapropertycentre.com${link}`,
          category: "buy_pc",
          created_at: "2019-12-11 14:00:21",
          updated_at: "2019-12-11 14:22:14",
          price,
          bedroom,
          source: "property_centre",
          pictures: [{ fileurl: img }]
        });
      });
      data.splice(0, 3);
      data.pop();
      let filteredData = data.filter(el => {
        return !el.pictures[0].fileurl.includes("noimage");
      });
      // filteredData.splice(0,13)
      console.log(data.length, filteredData.length);
      // console.log(data);
      res.send(filteredData);
    })
    .catch(console.error);

  console.log("did I run fess?");
});

app.get("/rent", async (req, res) => {
  const url = "https://www.nigeriapropertycentre.com/for-rent";
  await axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const PropCentreForSale = $('[itemprop="itemListElement"]');
      const data = [];

      // get data from html elements
      PropCentreForSale.each(function() {
        const img = $(this)
          .find(".wp-block-img-container img")
          .attr("src");
        const link = $(this)
          .find(".wp-block-img a")
          .attr("href");

        const title = $(this)
          .find(".wp-block-body .wp-block-content h4")
          .text();

        const address = $(this)
          .find(".wp-block-body .wp-block-content address")
          .text();
        const getPrice = $(this)
          .find(".wp-block-body .wp-block-content .price")
          .text();
        let price = getPrice.split(",").join("");
        let getcurrency = price.split("");
        price = price.split("₦").join("");
        let currency = getcurrency[0];
        const bedroom = $(this)
          .find(".wp-block-footer ul li:nth-child(1)")
          .text();
        const state = address.split(", ").pop();
        const city = address.split(", ").slice(-2)[0];

        const rent_tenure = $(this)
          .find(".wp-block-body .wp-block-content .period")
          .text();
        data.push({
          title,
          address,
          currency,
          state,
          city,
          country: "NIGERIA",
          link: `https://www.nigeriapropertycentre.com${link}`,
          rent_tenure,
          flag: "https://kwaba.ng/api/public/uploads/countryflags/NG.png",
          category: "rent_pc",
          created_at: "2019-12-11 14:00:21",
          updated_at: "2019-12-11 14:22:14",
          price,
          bedroom,
          source: "property_centre",
          pictures: [{ fileurl: img }]
        });
      });
      data.splice(0, 3);
      data.pop();
      let filteredData = data.filter(el => {
        return !el.pictures[0].fileurl.includes("noimage");
      });
      // filteredData.splice(0,13)
      console.log(data.length, filteredData.length);
      // console.log(data);
      res.send(filteredData);
    })
    .catch(console.error);

  // console.log("did I run fess?")
});

app.post("/rent/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://www.nigeriapropertycentre.com/for-rent?page=${id}`;
  console.log(parseInt(req.params.id), "here here");
  await axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const PropCentreForSale = $('[itemprop="itemListElement"]');
      const data = [];

      // get data from html elements
      PropCentreForSale.each(function() {
        const img = $(this)
          .find(".wp-block-img-container img")
          .attr("src");
        const link = $(this)
          .find(".wp-block-img a")
          .attr("href");

        const title = $(this)
          .find(".wp-block-body .wp-block-content h4")
          .text();

        const address = $(this)
          .find(".wp-block-body .wp-block-content address")
          .text();
        const getPrice = $(this)
          .find(".wp-block-body .wp-block-content .price")
          .text();
        let price = getPrice.split(",").join("");
        let getcurrency = price.split("");
        price = price.split("₦").join("");
        let currency = getcurrency[0];
        const bedroom = $(this)
          .find(".wp-block-footer ul li:nth-child(1)")
          .text();
        const state = address.split(", ").pop();
        const city = address.split(", ").slice(-2)[0];

        const rent_tenure = $(this)
          .find(".wp-block-body .wp-block-content .period")
          .text();
        data.push({
          title,
          address,
          currency,
          state,
          country: "NIGERIA",
          flag: "https://kwaba.ng/api/public/uploads/countryflags/NG.png",
          city,
          link: `https://www.nigeriapropertycentre.com${link}`,
          rent_tenure,
          category: "rent_pc",
          created_at: "2019-12-11 14:00:21",
          updated_at: "2019-12-11 14:22:14",
          price,
          bedroom,
          source: "property_centre",
          pictures: [{ fileurl: img }]
        });
      });
      data.splice(0, 3);
      data.pop();
      let filteredData = data.filter(el => {
        return !el.pictures[0].fileurl.includes("noimage");
      });
      // filteredData.splice(0,13)
      console.log(data.length, filteredData.length);
      // console.log(data);
      res.send(filteredData);
    })
    .catch(console.error);

  console.log("did I run fess?");
});

// const getPropertyCentre = () =>{

// }

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
