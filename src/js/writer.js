
function markdownToHTML(markdown) {
    markdown = markdown.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-4 mb-2">$1</h1>');
    markdown = markdown.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mt-3 mb-1">$1</h2>');
    markdown = markdown.replace(/^### (.+)$/gm, '<h3 class="text-xl font-medium mt-2 mb-1">$1</h3>');
    markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>');
    markdown = markdown.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
    markdown = markdown.replace(/^- (.+)$/gm, '<li class="list-disc pl-5">$1</li>');
    markdown = markdown.replace(/^\d+\. (.+)$/gm, '<li class="list-decimal pl-5">$1</li>');
    markdown = markdown.replace(/<li>(.+)<\/li>/g, '<ul class="mb-2"><li>$1</li></ul>');
    markdown = markdown.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-500 hover:underline">$1</a>');
    markdown = markdown.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="mt-4 max-w-full h-auto">');
    return markdown;
}

function generatePost() {
    var markdownInput = document.getElementById('markdown-input').value;
    var preview = document.getElementById('preview');

    // Show preview and hide textarea
    preview.innerHTML = markdownToHTML(markdownInput);
    document.getElementById('markdown-input').classList.add('hidden');
    preview.classList.remove('hidden');
}

function closeEditor() {
    // Optionally handle closing logic here
}

function formatText(type) {
    var textarea = document.getElementById('markdown-input');
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var selectedText = textarea.value.substring(start, end);
    var replacement = '';

    switch (type) {
        case 'bold':
            replacement = `**${selectedText}**`;
            break;
        case 'italic':
            replacement = `*${selectedText}*`;
            break;
        case 'link':
            replacement = `[${selectedText}](url)`;
            break;
        case 'ol':
            replacement = `1. ${selectedText}`;
            break;
        case 'ul':
            replacement = `- ${selectedText}`;
            break;
        case 'h1':
            replacement = `# ${selectedText}`;
            break;
        case 'h2':
            replacement = `## ${selectedText}`;
            break;
        case 'h3':
            replacement = `### ${selectedText}`;
            break;
        case 'code':
            replacement = `\`${selectedText}\``;
            break;
        case 'quote':
            replacement = `> ${selectedText}`;
            break;
        case 'image':
            replacement = `![${selectedText}](image_url)`;
            break;
    }

    textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    textarea.focus();
    textarea.selectionStart = start + replacement.length;
    textarea.selectionEnd = start + replacement.length;
}






