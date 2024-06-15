const { User, validate } = require("../models/user")
const bcrypt = require("bcrypt")

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