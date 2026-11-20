const { usuarioExiste } = require('../../../services/userService');

const email = 'teste@example.com';

describe('Comparação de senhas no login', () => {
    it.each(['abc123', '0123456', '123456'])('aceita a senha exata %s', senha => {
        const database = { usuarios: [{ email, senha }] };
        expect(usuarioExiste(email, senha, database)).toBe(true);
    });

    it.each(['0123456', '123456.0', '1.23456e5', ' 123456 ', '0x1e240'])(
        'rejeita a representação numérica alternativa %s',
        senha => {
            const database = { usuarios: [{ email, senha: '123456' }] };
            expect(usuarioExiste(email, senha, database)).toBe(false);
        }
    );

    it('preserva a compatibilidade com senhas numéricas existentes', () => {
        const database = { usuarios: [{ email, senha: 123456 }] };
        expect(usuarioExiste(email, '123456', database)).toBe(true);
        expect(usuarioExiste(email, 123456, database)).toBe(true);
    });

    it.each([null, undefined, false, [], ['123456'], {}])(
        'rejeita senhas de tipos inválidos (%p)',
        senha => {
            const database = { usuarios: [{ email, senha: '123456' }] };
            expect(usuarioExiste(email, senha, database)).toBe(false);
        }
    );

    it('rejeita um usuário sem senha cadastrada', () => {
        const database = { usuarios: [{ email, senha: null }] };
        expect(usuarioExiste(email, 'null', database)).toBe(false);
    });
});
