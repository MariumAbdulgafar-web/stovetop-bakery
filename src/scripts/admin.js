let brownies = JSON.parse(localStorage.getItem('brownies')) || [];
let editId = null; // Ab hum index ki jagah unique ID use karenge

const form = document.getElementById('crud-form');
const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('searchInput');

// 1. map() - Array ko HTML DOM elements mein transform karna
function displayBrownies(dataToDisplay) {
    // map() har object ko HTML string banata hai, aur join('') unhe jor deta hai
    tableBody.innerHTML = dataToDisplay.map(item => `
        <tr class="border-b border-stone-100 hover:bg-stone-50 transition">
            <td class="p-3 font-bold text-amber-900">${item.name}</td>
            <td class="p-3 text-stone-600 text-sm">${item.details}</td>
            <td class="p-3 text-stone-800 font-medium">Rs. ${item.price}</td>
            <td class="p-3">
                <button onclick="editBrownie(${item.id})" class="text-blue-600 hover:text-blue-800 font-bold mr-3">Edit</button>
                <button onclick="deleteBrownie(${item.id})" class="text-red-600 hover:text-red-800 font-bold">Delete</button>
            </td>
        </tr>
    `).join('');
}

// CREATE & UPDATE
form.addEventListener('submit', function(e) {
    e.preventDefault();

    let name = document.getElementById('itemName').value;
    let details = document.getElementById('itemDetails').value;
    let price = document.getElementById('itemPrice').value;
    let image = document.getElementById('itemImage').value;

    // 2. some() - Validation: Check karna ke kya same naam ka item pehle se mojood hai
    let isDuplicate = brownies.some(item => item.name.toLowerCase() === name.toLowerCase() && item.id !== editId);
    if (isDuplicate) {
        alert("Yeh brownie pehle se menu mein mojood hai! Koi naya naam likhein.");
        return; 
    }

    if (editId === null) {
        // Naya item add karna (Date.now() se unique ID generate ki hai)
        let newBrownie = { id: Date.now(), name, details, price, image };
        brownies.push(newBrownie);
    } else {
        // 3. find() - Update karne ke liye specific record dhondna
        let itemToUpdate = brownies.find(item => item.id === editId);
        if(itemToUpdate) {
            itemToUpdate.name = name;
            itemToUpdate.details = details;
            itemToUpdate.price = price;
            itemToUpdate.image = image;
        }
        editId = null; 
        document.querySelector('button[type="submit"]').innerText = "Save Item";
    }

    localStorage.setItem('brownies', JSON.stringify(brownies));
    form.reset();
    displayBrownies(brownies);
});

// 4. filter() - Delete operation ke liye
window.deleteBrownie = function(id) {
    // Us ID wale item ko chhor kar baqi sab ko filter kar ke bacha lo
    brownies = brownies.filter(item => item.id !== id);
    localStorage.setItem('brownies', JSON.stringify(brownies));
    displayBrownies(brownies);
};

// find() - Edit mode mein data wapas form mein lana
window.editBrownie = function(id) {
    let itemToEdit = brownies.find(item => item.id === id);
    if(itemToEdit) {
        document.getElementById('itemName').value = itemToEdit.name;
        document.getElementById('itemDetails').value = itemToEdit.details;
        document.getElementById('itemPrice').value = itemToEdit.price;
        document.getElementById('itemImage').value = itemToEdit.image;
        
        editId = id; 
        document.querySelector('button[type="submit"]').innerText = "Update Item";
    }
};

// filter() - Search Box ke liye
searchInput.addEventListener('input', function() {
    let searchText = searchInput.value.toLowerCase();
    let filteredBrownies = brownies.filter(item => 
        item.name.toLowerCase().includes(searchText) || 
        item.details.toLowerCase().includes(searchText)
    );
    displayBrownies(filteredBrownies);
});

displayBrownies(brownies);