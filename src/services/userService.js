const { userDB } = require('../config/database')

function usuarioExiste(email, senha, database = userDB) {
    if (typeof senha !== 'string' && typeof senha !== 'number') {
        return false
    }

    return database.usuarios.some(user =>
        user.email === email &&
        (typeof user.senha === 'string' || typeof user.senha === 'number') &&
        String(user.senha) === String(senha)
    )
}

function emailExiste(email, database = userDB) {
    return database.usuarios.findIndex(user => user.email === email) !== -1
}



module.exports = { usuarioExiste, emailExiste }
