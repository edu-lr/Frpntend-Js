// Funciones para temas
async function votarTema(id, boton) {
    try {
        const res = await fetch(`/temas/${id}/votar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error('Error al votar');
        const data = await res.json();
        
        const contador = document.getElementById(`votos-${id}`);
        if (contador) {
            contador.textContent = data.votos;
            contador.classList.add('pulse');
            setTimeout(() => contador.classList.remove('pulse'), 300);
        }
        boton.classList.add('voted');
        boton.textContent = '✅ ¡Votado!';
        setTimeout(reordenarTemas, 500);
    } catch (error) {
        alert('No se pudo votar');
    }
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

// ============ FUNCIONES PARA ENLACES ============

// Agregar enlace
document.getElementById('form-agregar-enlace')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const temaId = this.querySelector('input[name="temaId"]').value;
    const titulo = this.querySelector('input[name="titulo"]').value;
    const url = this.querySelector('input[name="url"]').value;
    
    try {
        const res = await fetch(`/temas/${temaId}/enlaces`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, url })
        });
        if (!res.ok) throw new Error('Error al agregar enlace');
        
        window.location.reload();
    } catch (error) {
        alert('No se pudo agregar el enlace');
    }
});

// Votar por enlace
async function votarEnlace(temaId, enlaceId, boton) {
    try {
        const res = await fetch(`/temas/${temaId}/enlaces/${enlaceId}/votar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error('Error al votar');
        const data = await res.json();
        
        const contador = document.getElementById(`votos-enlace-${enlaceId}`);
        if (contador) {
            contador.textContent = data.votos;
            contador.classList.add('pulse');
            setTimeout(() => contador.classList.remove('pulse'), 300);
        }
        boton.classList.add('voted');
        boton.textContent = '✅ ¡Votado!';
        
        reordenarEnlaces();
    } catch (error) {
        alert('No se pudo votar por el enlace');
    }
}

// Eliminar enlace
async function eliminarEnlace(temaId, enlaceId) {
    if (!confirm('¿Eliminar este enlace?')) return;
    
    try {
        const res = await fetch(`/temas/${temaId}/enlaces/${enlaceId}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Error al eliminar');
        
        window.location.reload();
    } catch (error) {
        alert('No se pudo eliminar el enlace');
    }
}

// Reordenar visualmente los enlaces
function reordenarEnlaces() {
    const container = document.getElementById('enlaces-container');
    if (!container) return;
    
    const items = Array.from(container.children).filter(el => el.classList.contains('enlace-item'));
    items.sort((a, b) => {
        const votosA = parseInt(a.querySelector('.vote-count')?.textContent || 0);
        const votosB = parseInt(b.querySelector('.vote-count')?.textContent || 0);
        return votosB - votosA;
    });
    
    const fragment = document.createDocumentFragment();
    items.forEach(item => fragment.appendChild(item));
    container.appendChild(fragment);
}

// Editar enlace (solución simple con prompt)
function editarEnlaceForm(temaId, enlaceId) {
    const nuevoTitulo = prompt('Nuevo título del enlace:');
    if (nuevoTitulo === null) return;
    const nuevaUrl = prompt('Nueva URL:', 'https://');
    if (nuevaUrl === null) return;
    
    fetch(`/temas/${temaId}/enlaces/${enlaceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: nuevoTitulo, url: nuevaUrl })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al editar');
        window.location.reload();
    })
    .catch(() => alert('No se pudo editar el enlace'));
}

// Inicializar reordenamiento al cargar
document.addEventListener('DOMContentLoaded', reordenarTemas);