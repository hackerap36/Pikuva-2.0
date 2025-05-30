const input = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");
const micBtn = document.getElementById("micBtn");

// Suggestions
input.addEventListener("input", () => {
  const query = input.value.toLowerCase();
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(item => item.toLowerCase().includes(query));
      showSuggestions(filtered);
    });
});

function showSuggestions(list) {
  suggestionsBox.innerHTML = "";
  if (list.length === 0 || input.value === "") {
    suggestionsBox.style.display = "none";
    return;
  }
  suggestionsBox.style.display = "block";
  list.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item;
    div.onclick = () => {
      input.value = item;
      search();
    };
    suggestionsBox.appendChild(div);
  });
}

// Voice search
micBtn.onclick = () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.start();
  recognition.onresult = event => {
    input.value = event.results[0][0].transcript;
    search();
  };
};

// Redirect to results page
function search() {
  const q = input.value.trim();
  if (q) {
    window.location.href = `results.html?q=${encodeURIComponent(q)}`;
  }
}
