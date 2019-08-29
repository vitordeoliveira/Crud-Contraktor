const User = require("../models/User");
const validarCpf = require("validar-cpf");
const Contract = require("../models/Contract");

module.exports = {
  async index(req, res) {
    const { user } = req.headers;
    const users = await User.find({ _id: { $ne: user } })
      .select("-contratos")
      .select("-senha");

    return res.json(users);
  },

  async store(req, res) {
    try {
      const { nome, sobrenome, email, cpf, telefone, senha } = await req.body;
      const cpfCorrection = cpf.trim();
      const check = await validarCpf(cpfCorrection);
      if (!check) {
        return res.status(400).json({ msg: "CPF invalido" });
      }
      // Check Account
      const cpfAlreadyExist = await User.findOne({ cpfCorrection });
      const emailAlreadyExist = await User.findOne({ email });
      // Check Contracts in CPF
      const contratos = [];
      const rest = await Contract.find();
      rest.map(contract => {
        let { _id, partes } = contract;
        partes.map(parte => {
          if (cpfCorrection === parte.cpf) {
            contratos.unshift(_id);
          }
        });
      });

      //Check if account aready exists
      if (cpfAlreadyExist || emailAlreadyExist) {
        return res.status(400).json({ msg: "e-mail ou cpf ja existem" });
      }

      if (!senha) {
        return res.status(400).json({ msg: "Insira uma senha" });
      }
      const user = await User.create({
        nome,
        sobrenome,
        email,
        cpf: cpfCorrection,
        telefone,
        contratos,
        senha
      });

      return res.json(user);
    } catch (err) {
      res.json(err.message);
    }
  },

  async indexOne(req, res) {
    try {
      const usercpf = req.params.cpf;
      const user = await User.findOne({ cpf: usercpf }).select("-contratos");
      if (user) {
        return res.json(user);
      }
      return res.json({ msg: `CPF: ${usercpf} not found` });
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  },

  async login(req, res) {
    try {
      const { email, cpf, senha } = req.body;
      const user = await User.findOne({ cpf: cpf });
      const userSec = await User.findOne({ cpf: cpf }).select("-senha");

      if (user && user.email === email && user.senha === senha) {
        return res.json(userSec);
      }
      return res.status(404).json({ msg: "User not found" });
    } catch (err) {
      console.log(err);
    }
  }
};
