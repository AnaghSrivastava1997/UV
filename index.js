import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';



const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }))



// Define any custom headers you want to include with the request
const headers = {
    'x-access-token': 'openuv-bkdawprlu3zzrge-io'
};
//index.ejs page
app.get('/', (req, res) => res.render("index.ejs"));

//uvindex.ejs
app.post("/getuvindext", async (req, res) => {

    var lat = req.body.lat;
    var lng = req.body.lng;

    var param = {
        lat: lat,
        lng: lng

    }
    var response = await axios.get("https://api.openuv.io/api/v1/uv", { params: param, headers: headers });
    var resultapi = response.data;
    console.log(resultapi);

    var descfunc = uvraydesc(resultapi.result.uv);
    console.log(descfunc);
    res.render("uvindex.ejs", { resultapi: resultapi, lat: lat, lng: lng, desc: descfunc });

})

function uvraydesc(uvindex) {
    var desc = {};
    desc.bgcolor = "";
    desc.heading = "";
    desc.headline = "";
    desc.pointers = [];

    if (uvindex >= 0 && uvindex < 2) {
        desc.bgcolor = "bg-success";
        desc.heading = "0 to 2: Low";
        desc.headline = "A UV Index reading of 0 to 2 means low danger from the sun's UV rays for the average person.";
        desc.pointers = ["Wear sunglasses on bright days.", "If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen."];

    }

    if (uvindex >= 2 && uvindex < 5) {
        desc.bgcolor = "bg-warning";
        desc.heading = "2 to 5: Moderate";
        desc.headline = "A UV Index reading of 2 to 5 means moderate risk of harm from unprotected sun exposure.";
        desc.pointers = ["Stay in shade near midday when the sun is strongest.", "If outdoors, wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses."];

    }
    if (uvindex >= 5 && uvindex < 7) {
        desc.bgcolor = "bg-danger";
        desc.heading = "5 to 7: High";
        desc.headline = "A UV Index reading of 5 to 7 means high risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed.";
        desc.pointers = ["Reduce time in the sun between 10 a.m. and 4 p.m.", "If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses."];

    }
    if (uvindex >= 7 && uvindex <= 10) {
        desc.bgcolor = "bg-primary";
        desc.heading = "7 to 10: Very High";
        desc.headline = "A UV Index reading of 7 to 10 means very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly.";
        desc.pointers = ["Minimize sun exposure between 10 a.m. and 4 p.m.", "Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating."];

    }


    return desc;
}



//port 3000 to run
app.listen(port, () => console.log(`app listening on port ${port}!`));