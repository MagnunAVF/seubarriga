module.exports = (app) => {
    const findAll = () => {
        return app.db('users').select();
    }

    const save = (user) => {
        if (!user.name) return { error: 'Name must be present!' }

        return app.db('users').insert(user, '*');
    }

    return { findAll, save };
}