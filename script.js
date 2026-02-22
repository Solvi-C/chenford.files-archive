console.log("SCRIPT LOADED");
/* =======================================================
   GLOBAL SEARCH HANDLER (ALL PAGES)
   ======================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const button = document.getElementById("search-button");
  const logoutBtn = document.getElementById("log-out");
  
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "https://www.instagram.com/chenford.files/";
    });
  }

  if (!input || !button) return;

  function handleSearch() {
    const query = input.value.trim();
    if (!query) return;

    const currentPage = window.location.pathname;

    if (currentPage.includes("library.html")) {
      input.value = query;

      if (typeof applyFilters === "function") {
        applyFilters();
      }
    } else {
      window.location.href =
        `library.html?search=${encodeURIComponent(query)}`;
    }
  }

  button.addEventListener("click", handleSearch);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });
});

document.addEventListener("DOMContentLoaded", () => {

  const statTotal = document.getElementById("stat-total");
  const statLatest = document.getElementById("stat-latest");

  if (statTotal && statLatest && typeof SCENE_PACKS !== "undefined") {

    statTotal.textContent = SCENE_PACKS.length;

    const dates = SCENE_PACKS
      .map(p => p.dateAdded)
      .filter(Boolean)
      .sort();

    statLatest.textContent = dates.length
      ? dates[dates.length - 1]
      : "—";
  }

});

document.addEventListener("DOMContentLoaded", () => {

  /***********************
   * 2) GRAB ELEMENTS
   ***********************/
  const tbody = document.getElementById("library-tbody");
  const infoNotes = document.getElementById("info-notes");

  const statTotal = document.getElementById("stat-total");
  const statLatest = document.getElementById("stat-latest");

  const filterSeason = document.getElementById("filter-season");
  const advancedTagsContainer = document.getElementById("advanced-tags");
  let selectedAdvancedTags = [];
  const advancedToggle = document.getElementById("advanced-toggle");

  if (advancedToggle && advancedTagsContainer) {
    advancedToggle.addEventListener("click", (e) => {
      e.stopPropagation();

      const wrapper = advancedToggle.closest(".advanced-wrapper");

      wrapper.classList.toggle("open");
      advancedTagsContainer.classList.toggle("show");
    });
  }

  /* ===== ADD THIS RIGHT HERE ===== */
  function closeAdvancedDropdown() {
    const wrapper = advancedToggle?.closest(".advanced-wrapper");
    if (!wrapper) return;

    wrapper.classList.remove("open");
    advancedTagsContainer.classList.remove("show");
  }

  /* ===== CLOSE WHEN CLICKING OUTSIDE ===== */
  document.addEventListener("click", (e) => {
    const wrapper = advancedToggle?.closest(".advanced-wrapper");
    if (!wrapper) return;

    if (!wrapper.contains(e.target)) {
      closeAdvancedDropdown();
    }
  });



  const filterClear = document.getElementById("filter-clear");

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  const infoTitle = document.getElementById("library-info-title");
  const infoSeason = document.getElementById("info-season");
  const infoEpisodes = document.getElementById("info-episodes");
  const infoTags = document.getElementById("info-tags");
  const previewBox = document.getElementById("library-preview");
  const downloadBtn = document.getElementById("library-download-button");

  // If this page doesn't have the library elements, do nothing safely
  if (!tbody || !searchInput || !infoTitle) return;

  /***********************
   * 3) HELPERS
   ***********************/
  const uniqSorted = (arr) =>
    Array.from(new Set(arr))
      .filter((v) => v !== undefined && v !== null && `${v}`.trim() !== "")
      .sort((a, b) => Number(a) - Number(b));

  function latestDate(packs) {
    const dates = packs.map((p) => p.dateAdded).filter(Boolean);
    if (!dates.length) return "—";
    // assumes consistent format like 01-02-2026
    return dates.sort().slice(-1)[0];
  }

  function setPreview(previewUrl) {
    if (!previewUrl) {
      previewBox.style.backgroundImage = "";
      previewBox.textContent = "PHOTO OR VIDEO";
      return;
    }
    previewBox.textContent = "";
    previewBox.style.backgroundImage = `url("${previewUrl}")`;
    previewBox.style.backgroundSize = "cover";
    previewBox.style.backgroundPosition = "center";
    previewBox.style.backgroundRepeat = "no-repeat";
  }

  function setTags(tagsArr) {
    infoTags.innerHTML = "";
    (tagsArr || []).forEach((tag) => {
      const chip = document.createElement("div");
      chip.className = "library-tag";
      chip.textContent = tag;
      infoTags.appendChild(chip);
    });
  }

  function updateInfo(pack) {
    if (!pack) {
      infoTitle.textContent = "[SCENE PACK NAME]";
      infoSeason.textContent = "—";
      infoEpisodes.textContent = "—";
      infoTags.innerHTML = "";
      setPreview("");
      downloadBtn.disabled = true;
      downloadBtn.dataset.href = "";
      infoNotes.textContent = "—";
      return;
    }

    infoTitle.textContent = pack.title;
    infoSeason.textContent = Array.isArray(pack.season)
    ? pack.season.join(", ")
    : pack.season;
    setTags(pack.tags);
    setPreview(pack.preview);
    infoNotes.innerHTML = pack.notes || "—";

    if (pack.download && pack.download !== "#") {
      downloadBtn.disabled = false;
      downloadBtn.dataset.href = pack.download;
    } else {
      downloadBtn.disabled = true;
      downloadBtn.dataset.href = "";
    }
  }

  function renderTable(packs) {
    tbody.innerHTML = "";

    packs.forEach((pack) => {
      const tr = document.createElement("tr");
      tr.className = "library-row";
      tr.dataset.id = pack.id;

      // 1️⃣ Only HTML goes here
      tr.innerHTML = `
        <td>${pack.id}</td>
        <td>${pack.title}</td>
        <td>
          <span class="library-download">
            <img 
              class="download-icon-lib"
              src="photos/downloadpic.png"
              style="cursor:pointer;"
            />
          </span>
        </td>
        <td>${pack.dateAdded}</td>
        <td>${pack.size}</td>
      `;

      // 2️⃣ NOW attach click to icon
      const downloadIcon = tr.querySelector(".download-icon-lib");

      downloadIcon.addEventListener("click", (e) => {
        e.stopPropagation(); // prevents row selection

        if (pack.download && pack.download !== "#") {
          window.open(pack.download, "_blank");
        }
      });

      // 3️⃣ Row selection logic
      tr.addEventListener("click", () => {
        document
          .querySelectorAll(".library-row")
          .forEach((r) => r.classList.remove("is-selected"));

        tr.classList.add("is-selected");
        updateInfo(pack);
        closeAdvancedDropdown();
      });

      tbody.appendChild(tr);
    });

    if (packs.length) {
      const firstPack = packs[0];
      const firstRow = tbody.querySelector(".library-row");

      if (firstRow) {
        firstRow.classList.add("is-selected");
        updateInfo(firstPack);
      }
    } else {
      updateInfo(null);
    }
  }

  function fillDropdowns() {
    const seasons = uniqSorted(
      SCENE_PACKS.flatMap((p) =>
        Array.isArray(p.season) ? p.season : [p.season]
      )
    );
    advancedTagsContainer.innerHTML = "";

    // MASTER TAG STRUCTURE
    const TAG_GROUPS = {
      "RELATIONSHIPS": [
        "chenford",
        "wopez",
        "bailan",
        "jyla",
        "wuna",
        "jackson/lucy",
        "tim/angela",
        "angela/nyla",
        "john/lucy"
      ],
      "CHARACTERS": [
        "lucy chen",
        "tim bradford",
        "angela lopez",
        "wesley evers",
        "nyla harper",
        "bailey nune",
        "john nolan",
        "wade grey",
        "miles penn",
        "supporting characters"
      ],
      "DYNAMICS": [
        "slow burn",
        "hurt & comfort",
        "jealousy",
        "protective",
        "romance",
        "domestic",
        "angst",
        "soft",
        "comedic",
        "action"
      ],
      "STORYLINES": [
        "undercover ops",
        "parallels",
        "story arcs",
        "compilations"
      ],
      "MISC TAGS": [
        "still updating",
        "pre-chenford",
        "broken up chenford"
      ]
    };

    // Render groups
    Object.entries(TAG_GROUPS).forEach(([groupName, tags]) => {

      // Section label
      const label = document.createElement("div");
      label.className = "advanced-group-label";
      label.textContent = groupName;
      advancedTagsContainer.appendChild(label);

      // Chip container
      const groupWrap = document.createElement("div");
      groupWrap.className = "advanced-group-wrap";

      tags.forEach(tag => {
        const chip = document.createElement("div");
        chip.className = "advanced-chip";
        chip.textContent = tag;

        chip.addEventListener("click", (e) => {
          e.stopPropagation();

          chip.classList.toggle("active");

          if (selectedAdvancedTags.includes(tag)) {
            selectedAdvancedTags = selectedAdvancedTags.filter(t => t !== tag);
          } else {
            selectedAdvancedTags.push(tag);
          }

          applyFilters();
        });

        groupWrap.appendChild(chip);
      });

      advancedTagsContainer.appendChild(groupWrap);
    });



    // keep first placeholder option, replace the rest
    const fill = (selectEl, values) => {
      const first = selectEl.options[0];
      selectEl.innerHTML = "";
      selectEl.appendChild(first);
      values.forEach((v) => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = v;
        selectEl.appendChild(opt);
      });
    };

    fill(filterSeason, seasons);
  }

  function applyFilters() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const season = filterSeason.value;

    const filtered = SCENE_PACKS.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));

      const matchesSeason =
        !season ||
        (Array.isArray(p.season)
          ? p.season.includes(season)
          : p.season === season);
      const matchesAdvanced =
        selectedAdvancedTags.length === 0 ||
        selectedAdvancedTags.every(tag =>
          (p.tags || []).includes(tag)
        );


      return (
        matchesSearch &&
        matchesSeason &&
        matchesAdvanced
      );
    });

    statTotal.textContent = String(filtered.length);
    statLatest.textContent = latestDate(filtered);

    renderTable(filtered);

    if (filtered.length === 0) {
      infoTitle.textContent = "No scene pack found.";
      infoSeason.textContent = "—";
      infoTags.innerHTML = "";
      setPreview("");
      downloadBtn.disabled = true;
    }
  }

  /***********************
   * 4) EVENTS
   ***********************/
  [filterSeason].forEach((sel) => {
    sel.addEventListener("change", applyFilters);
  });

  filterClear.addEventListener("click", () => {
    filterSeason.value = "";
    searchInput.value = "";

    // Clear advanced tags
    selectedAdvancedTags = [];
    document.querySelectorAll(".advanced-chip").forEach(chip =>
      chip.classList.remove("active")
    );

    applyFilters();
  });
  

  searchButton.addEventListener("click", applyFilters);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyFilters();
  });

  downloadBtn.addEventListener("click", () => {
    const href = downloadBtn.dataset.href;
    if (href) window.open(href, "_blank");
  });

  /***********************
   * 5) INIT
   ***********************/
  fillDropdowns();

  statTotal.textContent = String(SCENE_PACKS.length);
  statLatest.textContent = latestDate(SCENE_PACKS);

  renderTable(SCENE_PACKS);

  /* =========================================
     AUTO SEARCH IF ARRIVED FROM OTHER PAGE
     ========================================= */
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search");

  if (searchQuery) {
    searchInput.value = searchQuery;
    applyFilters();
  }

  window.applyFilters = applyFilters;
});

console.log("DATA LOADED", SCENE_PACKS.length);