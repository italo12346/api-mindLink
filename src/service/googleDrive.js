const fs = require("fs");
const { google } = require("googleapis");
const GOOGLE_API_FOLDER_ID = "1FdN0za1uumd83t2R9SOzXhAy2NqcNX6D";

async function uploadFile(userName, imageFilePath) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "./src/service/mindlink-google-drive.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const driveService = google.drive({
      version: "v3",
      auth,
    });
    const fileName = `${userName}_profile_picture.jpg`;
    const fileMetaData = {
      name: fileName,
      parents: [GOOGLE_API_FOLDER_ID],
    };
    const media = {
      MimeType: "image/jpg",
      body: fs.createReadStream(imageFilePath), // Usando o caminho do arquivo passado como parâmetro
    };
    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      fields: "id",
    });
    return response.data.id;
  } catch (err) {
    console.log("Erro criando arquivo", err);
  }
}

module.exports = uploadFile;
