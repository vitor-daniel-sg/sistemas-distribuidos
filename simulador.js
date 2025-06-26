// Estados compartilhados via localStorage
const nodesKey = 'nodos';
const totalKey = 'totalReqs';
const latencyKey = 'totalLatency';

let nodes = JSON.parse(localStorage.getItem(nodesKey)) || [
  { name: 'Nó 1', up: true, count: 0, totalLatency: 0 },
  { name: 'Nó 2', up: true, count: 0, totalLatency: 0 },
  { name: 'Nó 3', up: true, count: 0, totalLatency: 0 }
];
let currentNode = 0;
let totalRequests = parseInt(localStorage.getItem(totalKey)) || 0;
let totalLatency = parseFloat(localStorage.getItem(latencyKey)) || 0;

function salvarEstado() {
  localStorage.setItem(nodesKey, JSON.stringify(nodes));
  localStorage.setItem(totalKey, totalRequests);
  localStorage.setItem(latencyKey, totalLatency);
}

function initSimulador() {
  const container = document.getElementById('nodes');
  if (!container) return;

  container.innerHTML = '';
  nodes.forEach((node, idx) => {
    const div = document.createElement('div');
    div.className = 'node' + (node.up ? '' : ' down');
    div.id = `node-${idx}`;
    div.innerHTML = `<span>${node.name}</span><div class="count">${node.count}</div>`;
    div.onclick = () => toggleNode(idx);
    container.appendChild(div);
  });

  updateMetrics();
}

function toggleNode(idx) {
  nodes[idx].up = !nodes[idx].up;
  document.getElementById(`node-${idx}`)
    .classList.toggle('down', !nodes[idx].up);
  salvarEstado();
}

function enviarRequisicao(origem = '') {
  let tentativas = 0;
  while (!nodes[currentNode].up && tentativas < nodes.length) {
    currentNode = (currentNode + 1) % nodes.length;
    tentativas++;
  }

  const statusEl = document.getElementById('status');
  if (!nodes[currentNode].up) {
    if (statusEl) statusEl.textContent = 'Status: nenhum nó disponível!';
    return;
  }

  const latency = 100 + Math.random() * 400;
  if (statusEl) statusEl.textContent = `Status: ${origem} enviando para ${nodes[currentNode].name}...`;

  setTimeout(() => {
    const node = nodes[currentNode];
    node.count++;
    node.totalLatency += latency;
    totalRequests++;
    totalLatency += latency;

    const nodeDiv = document.querySelector(`#node-${currentNode} .count`);
    if (nodeDiv) nodeDiv.textContent = node.count;

    if (statusEl) {
      statusEl.textContent = `Status: ${origem} resposta de ${node.name} em ${Math.round(latency)}ms`;
    }

    salvarEstado();
    updateMetrics();
    currentNode = (currentNode + 1) % nodes.length;
  }, latency);
}

function updateMetrics() {
  const avg = totalRequests === 0 ? 0 : Math.round(totalLatency / totalRequests);
  const totalEl = document.getElementById('totalReq');
  const avgEl = document.getElementById('avgLatency');
  if (totalEl) totalEl.textContent = totalRequests;
  if (avgEl) avgEl.textContent = avg;
}
