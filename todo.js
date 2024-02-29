function saveLists() {
    localStorage.setItem('lists', JSON.stringify(lists));
}

function saveListContent(index) {
    const listContentKey = `list_${index}_content`;
    localStorage.setItem(listContentKey, JSON.stringify(lists[index].items));
}

function loadListContent(index) {
    const listContentKey = `list_${index}_content`;
    const storedContent = localStorage.getItem(listContentKey);
    if (storedContent) {
        lists[index].items = JSON.parse(storedContent);
    }
}

function addList() {
    const newListName = document.getElementById('newListInput').value.trim();
    if (newListName === '') {
        alert('Please enter a valid list name.');
        return;
    }
    lists.push({ name: newListName, items: [] });
    saveLists();
    saveListContent(lists.length - 1);
    renderLists();
}

function showList(index) {
    loadListContent(index);
    const list = lists[index];
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = `<h1>${list.name}</h1>`;
    const ul = document.createElement('ul');

    list.items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="checkbox" onclick="toggleCheckbox(${index}, ${idx})">&#9675;</span>
            <span class="list-item-text" ondblclick="editListItem(${index}, ${idx})">${item}</span>
        `;

        li.querySelector('.list-item-text').addEventListener('click', function() {
            this.classList.toggle('completed');
        });

        ul.appendChild(li);
    });

    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', 'Add new item');
    inputField.classList.add('new-item-input');
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addItem(index, event.target.value);
            event.target.value = '';
        }
    });

    contentElement.appendChild(ul);
    contentElement.appendChild(inputField);

    const listItems = ul.querySelectorAll('.list-item-text');
    listItems.forEach((item, idx) => {
        item.addEventListener('dblclick', () => editListItem(index, idx));
    });
}

function addItem(listIndex, newItem) {
    lists[listIndex].items.push(newItem);
    saveListContent(listIndex);
    showList(listIndex);

    const inputField = document.querySelector('.new-item-input');
    if (inputField) {
        inputField.focus();
    }
}

function editListItem(listIndex, itemIndex) {
    const listItemText = lists[listIndex].items[itemIndex];
    const newText = prompt('Edit item:', listItemText);
    if (newText !== null) {
        lists[listIndex].items[itemIndex] = newText;
        saveListContent(listIndex);
        showList(listIndex);
    }
}
