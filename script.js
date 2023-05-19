fetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
.then(response => response.json())
.then(data => {
  // Filter function
  const filterDevelopers = () => {
    const nameFilterValue = document.getElementById('nameFilter').value.toLowerCase();
    const designationFilterValue = document.getElementById('designationFilter').value.toLowerCase();

    const filteredDevelopers = data.employees.filter(developer => {
      const name = developer.name ? developer.name.toLowerCase() : '';
      const designation = developer.designation ? developer.designation.toLowerCase() : '';
      const skills = developer.skills ? developer.skills.join(' ').toLowerCase() : '';

      return name.includes(nameFilterValue) && (designation.includes(designationFilterValue) || skills.includes(designationFilterValue));
    });

    renderDevelopers(filteredDevelopers);
  };

  // Render function
  const renderDevelopers = (developers) => {
    const developerList = document.getElementById('developerList');
    developerList.innerHTML = '';

    developers.forEach(developer => {
      const card = document.createElement('div');
      card.classList.add('developer-card');

      const name = document.createElement('h2');
      name.textContent = developer.name || 'N/A';

      const designation = document.createElement('p');
      designation.textContent = developer.designation || 'N/A';

      const skills = document.createElement('p');
      skills.textContent = developer.skills ? developer.skills.join(', ') : 'N/A';

      card.appendChild(name);
      card.appendChild(designation);
      card.appendChild(skills);

      developerList.appendChild(card);
    });
  };

  // Event listeners for filtering
  document.getElementById('nameFilter').addEventListener('input', filterDevelopers);
  document.getElementById('designationFilter').addEventListener('input', filterDevelopers);

  // Initial rendering
  renderDevelopers(data.employees);
})
.catch(error => {
  console.log('Error fetching JSON data:', error);
});

// Function to handle the search/filter functionality
function filterDevelopers() {
  const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
  const designationFilter = document.getElementById('designationFilter').value.toLowerCase();

  const rows = document.querySelectorAll('#developersTable tbody tr');

  rows.forEach(row => {
    const name = row.querySelector('td:first-child').textContent.toLowerCase();
    const designation = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

    if (name.includes(nameFilter) && designation.includes(designationFilter)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Attach event listeners to the filter inputs
document.getElementById('nameFilter').addEventListener('input', filterDevelopers);
document.getElementById('designationFilter').addEventListener('input', filterDevelopers);
