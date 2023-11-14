// Fetch content from an external JSON file
fetch('changelog.json')
    .then(response => response.json())
    .then(content => {
        content.forEach(entry => {
            const sectionHtml = `
                <section>
                    <div class="date" data-target="date${entry.date}">${entry.date}</div>
                    <div id="date${entry.date}" class="content" style="display: none;">
                        ${entry.summary ? `<div class="summary"><strong>Summary:</strong> ${entry.summary.replace(/\n/g, '<br>')}</div>` : ''}
                        ${generateList('Added', 'added', entry)}
                        ${generateList('Fixed', 'fixed', entry)}
                        ${generateList('Deprecated', 'deprecated', entry)}
                        ${generateList('Removed', 'removed', entry)}
                        ${entry.description ? `<div class="description"><strong>Description:<br><br></strong> ${entry.description.replace(/\n/g, '<br>')}</div>` : ''}
                    </div>
                </section>`;

            document.body.innerHTML += sectionHtml;
        });

        document.querySelectorAll('.date, .header').forEach(element => {
            element.addEventListener('click', function () {
                toggleContent(this.dataset.target);
            });
        });
    })
    .catch(error => console.error('Error fetching content:', error));

function toggleContent(targetId) {
    var content = document.getElementById(targetId);
    content.style.display = (content.style.display === 'none') ? 'block' : 'none';
}

function generateList(title, type, entry) {
    const changes = entry.changes || [];
    const filteredChanges = changes.filter(change => change.type === type);

    if (filteredChanges.length === 0) {
        return '';
    }

    return `
        <ul class="${type}">
            <strong>${title}:</strong>
            ${filteredChanges.map(change => `<li>&#8226; ${change.text.replace(/\n/g, '<br>')}</li>`).join('')}
        </ul>`;
}
