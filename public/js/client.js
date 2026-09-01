function votarTema(id, boton) {
  fetch(`/temas/${id}/votar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    if (!res.ok) throw new Error('Error en votación');
    return res.json();
  })
  .then(data => {
    const contador = document.getElementById(`votos-${id}`);
    if (contador) {
      contador.textContent = data.votos;
      contador.classList.add('pulse');
      setTimeout(() => contador.classList.remove('pulse'), 300);
    }
    boton.classList.add('voted');
    boton.textContent = '✅ ¡Votado!';
    setTimeout(reordenarTemas, 500);
  })
  .catch(err => {
    console.error('Error:', err);
    alert('No se pudo votar');
  });
}

function reordenarTemas() {
  const grid = document.querySelector('.temas-grid');
  if (!grid) return;
  const tarjetas = Array.from(grid.children);
  tarjetas.sort((a, b) => {
    const votosA = parseInt(a.querySelector('.vote-count')?.textContent || 0);
    const votosB = parseInt(b.querySelector('.vote-count')?.textContent || 0);
    return votosB - votosA;
  });
  grid.innerHTML = '';
  tarjetas.forEach(t => grid.appendChild(t));
}

document.addEventListener('DOMContentLoaded', reordenarTemas);