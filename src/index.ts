import express from 'express'
import axios from 'axios'
import mustache from 'mustache'

const app = express()

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
      margin: 0;
      padding: 0
      height: 100%;
      overflow: hidden;
    }

    td {
      vertical-align:top;
    }

    td:hover span {
      opacity: 1;
    }

    td span {
      transition: all .3s;
      opacity: 0;
      padding: 10px; 
      background-color: white; 
      border-radius: 5px;
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      top: 25px;
    }
  </style>
  {{{font}}}
</head>
<body>
  <input id="field" style="position: fixed; top: -100px">
  <div style="position: fixed; width: 100%; top: 50%; transform: translateY(-50%); z-index: 1000; text-align: center;">
    <div style="color: white; opacity: 0.85; font-size: 10vw;">Lorem impsum.</div>
    <div style="color: #222; opacity: 0.85; font-size: 7vw;">Sed euismod ex.</div>
  </div>
  <table style="width: 100%; height: 100%; position: fixed; left: 0; right: 0;">
    <tr>
      {{#colors}}
        <td onclick="clipboard('{{.}}')" style="background-color: {{.}};">
        <span>{{.}}</span>
        </td>
      {{/colors}}
    </tr>
  </table>

  <script>
    function clipboard(val) {
      /* Get the text field */
      var copyText = document.getElementById("field");
      copyText.value = val

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");
    }
  </script>
</body>
</html>
`

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
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet">
  <style>body{font-family: 'Dancing Script';}</style>`
]

app.get('/', (req, res, next) => {
  axios.get(`https://palett.es/API/v1/palette/from/${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`).then(pallete => {
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)]
    const site = mustache.render(template, {colors: pallete.data, font: randomFont})
    res.send(site)
  }).catch(next)
})

const port = process.env.PORT || '3000'
app.listen(port, () => {
  console.log(`App listening on the http://localhost:${port}`)
})