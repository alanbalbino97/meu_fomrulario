
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const botaoEnviar = formulario.querySelector(
    'button[type="submit"], button:not([type]), input[type="submit"]'
);

const URL_PLANILHA = "https://script.google.com/macros/s/AKfycbwmmQ0Xw_dLcNhGH9HEj4ao2g1MRIBJ5dqjADwOowAbJ_BOHTGNlf3JZJredA-xgcua/exec";

let enviando = false;

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    // Impede envios simultâneos
    if (enviando) {
        return;
    }

    enviando = true;
    botaoEnviar.disabled = true;
    botaoEnviar.value !== undefined
        ? botaoEnviar.value = "Enviando..."
        : botaoEnviar.textContent = "Enviando...";

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    try {
        const resposta = await fetch(URL_PLANILHA, {
            method: "POST",
            body: JSON.stringify({
                nome: nome,
                email: email,
                telefone: telefone
            })
        });

        if (!resposta.ok) {
            throw new Error("Falha na comunicação com o servidor.");
        }

        resultado.innerHTML = `
            <h3>Cadastro enviado!</h3>
            <p>Nome: ${nome}</p>
            <p>E-mail: ${email}</p>
            <p>Telefone: ${telefone}</p>
        `;

        alert("Cadastro enviado!");

        formulario.reset();

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Não foi possível confirmar o envio. Verifique a planilha antes de tentar novamente.");
    } finally {
        enviando = false;
        botaoEnviar.disabled = false;

        if (botaoEnviar.tagName === "INPUT") {
            botaoEnviar.value = "Enviar";
        } else {
            botaoEnviar.textContent = "Enviar";
        }
    }
});

formulario.addEventListener("reset", function() {
    resultado.innerHTML = "";
});
