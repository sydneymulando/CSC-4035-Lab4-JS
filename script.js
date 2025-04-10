document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // 1. Check local storage for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode'); // Apply dark mode if saved

    }

    // 2. Add event listener to the button (if it exists)
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Toggle the .dark-mode class on the body
            body.classList.toggle('dark-mode');

            // 3. Save the user's preference to local storage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
                // Or remove the item if light is default: localStorage.removeItem('theme');
            }
        });
    } else {
        console.log("Theme toggle button not found on this page."); // Optional debug message
    }

// --- Fetch API User Loading Code (Add this section) ---
const loadUsersBtn = document.getElementById("loadUsersBtn");
const userList = document.getElementById("userList");

// Check if the button and list exist on the current page
if (loadUsersBtn && userList) {
    loadUsersBtn.addEventListener("click", async () => {
        // Optional: Show loading state
        userList.innerHTML = "<li>Loading...</li>";
        loadUsersBtn.disabled = true; // Prevent multiple clicks

        try {
            // Fetch data from the API
            const res = await fetch('https://jsonplaceholder.typicode.com/users');

            // Check if the response was successful
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // Parse the JSON response
            const users = await res.json();

            // Clear the loading message / previous list
            userList.innerHTML = "";

            // Populate the list with user names
            if (users && users.length > 0) {
                users.forEach(user => {
                    const li = document.createElement("li");
                    li.textContent = user.name; // Displaying the user's name
                    userList.appendChild(li);
                });
            } else {
                userList.innerHTML = "<li>No users found.</li>";
            }

        } catch (err) {
            // Handle errors (network issue, JSON parsing issue, etc.)
            console.error("Failed to load users:", err);
            userList.innerHTML = `<li>Error loading users. Check console.</li>`; // Display error to user
        } finally {
             // Re-enable button regardless of success or error
             loadUsersBtn.disabled = false;
        }
    });
} else {
    // Optional: Log if elements aren't found (useful if script runs on other pages)
    // console.log("User loading elements not found on this page.");
}

 // --- FAQ Interaction Code (Add this section) ---
 const questions = document.querySelectorAll(".question");

 if (questions.length > 0) {
     questions.forEach((q) => {
         // Find the answer element right after the question
         const answer = q.nextElementSibling;

         // Make sure the next element is indeed an answer paragraph
         if (answer && answer.classList.contains('answer')) {
             q.addEventListener("click", () => {
                 // Toggle the 'visible' class on the answer
                 answer.classList.toggle("visible");

                 // Optional: Change the '+' to '-' on the question using a class
                 // This avoids relying solely on CSS :has() for broader compatibility
                 q.classList.toggle('active'); // Add/remove 'active' class on the question H3
             });
         } else {
             console.warn("FAQ structure issue: No '.answer' element found immediately after:", q);
         }
     });
 } else {
     // Optional log if no FAQ questions found
     // console.log("No FAQ questions found on this page.");
 }

}); // End of DOMContentLoaded listener

