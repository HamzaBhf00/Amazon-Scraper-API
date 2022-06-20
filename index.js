const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = '8fda27fd4874818904bbe60c19b80b0a'; //Our api key, source from scraperapi.com
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`; //Our base url

app.use(express.json()); //That are going to allow our application to parse json input

app.get('/', (req, res) => {
    res.send('Amazon Scraper API');
});

//Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response)); //Convert from text format to JSON format to see data very clear

    } catch (error) {
        res.json(error);
    }
});

//Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response)); //Convert from text format to JSON format to see data very clear

    } catch (error) {
        res.json(error);
    }
});

//Get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response)); //Convert from text format to JSON format to see data very clear

    } catch (error) {
        res.json(error);
    }
});

//Get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k= ${searchQuery}`);
        res.json(JSON.parse(response)); //Convert from text format to JSON format to see data very clear

    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));