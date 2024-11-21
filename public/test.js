document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão de enviar o formulário

        // Redireciona para a página linguagens.html
        window.location.href = 'linguagens.html';
    });
});
