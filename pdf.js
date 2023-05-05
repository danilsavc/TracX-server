import pdf from "html-pdf";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = (fullName, data, price, title) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
  
        th,
        td {
          border: 1px solid black;
          padding: 10px;
          text-align: center;
        }
  
        th {
          background-color: #ddd;
        }
  
        .rotate {
          transform: rotate(-90deg);
          white-space: nowrap;
        }
      </style>
    </head>
  
    <body>
      <table>
        <tr>
          <th>123123</th>
          <th>Квиток: № 112233<br />Ім'я: ${fullName}</th>
          <th>TracX</th>
        </tr>
        <tr>
          <td>Подія: ${title}</td>
          <td>Адреса: Київ, офіс Sigma Software</td>
          <td>Дата та час проведення: ${data}</td>
        </tr>
        <tr>
          <td colspan="2" >Ціна: ${price} грн</td>
          <td colspan="1"></td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

const options = {
  format: "A4",
  orientation: "portrait",
  border: {
    top: "1cm",
    right: "1cm",
    bottom: "1cm",
    left: "1cm",
  },
};

export const createPdf = (fullName, data, price, title) => {
  return new Promise((resolve, reject) => {
    pdf
      .create(html(fullName, data, price, title), options)
      .toFile(path.resolve(__dirname, "pdf", "ticket.pdf"), (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
};

export const removePdf = () => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, "pdf", "ticket.pdf");

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log("PDF файл був успішно видалений");
        resolve();
      }
    });
  });
};
