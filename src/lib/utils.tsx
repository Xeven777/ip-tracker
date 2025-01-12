"use server";

import nodemailer from "nodemailer";

export async function generateEmailBody(ipdata: any) {
  const subject = "Wohoo! Got the Details😈";
  const body = `
    <div style="font-family:sans;">
    <h1>Hello friend !</h1>
    <h2>Here is the IP details</h3>
    <div style="border: 1px solid #ff4968; padding: 10px; background-color:rgb(56, 23, 29,0.7);border-radius:15px;color:white;">
      <h3>Here are the details of :</h3>
      <ul>
        <li>IP Address: ${ipdata.ip_address || "unknown"}</li>
        <li>Browser: ${ipdata.browser}</li>
        <li>Operating System: ${ipdata.os}</li>
        <li>Device: ${ipdata.device}</li>
        <li>Country: ${ipdata.geo.country || "unknown"}</li>
        <li>Region: ${ipdata.geo.regionName || "unknown"}</li>
        <li>City: ${ipdata.geo.city || "unknown"}</li>
        <li>District: ${ipdata.geo.district || "unknown"}</li>
        <li>Zip: ${ipdata.geo.zip || "unknown"}</li>
        <li>Latitude: ${ipdata.geo.lat || "unknown"}</li>
        <li>Longitude: ${ipdata.geo.lon || "unknown"}</li>
        <li>ISP: ${ipdata.geo.isp || "unknown"}</li>
        <li>Organization: ${ipdata.geo.org || "unknown"}</li>
        <li>AS: ${ipdata.geo.as || "unknown"}</li>
        <li>Mobile: ${ipdata.geo.mobile || "unknown"}</li>
      </ul>
    </div>
    <p>Have a great day !!!!</p>
  </div>

      `;

  return { subject, body };
}

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PW,
  },
});

export const sendEmail = async (emailContent: EmailContent) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL2,
    html: emailContent.body,
    subject: emailContent.subject,
  };
  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

type EmailContent = {
  subject: string;
  body: string;
};
