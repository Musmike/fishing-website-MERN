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

const updateUser = async (req, res) => {
    try {
        let updateFields = {};

        if (req.body.firstName) updateFields.firstName = req.body.firstName;
        if (req.body.lastName) updateFields.lastName = req.body.lastName;
        if (req.body.email) updateFields.email = req.body.email;

        if (req.body.currentPassword && req.body.newPassword && req.body.confirmNewPassword) {
            const { error: passwordError } = validatePasswordChangeData(req.body);

            if (passwordError) {
                return res.status(400).send({ message: passwordError.details[0].message });
            }

            const user = await User.findById(req.user._id);

            if (!user) {
                return res.status(404).send({ message: "Nie znaleziono użytkownika." });
            }

            const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).send({ message: "Aktualne hasło jest niepoprawne." });
            }
            
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

            updateFields.password = hashPassword;
        }

    
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updateFields,
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).send({ message: "Nie znaleziono użytkownika." });
        }

        res.status(200).send({ message: "Dane użytkownika zaktualizowane pomyślnie."});
    }
    catch (error) {
        res.status(500).send({ message: "Błąd wewnętrzny serwera!" });
    }
};

const validatePasswordChangeData = (data) => {
    const schema = Joi.object({
        currentPassword: Joi.string().required().label("Aktualne hasło"),
        newPassword: passwordComplexity().required().label("Nowe hasło"),
        confirmNewPassword: Joi.any().valid(Joi.ref("newPassword")).required().label("Potwierdzenie nowego hasła").messages({
            "any.only": "{{#label}} musi być zgodne z nowym hasłem",
        }),
    });
    return schema.validate(data);
};

module.exports = { deleteUser, updateUser };