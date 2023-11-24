const notification = document.querySelector(".notification-bell");
const notificationDropdownPannel = document.querySelector(".dropdown-pannel");
const storeName = document.querySelector(".store-name-wrapper");
const menuList = document.querySelector(".menu-list");
const cancel = document.querySelector(".cancel");
const selectPlan = document.querySelector(".select-plan");
const openGuides = document.querySelector(".open");
const closeGuides = document.querySelector(".close");
const guides = document.querySelector(".guides");
const guideLists = document.querySelectorAll(".guide-lists");
const links = document.querySelectorAll(".menu-lists");
const checkMarks = document.querySelectorAll(".check");
const body = document.querySelector(".body");
const guideListLen = document.querySelector(".guideList-len");
// Set guide list length
guideListLen.textContent = guideLists.length;

// Close select plan trial
cancel.addEventListener("click", () => {
  selectPlan.classList.add("hidden");
});

// Functions for clicked menu list
function removeActiveClass(items) {
  items.forEach((item) => {
    item.classList.remove("active-link", "focus");
  });
}

function addActiveClass(link) {
  link.classList.add("active-link");
}

//Add some styles to the clicked link
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    removeActiveClass(links);
    link.classList.add("active-link");
  });
});

// Function to toggle notificationDropdownPannel
function togglenotificationDropdownPannel() {
  menuList.classList.add("hidden");
  notificationDropdownPannel.classList.toggle("active");
}

// Function to toggle menuList
function toggleMenuList() {
  notificationDropdownPannel.classList.remove("active");
  menuList.classList.toggle("hidden");
}

// Event listener to toggle notification pannel
notification.addEventListener("click", togglenotificationDropdownPannel);

//Keyboard Event listener to toggle  notification pannel
notification.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    togglenotificationDropdownPannel;
  }
});

// Event listener to toggle menu list
storeName.addEventListener("click", () => {
  toggleMenuList();
  links[0].focus();
  addActiveClass(links[0]);
});

//Keyboard Event listener to toggle menu list
storeName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    toggleMenuList();
    links[0].focus();
    addActiveClass(links[0]);
  }
});

// Event listener to handle keyboard navigation
menuList.addEventListener("keydown", (e) => {
  const currentIndex = Array.from(links).indexOf(document.activeElement);
  removeActiveClass(links);
  if (e.key === "ArrowDown" && currentIndex < links.length - 1) {
    links[currentIndex + 1].focus();
  } else if (e.key === "ArrowUp" && currentIndex > 0) {
    links[currentIndex - 1].focus();
  } else if (e.key === "Enter") {
    window.open(e.target.querySelector("a").getAttribute("href"), "_blank");
    e.target.classList.add("active-link");
  }
});

// Functions to handle guide card display
function handleGuideDisplay() {
  openGuides.classList.add("hidden");
  closeGuides.classList.remove("hidden");
  guides.classList.remove("hidden");
}

function handleHideGuides() {
  closeGuides.classList.add("hidden");
  openGuides.classList.remove("hidden");
  guides.classList.add("hidden");
}

// Function to handle hidden steps
function handleHiddenSteps(list) {
  guideLists.forEach((otherList) => {
    const otherHiddenContent = otherList.querySelector(".guide-lists--hidden");
    if (
      otherHiddenContent &&
      !otherHiddenContent.classList.contains("hidden")
    ) {
      otherHiddenContent.classList.add("hidden");
      otherList.style.background = "";
      otherList.querySelector("h5").style.fontWeight = "400";
      otherList.style.transition = "";
    }
  });

  list.querySelector(".guide-lists--hidden").classList.remove("hidden");
  list.style.background = "#f3f3f3";
  list.querySelector("h5").style.fontWeight = "500";
  list.style.transition = "background-color 0.3s ease-in-out";
}

// Function to display and hide guide steps/content
function handleListDisplay(clickedList) {
  const hiddenContent = clickedList.querySelector(".guide-lists--hidden");

  if (hiddenContent && hiddenContent.classList.contains("hidden")) {
    handleHiddenSteps(clickedList);
  }
}

// Open guide card
openGuides.addEventListener("click", () => {
  handleGuideDisplay();
  guideLists[0].focus();
  addActiveClass(guideLists[0]);
});

openGuides.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleGuideDisplay();
    guideLists[0].focus();
    addActiveClass(guideLists[0]);
  }
});

// Close guide card
closeGuides.addEventListener("click", handleHideGuides);
closeGuides.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleHideGuides();
});

// Handle click event to display guides list content
guideLists.forEach((list) => {
  list.addEventListener("click", () => {
    removeActiveClass(guideLists);
    handleListDisplay(list);
  });

  // Handle keydown event to display guides list content
  list.addEventListener("keydown", (e) => {
    const currentIndex = Array.from(guideLists).indexOf(document.activeElement);
    removeActiveClass(guideLists);

    switch (e.key) {
      case "ArrowDown":
        const nextIndex = (currentIndex + 1) % guideLists.length;
        guideLists[nextIndex].focus();
        break;
      case "ArrowUp":
        const prevIndex =
          (currentIndex - 1 + guideLists.length) % guideLists.length;
        guideLists[prevIndex].focus();
        break;
      case "Enter":
        handleListDisplay(list);
        break;
    }
  });
  // Ensure the list items are focusable
  list.setAttribute("tabindex", "0");
});

// Handles the progress bar
function handleProgress() {
  const qtyCompleted = document.querySelector(".qty-completed");
  const progressFill = document.querySelector(".progress-bar-fill");
  const completedSteps = document.querySelectorAll(
    ".checked-icon:not(.hidden)"
  ).length;
  const totalSteps = guideLists.length;
  const percentage = (completedSteps / totalSteps) * 100;

  qtyCompleted.textContent = completedSteps > 0 ? completedSteps : 0;
  progressFill.style.width = `${percentage}%`;
}

// Handles checking and unchecking of the circle checkbox
function handleChecked(check, e) {
  e.preventDefault();
  e.stopPropagation();

  const spinner = check.querySelector(".spinner");
  const listItem = e.target.closest(".guide-lists");
  const currentIndex = Array.from(guideLists).indexOf(listItem);
  const nextListItem = guideLists[(currentIndex + 1) % guideLists.length];
  const emptyCheckbox = check.firstElementChild;
  const checkMark = check.querySelector(".checked-icon");
  const isChecked = check.classList.contains("checked");

  checkMark.classList.toggle("hidden");
  handleProgress();

  function toggleElementsVisibility() {
    spinner.classList.remove("hidden");
    emptyCheckbox.classList.add("hidden");
    checkMark.classList.add("hidden");

    if (
      nextListItem &&
      !nextListItem.firstElementChild.classList.contains("checked")
    ) {
      handleHiddenSteps(nextListItem);
    }
  }

  check.classList.toggle("checked");
  toggleElementsVisibility();

  setTimeout(() => {
    spinner.classList.add("hidden");
    emptyCheckbox.classList.toggle("hidden", !isChecked);
    checkMark.classList.toggle("hidden", isChecked);
  }, 200);
}

//Click even for the circle checkboxes
checkMarks.forEach((check) => {
  check.addEventListener("click", (e) => {
    handleChecked(check, e);
  });

  //Keydown event for the circle checkboxes
  check.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleChecked(check, e);
  });

  check.setAttribute("tabindex", "0");
});

// Close notification panel and menu-list at the press of the escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    notificationDropdownPannel.classList.remove("active");
    menuList.classList.add("hidden");
  }
});

// Close notification panel and menu-list on click outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".notification"))
    notificationDropdownPannel.classList.remove("active");

  if (!e.target.closest(".store")) menuList.classList.add("hidden");
});
