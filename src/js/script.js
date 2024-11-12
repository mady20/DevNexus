
// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('change', function () {
    if (this.checked) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference or prefer-color-scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
    themeToggle.checked = true;
}

// Sidebar toggle functionality
const openSidebarBtn = document.getElementById('open-sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar');
const leftSidebar = document.getElementById('left-sidebar');

openSidebarBtn.addEventListener('click', () => {
    leftSidebar.classList.add('open');
});

closeSidebarBtn.addEventListener('click', () => {
    leftSidebar.classList.remove('open' );
});

// using fetch api to load different pages asynchronously
function showHome() {
    fetch("/dn/src/views/home.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok" + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById("display").innerHTML = html;
        })
}


function showTagsContent() {
    document.getElementById("display").innerHTML = "";
    fetch('/dn/src/views/tags.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('display').innerHTML = html;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}


function showDashboard() {
    document.getElementById("display").innerHTML = "";
    fetch('/dn/src/views/dashboard.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('display').innerHTML = html;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}


function showAbout() {
    document.getElementById("display").innerHTML = "";
    fetch('/dn/src/views/about.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('display').innerHTML = html;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showProfile() {
    leftSidebar.classList.remove('open');
    document.getElementById("display").innerHTML = "";
    fetch('/dn/src/views/profile.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('display').innerHTML = html;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showPost(){
    fetch("/dn/src/views/post.html")
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok" + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById("display").innerHTML = html;
        })
        .catch(error => {
            console.error("There has been a problem with your fetch operation:", error);
        })
}

showHome();






