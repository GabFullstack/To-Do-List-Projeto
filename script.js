// SALVAR
function salvarTarefas() {
  let lista = document.getElementById("lista");
  let tarefas = [];

  lista.querySelectorAll("li").forEach((li) => {
    let texto = li.querySelector("span").innerText;
    let concluida = li.querySelector("span").classList.contains("concluida");

    tarefas.push({ texto, concluida });
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// LIMPAR
function limparTudo() {
  document.getElementById("lista").innerHTML = "";
  localStorage.removeItem("tarefas");
  atualizarContador(); // ✔ aqui está certo
}

// ADICIONAR
function adicionarTarefa() {
  let input = document.getElementById("tarefa");
  let texto = input.value.trim();

  if (texto === "") return;

  let lista = document.getElementById("lista");

  let li = document.createElement("li");

  let span = document.createElement("span");
  span.innerText = texto;

  // concluir
  span.addEventListener("click", function () {
    span.classList.toggle("concluida");
    salvarTarefas();
  });

  let botao = document.createElement("button");
  botao.innerText = "❌";

  // deletar
  botao.addEventListener("click", function (e) {
    e.stopPropagation();
    li.remove();
    salvarTarefas();
    atualizarContador(); // ✔ você colocou aqui corretamente
  });

  li.appendChild(span);
  li.appendChild(botao);

  lista.appendChild(li);

  input.value = "";

  salvarTarefas();
  atualizarContador(); // ❌ ERRO: isso estava faltando no seu código
}

// CARREGAR
function carregarTarefas() {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  let lista = document.getElementById("lista");

  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = tarefa.texto;

    if (tarefa.concluida) {
      span.classList.add("concluida");
    }

    span.addEventListener("click", function () {
      span.classList.toggle("concluida");
      salvarTarefas();
    });

    let botao = document.createElement("button");
    botao.innerText = "❌";

    botao.addEventListener("click", function (e) {
      e.stopPropagation();
      li.remove();
      salvarTarefas();
      atualizarContador(); // ❌ ERRO: você esqueceu aqui
    });

    li.appendChild(span);
    li.appendChild(botao);

    lista.appendChild(li);
  });

  atualizarContador(); // ❌ ERRO: você esqueceu isso no final
}

// RODA QUANDO CARREGA
document.addEventListener("DOMContentLoaded", function () {
  carregarTarefas();
});

// CONTADOR
function atualizarContador() {
  let total = document.querySelectorAll("#lista li").length;

  // versão mais profissional (singular/plural)
  document.getElementById("contador").innerText =
    total === 1 ? "1 tarefa" : total + " tarefas";
}
