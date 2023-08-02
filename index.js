const { argv } = require("node:process");
const fs = require("fs");
const axios = require("axios");

const options = {
    method: "GET",
    url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
    params: { term: argv[2] },
    headers: {
        "X-RapidAPI-Key": "559faf3456msh07f8cc2397f86d2p131c2bjsnf07f9ababf61",
        "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
    },
};
async function api() {
    try {
        const response = await axios.request(options);
        let responseList = [];
        response.data.list.forEach((elem) => {
            responseList.push({
                definition: elem.definition,
                author: elem.author,
                permalink: elem.permalink,
            });
        });

        fs.appendFile(
            `DefinitionsFor${argv[2]}.txt`,
            `Definitions found at Urban Dictionary:\n\n`,
            function (err) {
                if (err) throw err;
                console.log("Information saved");
            }
        );

        responseList.forEach((elem) => {
            fs.appendFile(
                `DefinitionsFor${argv[2]}.txt`,
                `Definition: ${elem.definition}\n
                Author: ${elem.author}\n
                Permalink: ${elem.permalink}\n\n`,
                function (err) {
                    if (err) throw err;
                    console.log("Information saved");
                }
            );
        });
    } catch (error) {
        console.error(error);
    }
}
api();
