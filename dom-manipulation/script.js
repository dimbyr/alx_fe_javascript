document.addEventListener(
  "DOMContentLoaded",
  function(){
    const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
    // [
    //   {
    //     text: "Blablablalba blab al bla bla bla bl",
    //     category: "Funny"
    //   },
    //   {
    //     text: "You are what you eat",
    //     category: "Life"
    //   },
    //   {
    //     text: "Education is a powerful tool you can use to change the world",
    //     category: "Politics"
    //   }
    // ];

    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteButton = document.getElementById("newQuote");
    const createQuoteButton = document.getElementById("createQuote");
    const newQuoteForm = document.getElementById("addFormQuoteContainer");
    const exportButton = document.getElementById("export");
    const filterButton = document.getElementById("categoryFilter");
    const importButton = document.getElementById("importFile");

    populateCategories(quotes);

    quoteDisplay.innerHTML = JSON.parse(sessionStorage.getItem("lastViewed")) || "";
    const selectedCategory = JSON.parse(localStorage.getItem('category')) || "all";
    
    for(var i, j = 0; i = filterButton.options[j]; j++) {
      if(i.value == selectedCategory) {
          filterButton.selectedIndex = j;
          break;
      }
    }

    function showRandomQuote(qt = quotes, category = selectedCategory){
      let selectedQuotes = filterQuote(qt, category);
      let quoteIndex = Math.floor(Math.random()*selectedQuotes.length);
      let randomQuote = selectedQuotes[quoteIndex];
      let viewed = `<p>\"${randomQuote.text}\"</p> <p> Category: ${randomQuote.category}</p>`;
      quoteDisplay.innerHTML = viewed;
      sessionStorage.setItem("lastViewed", JSON.stringify(viewed));
    }

    newQuoteButton.addEventListener("click", function(){
      const categ = filterButton.value;
      showRandomQuote(quotes, categ);}
    );

    function addQuote(){
      const newText = document.getElementById("newQuoteText").value;
      const newCategory = document.getElementById("newQuoteCategory").value;
      if (newText) {quotes.push({text: newText, category: newCategory});
      populateCategories(quotes);
      alert(`Submitted quote of category ${newCategory}`);
      localStorage.setItem("quotes", JSON.stringify(quotes));}
      // console.table(quotes);
      
    }

    function createAddQuoteForm(){
      const quoteForm = document.createElement('form');
      quoteForm.innerHTML = `
            <h2>Create new quote</h2>
            <input id="newQuoteText" type="text" required placeholder="Enter a new quote" />
            <br>
            <input id="newQuoteCategory" type="text" required placeholder="Enter quote category" />
            <br>
            <button type = "button" id = "addQuoteButton">Add Quote</button>
            <br>
            `;
      newQuoteForm.appendChild(quoteForm);

      const addQuoteButton = document.getElementById("addQuoteButton");
      addQuoteButton.addEventListener("click", function(){
        addQuote();
        quoteForm.reset(); // reset quote form
        newQuoteForm.innerHTML = ""; // Remove the form after submission
        createQuoteButton.style.display = "inline"; // Show the create quote button again
      }
      ); 
    }
    createQuoteButton.addEventListener('click', function(event){
      createAddQuoteForm();
      event.target.style.display = "none";
    }
    );

    function exportQuote(){
      const quoteData = new Blob([JSON.stringify(quotes)], {type: 'application/json'});
      const quoteUrl = URL.createObjectURL(quoteData);
      const a = document.createElement('a');
      a.href = quoteUrl;
      a.download = "quotes.json"
      a.textContent = "Export Quotes";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); //
      URL.revokeObjectURL(quoteUrl); //free up memory
    }

    exportButton.addEventListener('click',
      exportQuote
    )

    function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        populateCategories(quotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        // saveQuotes();
        alert('Quotes imported successfully!');
      };
      fileReader.readAsText(event.target.files[0]);
    }

    importButton.addEventListener("change", function(event){importFromJsonFile(event);});

    function filterQuote(quotesArray, category) {
      let cat = category.toLowerCase();
      if (cat === 'all') {
        return quotesArray;
      } else {
        return quotesArray.filter(q => q.category.toLowerCase() === cat);
      }
    }

    function populateCategories(quotes) {
      const allCategories = categoryFilter(quotes);
      let optionElements = '';
    
      allCategories.forEach(ct => {
        optionElements += `<option value="${ct}">${ct}</option>`;
      });
    
      filterButton.innerHTML = optionElements;
      filterButton.style.textTransform = "capitalize";
      filterButton.addEventListener("change",
        (event) => {
         localStorage.setItem("category", JSON.stringify(event.target.value));
        }
      )
    }
    
    function categoryFilter(quotesArray) {
      const categories = extractCategory(quotesArray);
      const existingCategories = Array.from(document.querySelectorAll('#categoryFilter>option'))
        .map(option => option.value.toLowerCase());
    
      return [...new Set([...categories, ...existingCategories])];
    }
    
    function extractCategory(quotesArray) {
      const categories = [];
      quotesArray.forEach(qt => {
        if (!categories.includes(qt.category.toLowerCase())) {
          categories.push(qt.category.toLowerCase());
        }
      });
      return categories;
    }
    
  }
)