const notification = document.querySelector(".notification-bell");
const dropdownPannel = document.querySelector(".dropdown-pannel");
const storeName = document.querySelector(".store-name-wrapper");
const menuList = document.querySelector(".menu-list");
const cancel = document.querySelector(".cancel");
const selectPlan = document.querySelector(".select-plan");
const closeGuides = document.querySelector(".close");
const openGuides = document.querySelector(".open");
const guides = document.querySelector(".guides");
const guideLists = document.querySelectorAll(".guide-lists");
const links = document.querySelectorAll(".menu-lists");
const checkMarks = document.querySelectorAll(".check");
const body = document.querySelector(".body");
document.querySelector(".guideList-len").textContent = guideLists.length;

function handleHiddenSteps(list) {
  guideLists.forEach((otherList) => {
    const otherHiddenContent = otherList.querySelector(".guide-lists--hidden");
    if (
      otherHiddenContent &&
      !otherHiddenContent.classList.contains("hidden")
    ) {
      otherHiddenContent.classList.add("hidden");
      otherList.style.background = "";
      otherList.querySelector("h5").style.fontWeight = "300";
      otherList.style.transition = "";
    }
  });

  list.querySelector(".guide-lists--hidden").classList.remove("hidden");
  list.style.background = "#f3f3f3";
  list.querySelector("h5").style.fontWeight = "400";
  list.style.transition = "background-color 0.3s ease-in-out";
}

//Functions for clicked menu list
function removeActiveClass() {
  links.forEach((link) => {
    link.classList.remove("active-link");
    link.classList.remove("hover");
  });
}

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    removeActiveClass();
    link.classList.add("active-link");
  });
});

// Function to toggle dropdownPannel
function toggleDropdownPannel() {
  if (!menuList.classList.contains("hidden")) {
    menuList.classList.add("hidden");
  }

  dropdownPannel.classList.toggle("active");
}

// Function to toggle menuList
function toggleMenuList() {
  if (dropdownPannel.classList.contains("active")) {
    dropdownPannel.classList.remove("active");
  }

  menuList.classList.toggle("hidden");
}

//Event listener to toggle notification
notification.addEventListener("click", () => {
  toggleDropdownPannel();
});

//Event listener to toggle menulist
storeName.addEventListener("click", () => {
  toggleMenuList();
});

//Close notification pannel and menu-list at hte press of escape button
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Escape":
      dropdownPannel.classList.remove("active");
      menuList.classList.add("hidden");
      break;
  }
});

// // Add event listener to the document
// document.addEventListener("click", function (event) {
//   // Check if the clicked element is not inside the dropdown
//   if (!event.target.closest(".dropdown-pannel")) {
//     // Close the dropdown
//     dropdownPannel.classList.add("hidden");
//   }
// });

//Close select plan trial
cancel.addEventListener("click", () => {
  selectPlan.classList.add("hidden");
});

//Open guide card
openGuides.addEventListener("click", () => {
  openGuides.classList.add("hidden");
  closeGuides.classList.remove("hidden");
  guides.classList.add("hidden");
});

//Close guide card
closeGuides.addEventListener("click", () => {
  closeGuides.classList.add("hidden");
  openGuides.classList.remove("hidden");
  guides.classList.remove("hidden");
});

//Funtion to display and hide guide steps/content
function handleListDisplay(clickedList) {
  const hiddenContent = clickedList.querySelector(".guide-lists--hidden");

  if (hiddenContent && hiddenContent.classList.contains("hidden")) {
    handleHiddenSteps(clickedList);
  }
}

//Hanlde click event
guideLists.forEach((list) => {
  list.addEventListener("click", () => {
    handleListDisplay(list);
  });

  //Hanlde keydown Enter event
  list.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleListDisplay(list);
    }

    //Convert from Nodelist to Array and get the index of the current list
    const currentIndex = Array.from(guideLists).indexOf(list);
    switch (e.key) {
      case "ArrowDown":
        // Handle arrow down key press (navigate down the list)
        const nextIndex = (currentIndex + 1) % guideLists.length;
        guideLists[nextIndex].focus();
        break;
      case "ArrowUp":
        // Handle arrow up key press (navigate up the list)
        const prevIndex =
          (currentIndex - 1 + guideLists.length) % guideLists.length;
        guideLists[prevIndex].focus();
        break;
    }
  });
  // Ensure the list items are focusable
  list.setAttribute("tabindex", "0");
});

function handleProgress() {
  const qtyCompleted = document.querySelector(".qty-completed");
  const progressFill = document.querySelector(".progress-bar-fill");
  const completedSteps = document.querySelectorAll(
    ".checked-icon:not(.hidden)"
  ).length;
  const totalSteps = guideLists.length;
  const percentage = (completedSteps / totalSteps) * 100;

  qtyCompleted.textContent = completedSteps;
  qtyCompleted.textContent = completedSteps > 0 ? completedSteps : 0;
  progressFill.style.width = `${percentage}%`;
}

//Handle the check and unchecking of the circle box
function handleChecked(check, e) {
  e.preventDefault();
  e.stopPropagation();

  const spinner = check.querySelector(".spinner");
  const listItem = e.target.closest(".guide-lists");
  const currentIndex = Array.from(guideLists).indexOf(listItem);
  const nextListItem = guideLists[currentIndex + 1];
  const emptyCheckbox = check.firstElementChild;
  const checkMark = check.querySelector(".checked-icon");
  const isChecked = check.classList.contains("checked");

  checkMark.classList.toggle("hidden");
  handleProgress();
  // Function to toggle visibility of spinner, checkbox, and check icon
  function toggleElementsVisibility() {
    // Show the spinner
    spinner.classList.remove("hidden");
    // Hide the empty checkbox
    emptyCheckbox.classList.add("hidden");
    // Hide the check mark
    checkMark.classList.add("hidden");

    if (
      nextListItem &&
      !nextListItem.firstElementChild.classList.contains("checked")
    ) {
      handleHiddenSteps(nextListItem);
    }
  }
  // Toggle the checked state of the checkbox
  check.classList.toggle("checked");

  // Show the spinner
  toggleElementsVisibility();

  // Handle progress and hidden steps

  // After a delay, hide the spinner and show/hide the empty checkbox and check mark based on checked state
  setTimeout(() => {
    spinner.classList.add("hidden");
    emptyCheckbox.classList.toggle("hidden", !isChecked);
    checkMark.classList.toggle("hidden", isChecked);
  }, 1000);
}

checkMarks.forEach((check) => {
  check.addEventListener("click", (e) => {
    handleChecked(check, e);
  });

  check.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleChecked(check, e);
  });

  check.setAttribute("tabindex", "0");
});
