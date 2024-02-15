const fs = require("fs");
const { google } = require("googleapis");
const GOOGLE_API_FOLDER_ID = "1FdN0za1uumd83t2R9SOzXhAy2NqcNX6D";

async function uploadFile() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "./mindlink-google-drive.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const driveService = google.drive({
      version: "v3",
      auth,
    });
    const fileMetaData = {
      name: "snowplace.jpg",
      parents: [GOOGLE_API_FOLDER_ID],
    };
    const media = {
      MimeType: "image/jpg",
      body: fs.createReadStream("./20230810_082846.jpg"),
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
uploadFile().then((data) => {
  console.log(data);
});
