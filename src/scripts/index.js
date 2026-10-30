// Local Storage se data fetch karna
let brownies = JSON.parse(localStorage.getItem('brownies')) || [];

// HTML wale menu container ko select karna
const menuContainer = document.getElementById('menu-container');

// Data ko HTML cards mein convert kar ke show karna
function displayMenuOnHomePage() {
    menuContainer.innerHTML = ''; // Pehle purana clear karein
    
    // Agar menu khali hai toh message show karein
    if(brownies.length === 0) {
        menuContainer.innerHTML = `<p class="text-stone-600 col-span-3 text-center">Menu is currently empty. Please add items from the Admin Dashboard.</p>`;
        return;
    }

    // Har brownie object ke liye ek naya card banana
    brownies.forEach(item => {
        let cardHTML = `
            <article class="bg-stone-50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300">
                <!-- Dynamic image for all items -->
                <img src="${item.image}" alt="${item.name}" class="w-full h-56 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-bold text-stone-800 mb-2">${item.name}</h3>
                    <p class="text-stone-600 text-sm mb-4">${item.details}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-amber-900">Rs. ${item.price}</span>
                        <button class="bg-amber-900 text-white px-4 py-2 rounded-full text-sm hover:bg-stone-800 transition">Order Now</button>
                    </div>
                </div>
            </article>
        `;
        menuContainer.innerHTML += cardHTML;
    });
}

// Page load hoty hi menu display karna
displayMenuOnHomePage();

// --- TASK 2: API INTEGRATION USING AXIOS ---
const apiContainer = document.getElementById('api-data-container');

function fetchAPIData() {
    // API ka search endpoint use kiya hai taake specifically bakery items aayen
    axios.get('https://dummyjson.com/recipes/search?q=chocolate')
        .then(response => {
            // JavaScript array method .slice() se sirf top 3 recipes select ki hain
            const recipes = response.data.recipes.slice(0, 3);
            apiContainer.innerHTML = ''; 
            
            recipes.forEach(recipe => {
                let card = `
                    <article class="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                        <img src="${recipe.image}" alt="${recipe.name}" class="w-full h-48 object-cover">
                        <div class="p-5">
                            <h3 class="text-lg font-bold text-stone-800 mb-1">${recipe.name}</h3>
                            <p class="text-stone-600 text-sm mb-3">Difficulty: <span class="font-bold">${recipe.difficulty}</span></p>
                            <p class="text-amber-900 font-bold text-sm">Rating: ${recipe.rating} ⭐</p>
                        </div>
                    </article>
                `;
                apiContainer.innerHTML += card;
            });
        })
        .catch(error => {
            console.error("API Fetching Error:", error);
            apiContainer.innerHTML = `
                <div class="col-span-3 bg-red-50 text-red-600 p-4 rounded-lg text-center font-bold">
                    Failed to load API data. Please check your internet connection or try again later.
                </div>
            `;
        });
}

// API function ko call karna
fetchAPIData();