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
document.querySelector(".guideList-len").textContent = guideLists.length;

//Functions for clicked menu list
function removeActiveClass() {
  links.forEach((link) => {
    link.classList.remove("active-link");
    link.classList.remove("hover");
  });
}

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    //   e.preventDefault();
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

//Close guide car
closeGuides.addEventListener("click", () => {
  closeGuides.classList.add("hidden");
  openGuides.classList.remove("hidden");
  guides.classList.remove("hidden");
});

//Funtion to display and hide guide steps/content
function handleListDisplay(clickedList, nextIdx = null) {
  const hiddenContent = clickedList.querySelector(".guide-lists--hidden");
  const isChecked = clickedList.firstElementChild.classList.contains("checked");

  if (hiddenContent && hiddenContent.classList.contains("hidden")) {
    guideLists.forEach((otherList) => {
      const otherHiddenContent = otherList.querySelector(
        ".guide-lists--hidden"
      );
      if (otherHiddenContent && otherList !== clickedList) {
        otherHiddenContent.classList.add("hidden");
        otherList.style.background = "";
        otherList.querySelector("h5").style.fontWeight = "300";
      }
    });

    hiddenContent.classList.remove("hidden");
    clickedList.style.background = "#f3f3f3";
    clickedList.querySelector("h5").style.fontWeight = "500";
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
    ".guide-lists .check img:not(.hidden)"
  ).length;
  const totalSteps = guideLists.length;
  const percentage = (completedSteps / totalSteps) * 100;

  qtyCompleted.textContent = completedSteps;
  progressFill.style.width = `${percentage}%`;
}

function handleChecked(check, target) {
  const listItem = target.closest(".guide-lists");
  const currentIndex = Array.from(guideLists).indexOf(listItem);
  const nextListItem = guideLists[currentIndex + 1];

  check.classList.add("checked");
  check.firstElementChild.classList.toggle("hidden");
  check.querySelector("img").classList.toggle("hidden");

  handleProgress();

  if (nextListItem) handleListDisplay(nextListItem);
}

checkMarks.forEach((check) => {
  check.addEventListener("click", (e) => {
    handleChecked(check, e.target);
  });

  check.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleChecked(check, e.target);
  });

  check.setAttribute("tabindex", "0");
});
