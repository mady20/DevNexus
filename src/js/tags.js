const searchBox = document.getElementById('searchBox');
const tagContainer = document.getElementById('tagContainer');
const tags = tagContainer.getElementsByClassName('tag');

searchBox.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    Array.from(tags).forEach(tag => {
        const tagText = tag.textContent.toLowerCase();
        tag.style.display = tagText.includes(query) ? 'inline-block' : 'none';
    });
});

