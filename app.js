const notificationTrigger = document.querySelector(".notification-bell");
const notificationDropdownPanel = document.querySelector(
  ".notification-dropdown"
);
const profileMenuTrigger = document.querySelector(".store-name-wrapper");
const profileMenu = document.querySelector(".profileMenu-list");
const cancel = document.querySelector(".cancel");
const selectPlan = document.querySelector(".select-plan");
const openGuides = document.querySelector(".open");
const closeGuides = document.querySelector(".close");
const guides = document.querySelector(".guides");
const guideLists = document.querySelectorAll(".guide-lists");
const links = document.querySelectorAll(".profileMenu-list li:not(.disabled)");
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

// Function to toggle notificationDropdownPanel
function togglenotificationDropdownPanel() {
  profileMenu.classList.add("hidden");
  notificationDropdownPanel.classList.toggle("active");

  const isContentHidden =
    notificationDropdownPanel.classList.contains("active");
  notificationTrigger.setAttribute("aria-expanded", isContentHidden);
}

// Function to toggle profileMenu
function toggleprofileMenu() {
  notificationDropdownPanel.classList.remove("active");
  profileMenu.classList.toggle("hidden");

  const isContentHidden = profileMenu.classList.contains("hidden");
  profileMenuTrigger.setAttribute("aria-expanded", !isContentHidden);
  if (!isContentHidden) {
    links[0].focus();
    addActiveClass(links[0]);
  }
}

// Event listener to toggle notification panel
notificationTrigger.addEventListener("click", togglenotificationDropdownPanel);

//Keyboard Event listener to toggle  notification panel
notificationTrigger.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    togglenotificationDropdownPanel;
  }
});

// Event listener to toggle menu list
profileMenuTrigger.addEventListener("click", () => {
  removeActiveClass(links);
  toggleprofileMenu();
});

//Keyboard Event listener to toggle menu list
profileMenuTrigger.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    toggleprofileMenu();
  }
});

// Event listener to handle keyboard navigation
profileMenu.addEventListener("keydown", (e) => {
  removeActiveClass(links);
  console.log(e.target);
  handleKeyboardNavigation(links, null, e);
});

//Hanlde keyboard navigation
function handleKeyboardNavigation(lists, functionName, e) {
  let currentIndex = Array.from(lists).indexOf(document.activeElement);

  if (e.key === "ArrowDown" && currentIndex < lists.length - 1) {
    lists[currentIndex + 1].focus();
  } else if (e.key === "ArrowUp" && currentIndex > 0) {
    lists[currentIndex - 1].focus();
  } else if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % lists.length;
    lists[currentIndex].focus();
  } else if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + lists.length) % lists.length;
    lists[currentIndex].focus();
  } else if (e.key === "Home") {
    lists[0].focus();
  } else if (e.key === "End") {
    lists[guideLists.length - 1].focus();
  } else if (e.key === "Enter") {
    if (!functionName) {
      window.open(e.target.querySelector("a").getAttribute("href"), "_blank");
      addActiveClass(e.target);
    } else {
      functionName.name === "handleChecked"
        ? functionName(e.target, e)
        : functionName(e.target);
    }
  }
}

// Open guide card click event
openGuides.addEventListener("click", () => {
  handleGuideDisplay();
  guideLists[0].focus();
  addActiveClass(guideLists[0]);
});

// Open guide card keypress event
openGuides.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleGuideDisplay();
    guideLists[0].focus();
    // addActiveClass(guideLists[0]);
  }
});

// Function to handle hidden guide steps
function handleHiddenSteps(list) {
  guideLists.forEach((otherList) => {
    const otherHiddenContent = otherList.querySelector(".guide-lists--hidden");
    if (
      otherHiddenContent &&
      !otherHiddenContent.classList.contains("hidden")
    ) {
      otherHiddenContent.classList.add("hidden");
      otherList.style.background = "";
      otherList.querySelector("h5").style.fontWeight = "500";
      otherList.style.transition = "";
    }
  });

  list.querySelector(".guide-lists--hidden").classList.remove("hidden");
  list.style.background = "#F3F3F3";
  list.querySelector("h5").style.fontWeight = "600";
  list.style.transition = "background-color 0.2s ease-in-out";
}

// Function to display and hide guide steps/content
function handleListDisplay(clickedList) {
  const hiddenContent = clickedList.querySelector(".guide-lists--hidden");

  if (hiddenContent && hiddenContent.classList.contains("hidden")) {
    handleHiddenSteps(clickedList);
  }
}

// Functions to handle guide card display
function handleGuideDisplay() {
  openGuides.classList.add("hidden");
  closeGuides.classList.remove("hidden");
  guides.classList.remove("hidden");
}

//Hides guide's steps details
function handleHideGuides() {
  closeGuides.classList.add("hidden");
  openGuides.classList.remove("hidden");
  guides.classList.add("hidden");
}

// Close guide card
closeGuides.addEventListener("click", handleHideGuides);
closeGuides.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleHideGuides();
});

// Handle click event to display guides list content
guideLists.forEach((list) => {
  list.addEventListener("click", (e) => {
    removeActiveClass(guideLists);
    handleListDisplay(list, e);
  });

  // Handle keydown event to display guides list content
  list.addEventListener("keydown", (e) => {
    removeActiveClass(guideLists);
    handleKeyboardNavigation(guideLists, handleListDisplay, e);
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
  removeActiveClass(guideLists);

  const spinner = check.querySelector(".spinner");
  const listItem = e.target.closest(".guide-lists");
  const currentIndex = Array.from(guideLists).indexOf(listItem);
  const nextListItem = guideLists[(currentIndex + 1) % guideLists.length];
  const emptyCheckbox = check.querySelector(".checkbox");
  const checkMark = check.querySelector(".checked-icon");
  const guide = listItem.querySelector("h5");

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

  toggleElementsVisibility();

  const isChecked = check.classList.toggle("checked");

  const handleTimeout = () => {
    check.setAttribute(
      "aria-label",
      isChecked
        ? `${guide.innerHTML} is successfully checked`
        : `${guide.innerHTML} is unchecked`
    );

    // Adds a delay before hiding the spinner and showing other elements
    setTimeout(() => {
      spinner.classList.add("hidden");
      emptyCheckbox.classList.toggle("hidden", isChecked);
      checkMark.classList.toggle("hidden", !isChecked);

      handleProgress();
    }, 1000);
  };

  requestAnimationFrame(handleTimeout);
}

//Click even for the circle checkboxes
checkMarks.forEach((check) => {
  check.addEventListener("click", (e) => {
    handleChecked(check, e);
  });

  //Keydown event for the circle checkboxes
  check.addEventListener("keydown", (e) => {
    handleKeyboardNavigation(checkMarks, handleChecked, e);
    // handleChecked(check, e);
  });

  check.setAttribute("tabindex", "0");
});

// Close notification panel and menu-list at the press of the escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    notificationDropdownPanel.classList.remove("active");
    notificationTrigger.setAttribute("aria-expanded", "false");
    profileMenu.classList.add("hidden");
    profileMenu.setAttribute("aria-expanded", "false");

    if (document.activeElement.classList.contains("all-stores")) {
      links[0].blur();
      profileMenuTrigger.focus();
      if (document.activeElement === document.body)
        profileMenuTrigger.children[1].focus();
    }
  }
});

// Close notification panel and menu-list on click outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".notification-wrapper"))
    notificationDropdownPanel.classList.remove("active");

  if (!e.target.closest(".store")) profileMenu.classList.add("hidden");
});
