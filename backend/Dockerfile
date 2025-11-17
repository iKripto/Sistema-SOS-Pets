# Estágio 1: Build (Construção)
# Usamos uma imagem oficial do Eclipse Temurin (Java 21) com JDK completo para compilar
FROM eclipse-temurin:21-jdk-jammy AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do Maven Wrapper e o pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# --- CORREÇÃO ADICIONADA AQUI ---
# Dá permissão de execução ao script do Maven Wrapper
RUN chmod +x mvnw

# Baixa as dependências do Maven (acelera builds futuros)
RUN ./mvnw dependency:go-offline

# Copia o resto do código-fonte
COPY src ./src

# Compila a aplicação e gera o .jar, pulando os testes
RUN ./mvnw clean package -DskipTests


# Estágio 2: Run (Execução)
# Usamos uma imagem JRE (Java Runtime Environment) que é muito menor
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copia apenas o .jar final do estágio de build
COPY --from=builder /app/target/sos-pets-0.0.1-SNAPSHOT.jar ./app.jar

# Expõe a porta 8080 (padrão do Spring Boot)
EXPOSE 8080

# Comando para iniciar a aplicação
# O perfil (prod) será definido nas variáveis de ambiente do Render
CMD ["java", "-jar", "app.jar"]