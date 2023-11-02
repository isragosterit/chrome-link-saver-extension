let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")  
const deleteBtn = document.getElementById("delete-btn")
const deleteItem = document.getElementById("delete")
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}

// Event listener for opening a new tab and saving the URL
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLeads()
    })
})

deleteBtn.addEventListener('click', function() {
    myLeads = [];
    listItems = '';
    localStorage.removeItem("myLeads");
    ulEl.innerHTML = '';
})

function renderLeads() {
    let listItems = ""
     
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
        <div class='container'>
            <li><a target='_blank' href='${myLeads[i]}'>${myLeads[i]}</a></li>
            <button class='delete' data-index='${i}'>Delete</button>
        </div>`
    }
    ulEl.innerHTML = listItems 

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(button.getAttribute('data-index'));
            myLeads.splice(index, 1);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            renderLeads();
        });
    });
}

 // add event listener for saving links
 inputBtn.addEventListener("click", function() {
    if (inputEl.value.trim() !== '') {
    myLeads.push(inputEl.value)
    inputEl.value='';
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads()
    }
})
 