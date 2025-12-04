-- ... (Inserts de Funcionario, Cor e Tutor permanecem iguais) ...

-- 4. Inserir Animais (Atualizado com o campo castrado)
-- castrado: true/false

INSERT INTO ANIMAL (nome, raca, porte, data_nascimento, e_filhote, especie, sexo, status_acolhimento, castrado, tutor_id, cor_id)
VALUES ('Apolo', 'Amarelo', 0, '2022-10-10', false, 0, 1, true, true, '11111111111', 4);

INSERT INTO ANIMAL (nome, raca, porte, data_nascimento, e_filhote, especie, sexo, status_acolhimento, castrado, tutor_id, cor_id)
VALUES ('Amora', 'Preto', 1, '2023-01-25', false, 0, 0, true, false, '22222222222', 1);

INSERT INTO ANIMAL (nome, raca, porte, data_nascimento, e_filhote, especie, sexo, status_acolhimento, castrado, tutor_id, cor_id)
VALUES ('Athena', 'Branco', 0, '2022-07-22', false, 1, 0, true, true, '33333333333', 2);

INSERT INTO ANIMAL (nome, raca, porte, data_nascimento, e_filhote, especie, sexo, status_acolhimento, castrado, observacoes, tutor_id, cor_id)
VALUES ('Apolo', 'Amarelo', 0, '2022-10-10', false, 0, 1, true, true, 'Cão muito dócil, gosta de crianças.', '11111111111', 4);

INSERT INTO ANIMAL (nome, raca, porte, data_nascimento, e_filhote, especie, sexo, status_acolhimento, castrado, observacoes, tutor_id, cor_id)
VALUES ('Amora', 'Preto', 1, '2023-01-25', false, 0, 0, true, false, 'Alergia a ração de frango.', '22222222222', 1);

INSERT INTO ANIMAL (nome, raca, porte, data_nascimento, e_filhote, especie, sexo, status_acolhimento, castrado, observacoes, tutor_id, cor_id)
VALUES ('Athena', 'Branco', 0, '2022-07-22', false, 1, 0, true, true, null, '33333333333', 2);