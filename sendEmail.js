export const sendEmail = (email, fullname, event) => {
  const mailTemplate = {
    from: process.env.EMAIL_EMAIL,
    to: email,
    subject: "Ваш квиток на подію",
    html: `
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="./styles/email.css">
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            
            .box {
              text-align: center;
              width: 80%;
              max-width: 600px;
              padding: 20px;
              border: 1px solid #ccc;
              background-color: #f5f5f5;
              border: 1px solid #ddd;
              border-radius: 10px;
            }
            
            h2 {
              color: #333;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            /* стилі для звичайного тексту */
            p {
              color: #666;
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 20px;
            }
            
            /* стилі для списку */
            li {
              color: #666;
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>Вітаємо ${fullname},</h2>
            <p>Ви записалися на івент ${event.title}</p>
            <h1>Де зібратися, щоб подивитися конференцію?</h1>
            <li>Київ, офіс Sigma Software. ${event.data}</li>
            <p>При собі потрібно мати документ, для підтвердження особи</p>
          </div>
        </body>
      </html> 
          `,
  };
  return mailTemplate;
};
