const settingSection = document.querySelector(".settings");
const overviewSection = document.querySelector(".overview");
const optionSection = document.querySelector(".options");


// Swiper JS initialization
const swiper = new Swiper(".swiper", {
	// Swiper options (e.g., loop, navigation, pagination, etc.)
	loop: false,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});


const pages = document.querySelectorAll(".swiper-slide");

// Function to update the overview for the current page
const updateOverviewForPage = (activePageIndex) => {
	overviewSection.innerHTML = ""; // Clear existing overview content

	const activePage = pages[activePageIndex]; // Get the active page
	const textSections = activePage.querySelectorAll(".text-section");

	// Loop through all textboxes in the current active page
	textSections.forEach((section) => {
		const textarea = section.querySelector(".textbox");
		const name = section.getAttribute("name");
		const content = textarea.value;

		// Create and populate a text-item
		const textItem = document.createElement("div");
		textItem.classList.add("text-item");

		const title = document.createElement("div");
		title.classList.add("text-title");
		title.textContent = name || `Unnamed Textbox`;

		const textContent = document.createElement("div");
		textContent.classList.add("text-content");
		textContent.textContent = content;

		textItem.appendChild(title);
		textItem.appendChild(textContent);

		// Append the text-item to the overview
		overviewSection.appendChild(textItem);
	});
};



// On page change, update the overview for the active page
swiper.on("slideChange", () => {
	const activePageIndex = swiper.activeIndex; // Get the index of the active slide
	updateOverviewForPage(activePageIndex);
});


//  ======= overview page event listners
pages.forEach((page, pageIndex) => {
	const textareas = page.querySelectorAll(".textbox");
	textareas.forEach((textarea) => {
		textarea.addEventListener("input", () => {
			const activePageIndex = swiper.activeIndex;
			if (pageIndex === activePageIndex) {
				updateOverviewForPage(activePageIndex);
			}
		});
	});
});

// function calls
updateOverviewForPage(0);



//  handle clicks

let settingBack = document.querySelector(".setting-back");
settingBack.addEventListener("click", () => {
	settingSection.style.display = "none";
	overviewSection.style.display = "flex";
	optionSection.style.display = "none";
});

let moreEditOption = document.querySelector(".more-edit");
moreEditOption.addEventListener("click", () => {
	settingSection.style.display = "none";
	overviewSection.style.display = "none";
	optionSection.style.display = "block";
});


