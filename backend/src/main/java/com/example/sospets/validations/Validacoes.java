package com.example.sospets.validations;

public class Validacoes {

    public static boolean isValidCPF(String cpf) {
        //Remove o que nao for numero
        String digits = cpf.replaceAll("\\D", "");

        //Apenas com 11 digitos
        if(digits.length() != 11) {
            return false;
        }

        //nao podem ser iguais
        if (digits.chars().distinct().count() == 1) {
            return false;
        }
        try{
            int[] d = new int[11];
            for (int i = 0; i < 11; i++) {
                d[i] = Character.digit(digits.charAt(i), 10);
            }
            int sum = 0;
            for (int i = 0; i < 9; i++) {
                sum += d[i] * (10-i);
            }
            int mod = sum % 11;
            int firstVerifier = (mod < 2) ? 0 : 11 - mod;
            if (d[9] != firstVerifier) {
                return false;
            }
            sum = 0;
            for (int i = 0; i < 10; i++) {
                sum += d[i] * (11-i);
            }
            mod = sum % 11;
            int secondVerifier = (mod < 2) ? 0 : 11 - mod;
            return d[10] == secondVerifier;
        } catch (NumberFormatException ex){
            return false;
        }
    }
    // -------------------------
    // VALIDACAO DE EMAIL
    // -------------------------
    public static boolean validarEmail(String email) {
        if (email == null) return false;

        // Regex padrao para emails validos
        String regex = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,}$";
        return email.matches(regex);
    }

    // -------------------------
    // VALIDACAO DE TELEFONE
    // Aceita:
    // (XX) XXXXX-XXXX
    // XX XXXXX-XXXX
    // XXXXXXXXXXX
    // -------------------------

    public static boolean validarTelefone(String telefone) {
        if (telefone == null) return false;

        // Remove tudo que nao for digito
        String digits = telefone.replaceAll("\\D", "");

        // Telefone brasileiro: 10 ou 11 digitos
        return digits.matches("^\\d{10,11}$");
    }

    // -------------------------
    // VALIDACAO PARA APENAS LETRAS
    // Aceita: letras acentuadas e espaços
    // -------------------------

    public static boolean apenasLetras(String texto) {
        if (texto == null) return false;
        // Aceita letras com acentos e espaco
        return texto.matches("^[A-Za-zÀ-ÖØ-öø-ÿ ]+$");
    }
}

