let products = JSON.parse(localStorage.getItem('products')) || {};

document.getElementById('product-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('product-name').value.trim();
  const price = parseFloat(document.getElementById('product-price').value);

  if (!name || isNaN(price)) return;

  // Add or update product
  products[name] = price;

  // Save to localStorage
  localStorage.setItem('products', JSON.stringify(products));

  // Clear form
  document.getElementById('product-form').reset();

  // Render table
  renderTable();
});

function renderTable() {
  const tbody = document.querySelector('#product-table tbody');
  tbody.innerHTML = '';

  for (let name in products) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${name}</td>
      <td>$${products[name].toFixed(2)}</td>
      <td><button onclick="editProduct('${name}')">Edit</button></td>
    `;

    tbody.appendChild(row);
  }
}

function editProduct(name) {
  document.getElementById('product-name').value = name;
  document.getElementById('product-price').value = products[name];
}

// Load table on page load
renderTable();
