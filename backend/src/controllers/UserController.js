const User = require("../models/User");
const validarCpf = require("validar-cpf");
const Contract = require("../models/Contract");

module.exports = {
  async index(req, res) {
    const { user } = req.headers;
    const users = await User.find({ _id: { $ne: user } });

    return res.json(users);
  },

  async store(req, res) {
    try {
      const { nome, sobrenome, email, cpf, telefone } = await req.body;
      const validarcpf = await validarCpf(cpf);
      // nome, sobrenome, email, CPF e telefone.
      const cpfCorrection = cpf.trim();
      // Check Account
      const cpfAlreadyExist = await User.findOne({ cpfCorrection });
      const emailAlreadyExist = await User.findOne({ email });
      // Check Contracts in CPF
      const contratos = [];
      const rest = await Contract.find({ waiting: cpfCorrection });
      if (rest) {
        rest.forEach(contrato => {
          contratos.push(contrato._id);
          console.log(contrato.waiting);
          let index = contrato.waiting.indexOf(cpfCorrection);
          if (index > -1) {
            contrato.waiting.splice(index, 1);
          }
          console.log("----", contrato.waiting);
        });
      }

      if (!validarcpf) {
        return res.json({ msg: "CPF inv?lido" });
      }

      if (cpfAlreadyExist || emailAlreadyExist) {
        return res.json({ msg: "e-mail or cpf already exist" });
      }
      const user = await User.create({
        nome,
        sobrenome,
        email,
        cpf: cpfCorrection,
        telefone,
        contratos
      });

      return res.json(user);
    } catch (err) {
      res.json(err.message);
    }
  }
};
