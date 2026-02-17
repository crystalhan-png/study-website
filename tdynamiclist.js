document.addEventListener('DOMContentLoaded', function () {

  const dynamicList = document.getElementById('dynamic-list');
  const addButton = document.getElementById('add-item-button');
  const inputField = document.getElementById('new-item-input');
  const dateField = document.getElementById('reminder-date');

  // ADD BUTTON FUNCTIONALITY
  addButton.addEventListener('click', function () {
    const text = inputField.value.trim();
    const date = dateField.value;

    if (text === '') return;

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const textSpan = document.createElement('span');
    textSpan.classList.add('text');
    textSpan.contentEditable = true;
    textSpan.textContent = text;

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('date');

    if (date) {
      const formattedDate = new Date(date).toLocaleDateString('default', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      dateSpan.textContent = ` (${formattedDate})`;
    }


    li.appendChild(checkbox);
li.appendChild(textSpan);
li.appendChild(dateSpan);

    dynamicList.appendChild(li);

    inputField.value = '';
    dateField.value = '';
  });

  // REMOVE ITEM WHEN CHECKED
  dynamicList.addEventListener('change', function (e) {
    if (e.target.type === 'checkbox') {
      const li = e.target.closest('li');
      li.remove();
    }
  });

});
