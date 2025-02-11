const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

console.log("Configurando transporte de e-mail...");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,  // Garante que não terá erro de certificado
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Erro ao conectar ao servidor SMTP:", error);
  } else {
    console.log("Servidor SMTP pronto para enviar e-mails.");
  }
});

async function sendOrderConfirmationEmail(to, orderDetails, orderId) {
  console.log("Enviando e-mail para:", to);

  // Caminho absoluto da imagem
  const imagePath = path.join(__dirname, '../../assets/images/qrcode.png');
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Confirmação do Pedido",
    html: `<h1>Pedido Confirmado!</h1>
           <p>Obrigado por sua compra. Aqui estão os detalhes do seu pedido:</p>
           <p><strong>Pedido ID:</strong> ${orderId._id}</p>
           <p><strong>Endereço:</strong> ${orderDetails.address.rua}, ${orderDetails.address.numero}, ${orderDetails.address.complemento} - CEP: ${orderDetails.address.cep}</p>
           <p><strong>Total:</strong> ${orderDetails.precoTotal}</p>
           <p>Entraremos em contato em breve.</p>
           <p>QRCode do pagamento:</p>
           <img src="cid:qrcode_image" alt="QR Code" />`, // Referência à imagem incorporada
    attachments: [
      {
        filename: 'qrcode.jpeg',  // Nome do arquivo de imagem
        path: imagePath,           // Caminho da imagem no servidor
        cid: 'qrcode_image',      // ID para referenciar no HTML
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso:", info.response);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}

module.exports = { sendOrderConfirmationEmail };
