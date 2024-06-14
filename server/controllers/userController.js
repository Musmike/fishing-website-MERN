const { User, validate } = require("../models/user")
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
    try {
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(409)
                .status(409)
                .send({ message: "User with given email already Exist!" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "Pomyślnie utworzono użytkownika" })
    }
    catch (error) {
        
        res.status(500).send({ message: "Błąd wewnętrzny serwera!" });
    }
};


const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);

        if (!user) {
            return res.status(404).send({ message: "Nieznaleziono użytkownika!" });
        }

        res.status(200).send({ message: "Konto usunięte pomyślnie" });
    } 
    catch (error) {
        res.status(500).send({ message: "Błąd wewnętrzny serwera!" });
    }
};

module.exports = { createUser, deleteUser };