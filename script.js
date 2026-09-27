
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

// URL do Google Apps Script
const URL_PLANILHA = "https://script.google.com/macros/s/AKfycbwmmQ0Xw_dLcNhGH9HEj4ao2g1MRIBJ5dqjADwOowAbJ_BOHTGNlf3JZJredA-xgcua/exec";


// Evento de envio
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Captura os valores
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;


    // Envia os dados para o Google Planilhas
    fetch(URL_PLANILHA, {
        method: "POST",

        body: JSON.stringify({
            nome: nome,
            email: email,
            telefone: telefone
        })
    })
    .then(response => response.text())

    .then(resultadoServidor => {

        // Mensagem na página
        resultado.innerHTML = `
            <h3>Cadastro realizado!</h3>

            <p><strong>Nome:</strong> ${nome}</p>

            <p><strong>E-mail:</strong> ${email}</p>

            <p><strong>Telefone:</strong> ${telefone}</p>
        `;

        // Alerta
        alert("Formulário preenchido com sucesso após cadastrar!");

        // Limpa o formulário
        formulario.reset();
    })

    .catch(erro => {

        console.error("Erro:", erro);

        alert("Ocorreu um erro ao enviar o cadastro.");
    });
});


// Evento do botão LIMPAR
formulario.addEventListener("reset", function() {

    resultado.innerHTML = "";

});