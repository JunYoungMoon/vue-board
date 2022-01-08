const axios = require("axios");
const cheerio = require("cheerio");

function getAPI() {
    return axios.get("https://www.genie.co.kr/chart/top200");
}
async function parsing() {
    const html = await getAPI();
    const $ = cheerio.load(html.data);
    const $courseList = $(".list");
    let courses = [];
    $courseList.each((idx, node) => {
        const title = $(node).find(".title").text().trim();
        const artist = $(node).find(".artist").text().trim();
        const albumtitle = $(node).find(".albumtitle").text().trim();
        const img = $(node).find("img").attr("src");

        if (title != "" && artist != "" && albumtitle != "") {
            courses.push({
                img,
                title,
                artist,
                albumtitle,
            });
        }
    });
    return courses;
}
parsing().then(r => console.log(r));
