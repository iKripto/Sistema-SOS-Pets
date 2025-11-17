-- 1. Inserir o Funcionário (para o login)
INSERT INTO FUNCIONARIO (cpf, nome, rg, email, profissao, endereco) 
VALUES ('12345678900', 'Membro Teste Diretoria', '11222333-4', 'diretoria@sospets.com', 'Admin', 'Rua da ONG, 123');

-- 2. Inserir Cores (necessário para os animais)
INSERT INTO COR (descricao) VALUES ('Preto');
INSERT INTO COR (descricao) VALUES ('Branco');
INSERT INTO COR (descricao) VALUES ('Marrom');
INSERT INTO COR (descricao) VALUES ('Amarelo');
INSERT INTO COR (descricao) VALUES ('Laranja');
INSERT INTO COR (descricao) VALUES ('Cinza');

-- 3. Inserir Tutores (necessário para os animais)
INSERT INTO TUTOR (cpf, nome, rg, endereco, profissao, telefone) 
VALUES ('11111111111', 'Aline Freitas', '123456', 'Rua A, 1', 'Prof', '12345');
INSERT INTO TUTOR (cpf, nome, rg, endereco, profissao, telefone) 
VALUES ('22222222222', 'Ana Costa', '234567', 'Rua B, 2', 'Med', '23456');
INSERT INTO TUTOR (cpf, nome, rg, endereco, profissao, telefone) 
VALUES ('33333333333', 'André Barbosa', '345678', 'Rua C, 3', 'Eng', '34567');

-- 4. Inserir Animais (baseado no protótipo image_9532e2.png)
-- Especie: 0=Cachorro, 1=Gato
-- Sexo: 0=Fêmea, 1=Macho
-- Porte: 0=Pequeno, 1=Médio, 2=Grande
-- Cor IDs: 1=Preto, 2=Branco, 3=Marrom, 4=Amarelo, 5=Laranja, 6=Cinza

INSERT INTO ANIMAL (nome, raca, porte, data_nascimento, e_filhote, especie, sexo, status_acolhimento, tutor_id, cor_id)
VALUES ('Apolo', 'Amarelo', 0, '2022-10-10', false, 0, 1, true, '11111111111', 4);

INSERT INTO ANIMAL (nome, raca, porte, data_nascimento, e_filhote, especie, sexo, status_acolhimento, tutor_id, cor_id)
VALUES ('Amora', 'Preto', 1, '2023-01-25', false, 0, 0, true, '22222222222', 1);

INSERT INTO ANIMAL (nome, raca, porte, data_nascimento, e_filhote, especie, sexo, status_acolhimento, tutor_id, cor_id)
VALUES ('Athena', 'Branco', 0, '2022-07-22', false, 1, 0, true, '33333333333', 2);