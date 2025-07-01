const nome = document.getElementById("nome");
const email = document.getElementById("email");
const contato = document.getElementById("contato");
const cep = document.getElementById("cep");
const formulario = document.getElementById("formu");
const resultado = document.getElementById("resultado");

const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");

// EVENTO DE SUBMISSÃO DO FORMULÁRIO
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!nome.value || !email.value || !contato.value || !cep.value) {
    resultado.innerHTML = "Preencha todos os campos";
    resultado.style.color = "red";
    return;
  } else {
    resultado.textContent = "Formulário Enviado";
    resultado.style.color = "green";
  }
});

//  EVENTO DE SAÍDA DO CAMPO CEP
cep.addEventListener("blur", () => {
  const cepLimpo = cep.value.replace(/\D/g, ""); // Remove não numéricos

  if (cepLimpo.length !== 8) {
    resultado.innerHTML = "CEP Inválido (deve ter 8 dígitos)";
    resultado.style.color = "red";
    limparCampos();
    return;
  }
   // em caso de erros do API
  const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }
      return response.json();
    })
    .then((data) => {
      if (data.erro) {
        resultado.textContent = "CEP não encontrado";
        resultado.style.color = "red";
        limparCampos();
        return;
      }

      rua.value = data.logradouro;
      bairro.value = data.bairro;
      cidade.value = data.localidade;
      estado.value = data.uf;

      resultado.textContent = "Endereço carregado com sucesso";
      resultado.style.color = "green";
    })
    .catch((error) => {
      resultado.textContent = "Erro ao buscar CEP";
      resultado.style.color = "red";
      limparCampos();
    });
});

// FUNÇÃO PARA LIMPAR CAMPOS
function limparCampos() {
  rua.value = "";
  bairro.value = "";
  cidade.value = "";
  estado.value = "";
}
