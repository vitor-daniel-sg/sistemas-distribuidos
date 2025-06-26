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

  if (input.includes("chave")) {
    resultados.innerHTML = "<p>Chave prateada encontrada na biblioteca.</p>";
  } else {
    resultados.textContent = "Nenhum resultado encontrado.";
  }
}