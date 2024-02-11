function redirectToMainSite() {
  window.location.href = "https://nino-os.github.io/dashboard/";
}

function copyCommand(command) {
  const commandElement = document.querySelector(
    `code[id="command"][onclick*="${command}"]`
  );
  if (commandElement) {
    const commandText = commandElement.textContent;

    navigator.clipboard
      .writeText(commandText)
      .then(function () {
        const alert = document.createElement("div");
        alert.className = "alert alert-success";
        alert.textContent = "Command copied: " + commandText;
        document.body.appendChild(alert);

        setTimeout(() => {
          alert.style.display = "none";
        }, 2000);
      })
      .catch(function (error) {
        return;
      });
  } else {
    return;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const sections = document.querySelectorAll("section");
  const restButton = document.getElementById("clear-button");

  function performSearch() {
    const queryInput = searchInput.value.toLowerCase();
    const query = `/${queryInput}`;

    let foundResults = false;

    sections.forEach(function (section) {
      const commands = section.querySelectorAll("li");

      let sectionVisible = false;

      commands.forEach(function (command) {
        const text = command.textContent.toLowerCase();
        const isVisible = text.includes(query);

        if (isVisible) {
          foundResults = true;
          sectionVisible = true;
          command.style.scrollMarginTop = "60px";
          command.scrollIntoView({ behavior: "smooth" });
        }

        command.style.display = isVisible ? "block" : "none";
      });
    });

    if (searchInput.value !== "") {
      if (!foundResults) {
        searchInput.value = "NO RESULT";
        searchInput.style.color = "#FF0000";
        searchInput.placeholder = "NO RESULT";

        setTimeout(function () {
          searchInput.value = "";
          searchInput.style.color = "#fff";
          searchInput.placeholder = "Press Enter to confirm ...";
          performSearch();
        }, 1400);
      } else {
        searchInput.value = "";
        performSearch();

        setTimeout(function () {
          searchInput.value = `${query}`;
        }, 200);

        setTimeout(function () {
          searchInput.value = "Searching ...";
          searchInput.style.color = "#e07f00";
          searchInput.placeholder = "Searching ...";
        }, 400);

        setTimeout(function () {
          searchInput.value = "FOUND 🔍";
          searchInput.style.color = "#4be000";
          searchInput.placeholder = "FOUND 🔍";
        }, 800);

        setTimeout(function () {
          searchInput.value = "";
          searchInput.style.color = "#fff";
          searchInput.placeholder = "Press Enter to confirm ...";
        }, 2000);
      }
    }
  }

  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      if (searchInput.value === "") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        performSearch();
      }
    }
  });

  window.addEventListener("load", function () {
    searchInput.value = "";
  });
  restButton.addEventListener("click", function () {
    searchInput.value = "Resting 🚮";
    searchInput.style.color = "#e00000";
    searchInput.placeholder = "Resting 🚮";

    searchInput.value = "";
    searchInput.style.color = "#fff";
    searchInput.placeholder = "Press Enter to confirm ...";
    performSearch();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

function toggleSearch() {
  var searchInput = document.getElementById("search-input");
  if (
    searchInput.style.display === "none" ||
    searchInput.style.display === ""
  ) {
    activateSearch();
  } else {
    deactivateSearch();
  }
}

function activateSearch() {
  var searchButton = document.getElementById("ri-search-line");
  var searchInput = document.getElementById("search-input");

  searchButton.style.display = "none";
  searchInput.style.display = "inline-block";
  searchInput.focus();
}

function deactivateSearch() {
  var searchButton = document.getElementById("ri-search-line");
  var searchInput = document.getElementById("search-input");
  searchButton.style.display = "inline-block";
  searchInput.style.display = "none";
}
