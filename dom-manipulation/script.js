document.addEventListener(
  "DOMContentLoaded",
  function(){
    const quotes = [
      {
        text: "Blablablalba blab al bla bla bla bl",
        category: "Funny"
      },
      {
        text: "You are what you eat",
        category: "Life"
      },
      {
        text: "Education is a powerful tool you can use to change the world",
        category: "Politics"
      }
    ];

    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteButton = document.getElementById("newQuote");
    const createQuoteButton = document.getElementById("createQuote");
    const newQuoteForm = document.getElementById("addFormQuoteContainer");

    function showRandomQuote(){
      const quoteIndex = Math.floor(Math.random()*quotes.length);
      const randomQuote = quotes[quoteIndex];
      quoteDisplay.innerHTML = `<p>\"${randomQuote.text}\"</p> <p> Category: ${randomQuote.category}</p>`;
    }

    newQuoteButton.addEventListener("click",
      showRandomQuote
    );

    function createAddQuoteForm(){
      const quoteForm = document.createElement('form');
      quoteForm.innerHTML = `
      <h2>Create new quote</h2>
      <input id="newQuoteText" type="text" required placeholder="Enter a new quote" />
      <br>
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <br>
    <button onclick="addQuote()">Add Quote</button>
    <br>
      `;
      newQuoteForm.appendChild(quoteForm);
    }
    createQuoteButton.addEventListener('click', function(event){
      createAddQuoteForm();
      event.target.style.display = "none";
    }
    );
  }
)