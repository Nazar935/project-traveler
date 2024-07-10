document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.faq-question.active');
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
            currentlyActive.nextElementSibling.style.display = 'none';
        }
        item.classList.toggle('active');
        const answer = item.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});
