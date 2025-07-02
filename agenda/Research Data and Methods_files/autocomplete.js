document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('headermainsearch');
  const searchForm = searchInput.closest('form');
  const autocompleteContainer = document.createElement('div');
  autocompleteContainer.classList.add('autocomplete-container');
  searchForm.appendChild(autocompleteContainer);

  // Globale Variable zum Speichern der geladenen Daten
  let searchData = null;
  let currentFocusIndex = -1;

  // Dynamische URL für die JSON-Datei generieren
  function getSearchDataUrl() {
      const currentDomain = window.location.hostname;
      return `https://${currentDomain}?type=1337`;
  }

  // Funktion zum Vorab-Laden der Suchdaten
  async function preloadSearchData() {
      try {
          const response = await fetch(getSearchDataUrl());
          searchData = await response.json();
      } catch (error) {
          console.error('Fehler beim Vorab-Laden der Suchdaten:', error);
      }
  }

  // Funktion zum Filtern und Anzeigen von Vorschlägen
  function showAutocompleteResults(searchTerm) {
      if (searchTerm.length < 3 || !searchData) {
          autocompleteContainer.innerHTML = '';
          autocompleteContainer.style.display = 'none';
          currentFocusIndex = -1;
          return;
      }

      // Ergebnisse filtern, die den Suchbegriff enthalten (case-insensitive)
      const filteredResults = searchData.filter(item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Autocomplete-Vorschläge rendern
      autocompleteContainer.innerHTML = '';
      filteredResults.slice(0, 5).forEach((result, index) => {
          const suggestionElement = document.createElement('div');
          suggestionElement.classList.add('autocomplete-suggestion');
          suggestionElement.setAttribute('data-index', index);
          suggestionElement.innerHTML = `
              <a href="${result.url}">
                  ${highlightMatchedText(result.title, searchTerm)}
              </a>
          `;
          suggestionElement.addEventListener('click', () => {
              searchInput.value = result.title;
              window.location.href = result.url;
          });
          autocompleteContainer.appendChild(suggestionElement);
      });

      // Container sichtbar machen, wenn Ergebnisse vorhanden sind
      autocompleteContainer.style.display = filteredResults.length > 0 ? 'block' : 'none';
  }

  // Funktion zum Hervorheben des übereinstimmenden Textes
  function highlightMatchedText(text, searchTerm) {
      const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
      if (index === -1) return text;

      return `${text.slice(0, index)}<strong>${text.slice(index, index + searchTerm.length)}</strong>${text.slice(index + searchTerm.length)}`;
  }

  // Tastatursteuerung
  function handleKeyboardNavigation(event) {
      const suggestions = autocompleteContainer.querySelectorAll('.autocomplete-suggestion');
      
      if (suggestions.length === 0) return;

      // Entferne vorherige Markierung
      suggestions.forEach(el => el.classList.remove('active'));

      switch(event.key) {
          case 'ArrowDown':
              event.preventDefault();
              currentFocusIndex = (currentFocusIndex + 1) % suggestions.length;
              break;
          case 'ArrowUp':
              event.preventDefault();
              currentFocusIndex = (currentFocusIndex - 1 + suggestions.length) % suggestions.length;
              break;
          case 'Enter':
              if (currentFocusIndex !== -1) {
                  event.preventDefault();
                  const selectedSuggestion = suggestions[currentFocusIndex];
                  const link = selectedSuggestion.querySelector('a');
                  if (link) {
                      searchInput.value = link.textContent.trim();
                      window.location.href = link.getAttribute('href');
                  }
              }
              break;
          case 'Escape':
              autocompleteContainer.style.display = 'none';
              currentFocusIndex = -1;
              break;
      }

      // Markiere aktuellen Vorschlag
      if (currentFocusIndex !== -1) {
          suggestions[currentFocusIndex].classList.add('active');
          suggestions[currentFocusIndex].scrollIntoView({ block: 'nearest' });
      }
  }

  // Event-Listener für Eingabe hinzufügen
  searchInput.addEventListener('input', function() {
      showAutocompleteResults(this.value);
  });

  // Event-Listener für Tastatursteuerung
  searchInput.addEventListener('keydown', handleKeyboardNavigation);

  // Schließen des Autocomplete-Containers, wenn außerhalb geklickt wird
  document.addEventListener('click', function(event) {
      if (!searchForm.contains(event.target)) {
          autocompleteContainer.style.display = 'none';
          currentFocusIndex = -1;
      }
  });

  // CSS für Autocomplete hinzufügen
  const style = document.createElement('style');
  style.textContent = `
      .autocomplete-container {
          position: absolute;
          z-index: 1000;
          background-color: white;
          border: 1px solid #ddd;
          max-width: 100%;
          display: none;
          max-height: 300px;
          overflow-y: auto;
      }
      .autocomplete-suggestion {
          padding: 10px;
          cursor: pointer;
      }
      .autocomplete-suggestion.active,
      .autocomplete-suggestion:hover {
          background-color: #f1f1f1;
      }
      .autocomplete-suggestion a {
          text-decoration: none;
          color: black;
          display: block;
      }
      .autocomplete-suggestion strong {
          font-weight: bold;
          color: #a00000;
      }
  `;
  document.head.appendChild(style);

  // Suchdaten im Hintergrund vorab laden
  preloadSearchData();
});