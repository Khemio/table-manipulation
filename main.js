import './style.css'

const linkRows = document.querySelectorAll('tr[data-href]');
const tBody = document.querySelector('tbody');
const searchInputs = document.querySelectorAll('.search-input');

let validCells = [];

const observer = new MutationObserver(mutations => {
  const newRows = mutations[0].addedNodes;
  newRows.forEach(row => {
    setUpRow(row);
    validCells.forEach((column, index) => column.push(row.querySelectorAll('td')[index]));
  });
});

observer.observe(tBody, {
  childList: true,
})

searchInputs.forEach(inputField => {
  const tableRows = inputField.closest('table').querySelectorAll('tbody tr');
  const headerCell = inputField.closest('th');
  const otherHeaderCells = inputField.closest('tr').querySelectorAll('th');
  const columnIndex = Array.from(otherHeaderCells).indexOf(headerCell);
  const searchableCells = Array.from(tableRows).map(row => row.querySelectorAll('td')[columnIndex]);
  validCells.push(searchableCells);

  inputField.addEventListener('input', () => {
    const searchQuery = inputField.value.toLowerCase();

    // searchableCells.forEach(tableCell => {
    validCells[columnIndex].forEach(tableCell => {
      const row = tableCell.closest('tr');
      const value = tableCell.textContent.toLocaleLowerCase().replace(',', '');
      
      row.style.visibility = null;
      if (value.search(searchQuery) === -1) {
        row.style.visibility = 'collapse';
      }
    })
  })
})

const setUpRow = row => {
  row.addEventListener('click', () => location.href = row.dataset.href);
  row.addEventListener('mouseenter', () => row.classList.add('active-row'));
  row.addEventListener('mouseleave', () => row.classList.remove('active-row'));
}

linkRows.forEach(row => setUpRow(row));


// Event delegation approach

// tBody.addEventListener('click', (e) => {
//   const href = e.target.parentElement.dataset.href;
//   location.href = href;
// })

const addJohn = () => {
  const row = document.createElement('tr');
  row.dataset.href = 'http://www.youtube.com';
  row.innerHTML = `
    <td>John</td>
    <td>25</td>
    <td>Engineer</td>
    <td>UK</td>
  `;

  // validCells.forEach((column, index) => column.push(row.querySelectorAll('td')[index]))
  // setUpRow(row);

  tBody.appendChild(row);
}
addJohn();