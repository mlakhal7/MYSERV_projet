/*
    Contiendra les fonctions de :
      - connexion, de création de compte et de déconnexion,
      - d'ajout/modification/suppression de produit,
      - d'ajout/suppresion d'un produit au panier,
      - de récupération des données d'un user.
*/
const User = require("../../schema/schemaUser");
const Product = require("../../schema/schemaProduct");
const passwordHash = require("password-hash");

module.exports = {
  async signup(req, res) {
    const { firstname, lastname, email, phoneNumber, password } = req.body;
    if (!firstname || !lastname || !password) {
      //Le cas où les paramètres ne serait pas saisis ou nuls
      return res.status(400).json({
        text: "Les champs ne sont pas tous saisis."
      });
    }
    if (!email) {
      return res.status(400).json({
        text: "Veuillez renseignez un email valide."
      });
    }
    if (!phoneNumber) {
      return res.status(400).json({
        text: "Veuillez renseignez un numéro de téléphone."
      });
    }

    // Création d'un objet user, dans lequel on hash le mot de passe
    const user = {
      firstname,
      lastname,
      email,
      phoneNumber,
      password: passwordHash.generate(password)
    };

    // On check en base si l'utilisateur existe déjà selon son email et numéro de téléphone
    try {
      const findUser = await User.findOne({ email, phoneNumber });
      if (findUser) {
        console.log("Utilisateur existe déjà");
        return res.status(409).json({
          text: "L'utilisateur existe déjà. Veuillez vous connectez."
        });
      }
    } catch (error) {
      console.log("error findOne (lib.js): " + error);
    }

    try {
      // Sauvegarde de l'utilisateur en base
      const userData = new User(user);
      let userObject = await userData.save();
      console.log("userObject (lib.js): " + userObject);

      // assigne l'user à la session
      req.session.user = userData;
      req.session.save();

      return res.status(200).json({
        text: "Good job: User saved successfully! :)",
        username: userData.firstname,
        token: userData.getToken()
      });
    } catch (error) {
      console.log("error user save (lib.js): " + error);
    }
  },

  async login(req, res) {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      // Si phoneNumber ou bien le password ne serait pas saisi ou nul
      return res.status(400).json({
        text: "Un des paramètres est manquant !"
      });
    }
    try {
      // On check si l'utilisateur existe en base
      const findUser = await User.findOne({ phoneNumber });
      if (!findUser) {
        console.log("L'utilisateur n'existe pas");
        return res.status(401).json({
          text: "L'utilisateur n'existe pas"
        });
      }
      if (!findUser.authenticate(password)) {
        console.log("Mot de passe incorrect");
        return res.status(401).json({
          text: "Mot de passe incorrect"
        });
      }

      console.log("Connexion réussie !");
      // assigne l'user à la session
      req.session.user = findUser;
      req.session.save();

      return res.status(200).json({
        username: findUser.firstname,
        token: findUser.getToken(),
        session,
        text: "Authentification réussie !"
      });
    } catch (error) {
      console.log("error login (lib.js): " + error);
    }
  },

  logout(req, res) {
    //Destroy the session, which logout the user, since when the user session is undefined the redux also logout's
    // the user in the frontend.
    req.session.destroy();
    //Send a message informing  a user successfully logged out.
    res.status(200).json({ message: "Logout Successfully!" });
  },

  readUserData(req, res) {
    res.status(200).json({ user: req.session.user });
  },

  addToCart(req, res) {},

  removeFromCart(req, res) {},

  createProduct(req, res) {
    const { picture, title, description, price, category, tags } = req.body;

    let newProduct = new Product({
      picture,
      title,
      description,
      price,
      category,
      tags
    });

    newProduct.save();
    res.status(200).json({ product: newProduct });
  },

  updateProduct(req, res) {
    //Get the id, since we need to update a specific product.
    //Destruct the id from the request params.
    const { id } = req.params;
    //Destruct the update data from the req.body,
    // also add picture to destruct from req.body ;------------------------------
    const { picture, title, description, price, category, tags } = req.body;
    //Find the product, and update it's properties
    Product.findById(id).exec((err, product) => {
      if (err) console.log("Updated Product: ", err);
      product.picture = picture;
      product.title = title;
      product.description = description;
      product.price = price;
      product.category = category;
      product.tags = tags;

      product.save();
      res.status(200).json({ product });
    });
  },

  deleteProduct(req, res) {
    //Destruct the id from the request params, since you have to delete a specific product.
    const { id } = req.params;
    //Use an object to delete the specified product.
    Product.deleteOne({ _id: id }).exec((err, product) => {
      if (err) console.log("Delete One Error: ", err);
      res.status(200).json({ product });
    });
  }
};
