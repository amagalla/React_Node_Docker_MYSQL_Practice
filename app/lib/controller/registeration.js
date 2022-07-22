const db = require('../db/mysql.config');

const registerUser = async (profile) => {
    const { first_name, last_name, email, password} = profile;

    const registerQuery = `INSERT INTO profiles 
        (first_name, last_name, email, password)
        VALUES 
        (?, ?, ?, ?)`;

    try {
        await db.query(registerQuery, [first_name, last_name, email, password]);
    } catch (err) {
        throw new Error(err);
    };

    return true;
}

const getUser = async () => {
    const getUserQuery = 'SELECT * FROM profiles';

    const resp = await db.query(getUserQuery);

    return resp[0];
}

module.exports = {
    registerUser,
    getUser
};