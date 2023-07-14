const puppeteer = require("puppeteer");
const fs = require("fs");

function main() {
    fs.readdir("C:\\Users\\qewrt\\OneDrive\\바탕 화면\\아르바이트\\시큐어링크\\파일\\강양구\\악성코드\\securelink_4", async (err, files) => {
        for (let i = 0; i < files.length; i++) {
            await test(files[i]);
            await fs.unlinkSync("C:\\Users\\qewrt\\OneDrive\\바탕 화면\\아르바이트\\시큐어링크\\파일\\강양구\\악성코드\\securelink_4" + files[i]);
        }
    });
    // for(let i = 0; i < file_list.length; i++) {
    //     console.log(1);
    //     test(file_list[i]);
    //     console.log(2);
    // }
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function test(file_name) {
    let path = "C:\\Users\\qewrt\\OneDrive\\바탕 화면\\아르바이트\\시큐어링크\\파일\\강양구\\악성코드\\securelink_4\\" + file_name;

    const browser = await puppeteer.launch({
        headless: false,
        args:["--windows-size=1920,1080"]
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080
    });

    await page.goto("https://www.virustotal.com/gui/home/upload", {
        waitUntil: "networkidle2"
    });

    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        await page.evaluate( () => document.querySelector("#view-container > home-view").shadowRoot.querySelector("#uploadForm").shadowRoot.querySelector("#fileSelector").click()),
    ]);

    await fileChooser.accept([path]);

    await sleep(10000).then(() => page.evaluate(() => document.querySelector("#view-container > file-view").shadowRoot.querySelector("#report > vt-ui-file-card").shadowRoot.querySelector("#reanalize").click()));

    browser.close();
}

async function file_reader() {
    let file_list;

    fs.readdir("C:\\Users\\qewrt\\OneDrive\\바탕 화면\\아르바이트\\시큐어링크\\파일\\강양구\\악성코드\\securelink_4", (err, files) => {
        file_list = files;
    });

    return file_list;
}

main();