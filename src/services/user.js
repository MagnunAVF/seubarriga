module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db('users').where(filter).select();
    }

    const save = async (user) => {
        if (!user.name) return { error: 'Name must be present!' }
        if (!user.mail) return { error: 'Email must be present!' }
        if (!user.passwd) return { error: 'Password must be present!' }

        const userDb = await findAll({ mail: user.mail })
        if (userDb && userDb.length > 0) return { error: 'This user exists in db !' }

        return app.db('users').insert(user, '*');
    }

    return { findAll, save };
}