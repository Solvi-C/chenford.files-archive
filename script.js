console.log("SCRIPT LOADED");

/* =======================================================
   GLOBAL HELPERS
   ======================================================= */
function latestDate(packs) {
  const validDates = packs
    .map((p) => p.dateAdded)
    .filter(Boolean)
    .map((dateStr) => {
      const [month, day, year] = dateStr.split("-").map(Number);
      const parsedDate = new Date(year, month - 1, day);

      return {
        original: dateStr,
        parsed: parsedDate
      };
    })
    .filter((d) => !isNaN(d.parsed.getTime()));

  if (!validDates.length) return "—";

  validDates.sort((a, b) => b.parsed - a.parsed);
  return validDates[0].original;
}

function updateGlobalStats() {
  const statTotal = document.getElementById("stat-total");
  const statLatest = document.getElementById("stat-latest");

  if (
    statTotal &&
    statLatest &&
    typeof SCENE_PACKS !== "undefined" &&
    Array.isArray(SCENE_PACKS)
  ) {
    statTotal.textContent = String(SCENE_PACKS.length);
    statLatest.textContent = latestDate(SCENE_PACKS);
  }
}

/* =======================================================
   GLOBAL SEARCH HANDLER + GLOBAL STATS
   ======================================================= */
document.addEventListener("DOMContentLoaded", () => {
  updateGlobalStats();

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

      if (typeof window.applyFilters === "function") {
        window.applyFilters();
      }
    } else {
      window.location.href = `library.html?search=${encodeURIComponent(query)}`;
    }
  }

  button.addEventListener("click", handleSearch);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });
});

/* =======================================================
   LIBRARY PAGE ONLY
   ======================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("library-tbody");
  const infoNotes = document.getElementById("info-notes");

  const statTotal = document.getElementById("stat-total");
  const statLatest = document.getElementById("stat-latest");

  const filterSeason = document.getElementById("filter-season");
  const advancedTagsContainer = document.getElementById("advanced-tags");
  const advancedToggle = document.getElementById("advanced-toggle");
  const filterClear = document.getElementById("filter-clear");

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  const infoTitle = document.getElementById("library-info-title");
  const infoSeason = document.getElementById("info-season");
  const infoEpisodes = document.getElementById("info-episodes");
  const infoTags = document.getElementById("info-tags");
  const previewBox = document.getElementById("library-preview");
  const downloadBtn = document.getElementById("library-download-button");

  let selectedAdvancedTags = [];

  // If this page doesn't have the library elements, do nothing
  if (
    !tbody ||
    !searchInput ||
    !infoTitle ||
    typeof SCENE_PACKS === "undefined" ||
    !Array.isArray(SCENE_PACKS)
  ) {
    return;
  }

  /* =======================
     ADVANCED DROPDOWN
     ======================= */
  if (advancedToggle && advancedTagsContainer) {
    advancedToggle.addEventListener("click", (e) => {
      e.stopPropagation();

      const wrapper = advancedToggle.closest(".advanced-wrapper");
      if (!wrapper) return;

      wrapper.classList.toggle("open");
      advancedTagsContainer.classList.toggle("show");
    });
  }

  function closeAdvancedDropdown() {
    const wrapper = advancedToggle?.closest(".advanced-wrapper");
    if (!wrapper || !advancedTagsContainer) return;

    wrapper.classList.remove("open");
    advancedTagsContainer.classList.remove("show");
  }

  document.addEventListener("click", (e) => {
    const wrapper = advancedToggle?.closest(".advanced-wrapper");
    if (!wrapper) return;

    if (!wrapper.contains(e.target)) {
      closeAdvancedDropdown();
    }
  });

  /* =======================
     HELPERS
     ======================= */
  const uniqSorted = (arr) =>
    Array.from(new Set(arr))
      .filter((v) => v !== undefined && v !== null && `${v}`.trim() !== "")
      .sort((a, b) => Number(a) - Number(b));

  function setPreview(previewUrl) {
    if (!previewBox) return;

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
    if (!infoTags) return;

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
      if (infoTitle) infoTitle.textContent = "[SCENE PACK NAME]";
      if (infoSeason) infoSeason.textContent = "—";
      if (infoEpisodes) infoEpisodes.textContent = "—";
      if (infoTags) infoTags.innerHTML = "";
      setPreview("");

      if (downloadBtn) {
        downloadBtn.disabled = true;
        downloadBtn.dataset.href = "";
      }

      if (infoNotes) infoNotes.textContent = "—";
      return;
    }

    if (infoTitle) infoTitle.textContent = pack.title;
    if (infoSeason) {
      infoSeason.textContent = Array.isArray(pack.season)
        ? pack.season.join(", ")
        : pack.season;
    }

    if (infoEpisodes) {
      infoEpisodes.textContent = pack.episodes || "—";
    }

    setTags(pack.tags);
    setPreview(pack.preview);

    if (infoNotes) {
      infoNotes.innerHTML = pack.notes || "—";
    }

    if (downloadBtn) {
      if (pack.download && pack.download !== "#") {
        downloadBtn.disabled = false;
        downloadBtn.dataset.href = pack.download;
      } else {
        downloadBtn.disabled = true;
        downloadBtn.dataset.href = "";
      }
    }
  }

  function renderTable(packs) {
    tbody.innerHTML = "";

    packs.forEach((pack) => {
      const tr = document.createElement("tr");
      tr.className = "library-row";
      tr.dataset.id = pack.id;

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

      const downloadIcon = tr.querySelector(".download-icon-lib");

      if (downloadIcon) {
        downloadIcon.addEventListener("click", (e) => {
          e.stopPropagation();

          if (pack.download && pack.download !== "#") {
            window.open(pack.download, "_blank");
          }
        });
      }

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
    if (!filterSeason || !advancedTagsContainer) return;

    const seasons = uniqSorted(
      SCENE_PACKS.flatMap((p) =>
        Array.isArray(p.season) ? p.season : [p.season]
      )
    );

    advancedTagsContainer.innerHTML = "";

    const TAG_GROUPS = {
      RELATIONSHIPS: [
        "chenford",
        "wopez",
        "bailan",
        "jyla",
        "wuna",
        "jackson/lucy",
        "tim/angela",
        "angela/nyla",
        "john/lucy",
        "nyla/lucy"
      ],
      CHARACTERS: [
        "lucy chen",
        "tim bradford",
        "angela lopez",
        "wesley evers",
        "nyla harper",
        "bailey nune",
        "john nolan",
        "wade grey",
        "miles penn",
        "full cast",
        "supporting characters"
      ],
      DYNAMICS: [
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
      STORYLINES: [
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

    Object.entries(TAG_GROUPS).forEach(([groupName, tags]) => {
      const label = document.createElement("div");
      label.className = "advanced-group-label";
      label.textContent = groupName;
      advancedTagsContainer.appendChild(label);

      const groupWrap = document.createElement("div");
      groupWrap.className = "advanced-group-wrap";

      tags.forEach((tag) => {
        const chip = document.createElement("div");
        chip.className = "advanced-chip";
        chip.textContent = tag;

        chip.addEventListener("click", (e) => {
          e.stopPropagation();

          chip.classList.toggle("active");

          if (selectedAdvancedTags.includes(tag)) {
            selectedAdvancedTags = selectedAdvancedTags.filter((t) => t !== tag);
          } else {
            selectedAdvancedTags.push(tag);
          }

          applyFilters();
        });

        groupWrap.appendChild(chip);
      });

      advancedTagsContainer.appendChild(groupWrap);
    });

    const fill = (selectEl, values) => {
      if (!selectEl) return;

      const first = selectEl.options[0];
      selectEl.innerHTML = "";
      if (first) selectEl.appendChild(first);

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
    const season = filterSeason ? filterSeason.value : "";

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
        selectedAdvancedTags.every((tag) => (p.tags || []).includes(tag));

      return matchesSearch && matchesSeason && matchesAdvanced;
    });

    if (statTotal) statTotal.textContent = String(filtered.length);
    if (statLatest) statLatest.textContent = latestDate(filtered);

    renderTable(filtered);

    if (filtered.length === 0) {
      if (infoTitle) infoTitle.textContent = "No scene pack found.";
      if (infoSeason) infoSeason.textContent = "—";
      if (infoEpisodes) infoEpisodes.textContent = "—";
      if (infoTags) infoTags.innerHTML = "";
      setPreview("");

      if (downloadBtn) {
        downloadBtn.disabled = true;
        downloadBtn.dataset.href = "";
      }

      if (infoNotes) infoNotes.textContent = "—";
    }
  }

  /* =======================
     EVENTS
     ======================= */
  if (filterSeason) {
    filterSeason.addEventListener("change", applyFilters);
  }

  if (filterClear) {
    filterClear.addEventListener("click", () => {
      if (filterSeason) filterSeason.value = "";
      searchInput.value = "";

      selectedAdvancedTags = [];
      document.querySelectorAll(".advanced-chip").forEach((chip) => {
        chip.classList.remove("active");
      });

      applyFilters();
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", applyFilters);
  }

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyFilters();
  });

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const href = downloadBtn.dataset.href;
      if (href) window.open(href, "_blank");
    });
  }

  /* =======================
     INIT
     ======================= */
  fillDropdowns();

  if (statTotal) statTotal.textContent = String(SCENE_PACKS.length);
  if (statLatest) statLatest.textContent = latestDate(SCENE_PACKS);

  renderTable(SCENE_PACKS);

  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search");

  if (searchQuery) {
    searchInput.value = searchQuery;
    applyFilters();
  }

  window.applyFilters = applyFilters;
});

console.log(
  "DATA LOADED",
  typeof SCENE_PACKS !== "undefined"
    ? SCENE_PACKS.length
    : "SCENE_PACKS not loaded"
);
