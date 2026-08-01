const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Recipe = require("../models/recipe");

const userSignUp = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        })
    }

    let user = await User.findOne({ email })

    if (user) {
        return res.status(400).json({
            error: "Email is already exist"
        })
    }

    const hashPwd = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        name,
        email,
        password: hashPwd
    })

    let token = jwt.sign(
        { email, id: newUser._id },
        process.env.SECRET_KEY
    )

    return res.status(200).json({
        token,
        user: newUser
    })
}

const userLogin = async (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" })
    }
    let user = await User.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {
        let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY)
        return res.status(200).json({ token, user })
    }
    else {
        return res.status(400).json({ error: "Invalid email or password." })
    }
}


const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
    name: user.name,
    email: user.email
});

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
}

const addFavourites = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const user = await User.findById(req.user.id);

    const alreadyExists = user.favourites.some(
  (id) => id.toString() === recipeId
);

if (!alreadyExists) {
  user.favourites.push(recipeId);
  await user.save();
}

    res.status(200).json({
      message: "Recipe added to favourites.",
      favourites: user.favourites,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeFavourites = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const user = await User.findById(req.user.id);

    user.favourites = user.favourites.filter(
      (id) => id.toString() !== recipeId
    );

    await user.save();

    res.status(200).json({
      message: "Recipe removed from favourites.",
      favourites: user.favourites,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favourites");

    res.status(200).json(user.favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { userLogin, userSignUp, getUser,addFavourite, removeFavourite, getFavourites };