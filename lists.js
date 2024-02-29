document.getElementById('newListInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addList();
    }
});

document.getElementById('homeLink').addEventListener('click', function() {
    window.location.href = "index.html";
});

let lists = [];

function loadLists() {
    const storedLists = localStorage.getItem('lists');
    if (storedLists) {
        lists = JSON.parse(storedLists);
        renderLists();
    }
}

function saveLists() {
    localStorage.setItem('lists', JSON.stringify(lists));
}

loadLists();

function renderLists() {
    const listsElement = document.getElementById('lists');
    listsElement.innerHTML = '';
    lists.forEach((list, index) => {
        const li = document.createElement('li');
        li.textContent = list.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-button'); 
        deleteButton.addEventListener('click', (event) => deleteList(index, event));
        li.appendChild(deleteButton);

        li.addEventListener('click', () => showList(index));
        listsElement.appendChild(li);
    });
}

function deleteList(index, event) {
    event.stopPropagation();
    lists.splice(index, 1);
    saveLists();
    renderLists();
}

function addList() {
    const newListName = document.getElementById('newListInput').value.trim();
    if (newListName === '') {
        alert('Please enter a valid list name.');
        return;
    }
    lists.push({ name: newListName, items: [] });
    saveLists();
    renderLists();
}
