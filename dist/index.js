"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const mustache_1 = __importDefault(require("mustache"));
const app = express_1.default();
const template = `
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <title>Paleta Sara</title>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <style>
    html, body {
      height: 100%;
      overflow: hidden;
    }
  </style>
  {{{font}}}
</head>
<body>
  <div style="position: fixed; width: 100%; top: 50%; transform: translateY(-50%); z-index: 1000; font-size: 10vw; text-align: center;">
    <div style="color: white; opacity: 0.85">Lorem impsum.</div>
    <div style="color: #222; opacity: 0.85">Sed euismod ex.</div>
  </div>
  <table style="width: 100%; height: 100%; position: fixed; left: 0; right: 0;">
    <tr>
      {{#colors}}
        <td style="background-color: {{.}};"></td>
      {{/colors}}
    </tr>
  </table>
</body>
</html>
`;
const fonts = [
    `<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap" rel="stylesheet">
  <style>body{font-family: 'Roboto';}</style>`,
    `<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Xanh+Mono&display=swap" rel="stylesheet">
  <style>body{font-family: 'Xanh Mono';}</style>`,
    `<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap" rel="stylesheet">
  <style>body{font-family: 'Playfair Display';}</style>`,
    `<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
  <style>body{font-family: 'Work Sans';}</style>`,
    `<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
  <style>body{font-family: 'Anton';}</style>`,
    `<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Stalinist+One&display=swap" rel="stylesheet">
  <style>body{font-family: 'Stalinist One';}</style>`,
    `<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet">
  <style>body{font-family: 'Dancing Script';}</style>`
];
app.get('/', (req, res, next) => {
    axios_1.default.get(`https://palett.es/API/v1/palette/from/${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`).then(pallete => {
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        const site = mustache_1.default.render(template, { colors: pallete.data, font: randomFont });
        res.send(site);
    }).catch(next);
});
const port = process.env.PORT || '3000';
app.listen(port, () => {
    console.log(`App listening on the http://localhost:${port}`);
});
