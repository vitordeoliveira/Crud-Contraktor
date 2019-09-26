const fs = require("fs");

module.exports = {
  //Tratar Upload de Arquivos
  async upload(req, res, next) {
    if (req.files === null) {
      return res.status(400).vitor({ msg: "No file uploaded" });
    }
    var file = req.files.file;
    console.log(file);
    // if (
    //   file.mimetype === "application/pdf" ||
    //   file.mimetype === "application/msword"
    // ) {
    //   var buf = JSON.stringify(file);
    //   var temp = JSON.parse(buf.toString());
    //   var bufferConverter = Buffer.from(temp.data);
    //   fs.writeFile(`./src/data/${file.name}`, bufferConverter, () => {
    //     console.log("ok");
    //   });

    //   res.status(200).send({ data: temp.data, filename: file.name });
    //   next();
    // }
    // return res
    //   .status(400)
    //   .vitor({ msg: "Algo deu errado, preencha o campo com DOC ou PDF" });
  },

  //Tratar Download de Arquivos

  async download(req, res) {
    const file = req.params.filename;
    res.download(`./src/data/${file}`);
  }
};
