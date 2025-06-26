function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function pesquisar() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const resultados = document.getElementById('resultados');

  if (!input) {
    resultados.textContent = "Nenhum resultado encontrado.";
    return;
  }

  // Exemplo: lógica fictícia de correspondência
  if (input.includes("chave")) {
    resultados.innerHTML = "<p>Chave prateada encontrada na biblioteca.</p>";
  } else {
    resultados.textContent = "Nenhum resultado encontrado.";
  }


  
}

// --- Simulador Distributed System ---
const nodes = [
  { name: 'Nó 1', up: true, count: 0, totalLatency: 0 },
  { name: 'Nó 2', up: true, count: 0, totalLatency: 0 },
  { name: 'Nó 3', up: true, count: 0, totalLatency: 0 }
];
let currentNode = 0;
let totalRequests = 0;

function initSimulador() {
  const container = document.getElementById('nodes');
  nodes.forEach((node, idx) => {
    const div = document.createElement('div');
    div.className = 'node';
    div.id = `node-${idx}`;
    div.innerHTML = `<span>${node.name}</span><div class="count">0</div>`;
    div.onclick = () => toggleNode(idx);
    container.appendChild(div);
  });
  updateMetrics();
}

function toggleNode(idx) {
  nodes[idx].up = !nodes[idx].up;
  document.getElementById(`node-${idx}`)
    .classList.toggle('down', !nodes[idx].up);
}

function enviarRequisicao() {
  let tentativas = 0;
  while (!nodes[currentNode].up && tentativas < nodes.length) {
    currentNode = (currentNode + 1) % nodes.length;
    tentativas++;
  }
  const statusEl = document.getElementById('status');
  if (!nodes[currentNode].up) {
    statusEl.textContent = 'Status: nenhum nó disponível!';
    return;
  }
  const latency = 100 + Math.random() * 400;
  statusEl.textContent = `Status: enviando para ${nodes[currentNode].name}...`;
  setTimeout(() => {
    const node = nodes[currentNode];
    node.count++;
    node.totalLatency += latency;
    totalRequests++;
    document.querySelector(`#node-${currentNode} .count`).textContent = node.count;
    statusEl.textContent = `Status: resposta de ${node.name} em ${Math.round(latency)}ms`;
    updateMetrics();
    currentNode = (currentNode + 1) % nodes.length;
  }, latency);
}

function updateMetrics() {
  document.getElementById('totalReq').textContent = totalRequests;
  const avg = totalRequests === 0
    ? 0
    : Math.round(nodes.reduce((sum, n) => sum + n.totalLatency, 0) / totalRequests);
  document.getElementById('avgLatency').textContent = avg;
}

window.addEventListener('DOMContentLoaded', initSimulador);

