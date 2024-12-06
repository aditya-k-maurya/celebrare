const settingsPanel = document.querySelector(".settings");
const overviewPanel = document.querySelector(".overview");
const optionsPanel = document.querySelector(".options");
let textboxes = document.querySelectorAll(".textbox");
const contentInput = document.querySelector(".setting-textbox-content");
let activeTextbox = null;
const addTextButton = document.querySelector(".option-text");
let settingAlign = document.querySelector("#align");
const inputField = document.getElementById("text-content");

// creating new textbox
const createTextboxSection = (pageId) => {
	const textboxSection = document.createElement("div");
	textboxSection.classList.add("text-section");

	const textarea = document.createElement("textarea");
	textarea.name = "textbox";
	textarea.classList.add("textbox");
	textarea.textContent = "New Text";

	const dragHandle = document.createElement("div");
	dragHandle.classList.add("drag-handle");
	dragHandle.innerHTML = `<img src="assets/all-directions.png" alt="drag" />`;

	textboxSection.appendChild(textarea);
	textboxSection.appendChild(dragHandle);

	// Append the textbox section to the current page
	const activePage = document.querySelector(".swiper-slide-active .page");
	activePage.appendChild(textboxSection);
};

// ========= add new text box =========
addTextButton.addEventListener("click", () => {
	const activePage = document.querySelector(".swiper-slide-active .page");
	if (!activePage) {
		alert("No active page to add a textbox!");
		return;
	}
	createTextboxSection(activePage.id);
	setNewTextbox();
	updateOverviewForPage(0);
});

// ================ show textbox ================
const showSettings = (textbox) => {
	settingsPanel.style.display = "flex";
	overviewPanel.style.display = "none";
	optionsPanel.style.display = "none";
	activeTextbox = textbox;
	activeTextbox.zIndex = "100";

	document.getElementById("language").value =
		textbox.dataset.language || "English";
	document.getElementById("font").value =
		textbox.style.fontFamily || "Courier New";
	document.getElementById("bold").value = textbox.style.fontWeight || "500";
	document.getElementById("size").value =
		parseInt(textbox.style.fontSize) || 20;

	// Populate the content input
	document.getElementById("text-content").value = textbox.value;

	// Update color selection
	const color = textbox.style.color || "#000000";
	document.querySelector(".demo-color").style.backgroundColor = color;
};

// ========== update texbox ==============
const updateTextbox = () => {
	if (!activeTextbox) return;

	activeTextbox.dataset.language = document.getElementById("language").value;
	activeTextbox.style.fontFamily = document.getElementById("font").value;
	activeTextbox.style.fontWeight = document.getElementById("bold").value;
	activeTextbox.style.textAlign = document.getElementById("align").value;
	console.log(activeTextbox.style.textAlign);
	activeTextbox.style.fontSize = `${document.getElementById("size").value}px`;

	const color = document.querySelector(".demo-color").style.backgroundColor;
	activeTextbox.style.color = color;
};

const getPosition = (textbox) => {
	const textboxRect = textbox.getBoundingClientRect();
	const clickX = e.clientX - textboxRect.left;
	const clickY = e.clientY - textboxRect.top;

	const lineHeight = 20;
	const charWidth = 10;

	const row = Math.floor(clickY / lineHeight);
	const col = Math.floor(clickX / charWidth);

	const cursorPosition = row * textbox.cols + col;

	textbox.setSelectionRange(cursorPosition, cursorPosition);
};

const setHighlight = (textbox) => {
	textboxes.forEach((tb) => {
		let parent = tb.parentElement;

		tb.classList.remove("highlighted");
		parent.style.zIndex = 1;
	});

	textbox.classList.add("highlighted");
	textbox.parentElement.style.zIndex = 100;
};

// ============ event linstner in new Textboxes =======
let ct = 0;
const setNewTextbox = () => {
	textboxes = document.querySelectorAll(".textbox");
	textboxes.forEach((textbox) => {
		textbox.addEventListener("click", (e) => {
			setHighlight(textbox);
			showSettings(textbox);
			if (document.activeElement === textbox) {
				getPosition(textbox);
			} else {
				if (ct == 1) {
					textbox.focus();

					getPosition(textbox);
					ct = 0;
				} else {
					e.preventDefault();
					ct++;
				}
			}
		});

		textbox.addEventListener("change", () => {
			textbox.style.height = "auto";

			textbox.style.height = `${textbox.scrollHeight}px`;
		});

		textbox.addEventListener("change", () => {
			updateTextbox();
		});
	});
};

// ====== change alignment =======
const changeAlignment = () => {
	let val;
	if (settingAlign.value === "start") {
		val = "center";
	} else if (settingAlign.value === "center") {
		val = "end";
	} else if (settingAlign.value === "end") {
		val = "justify";
	} else {
		val = "start";
	}
	settingAlign.value = val;
	document.getElementById("align-img").src = `assets/align-${val}.png`;
	updateTextbox();
};

const allEventlistner = () => {
	// ============== event listners ==================
	document.getElementById("language").addEventListener("change", updateTextbox);
	document.getElementById("font").addEventListener("change", updateTextbox);
	document.getElementById("bold").addEventListener("change", updateTextbox);
	document.getElementById("size").addEventListener("change", updateTextbox);

	// input field update
	inputField.addEventListener("input", () => {
		activeTextbox.value = inputField.value;
	});

	// Color selection logic
	const colorOptions = document.querySelectorAll(".demo-color-option");
	colorOptions.forEach((option) => {
		option.addEventListener("click", (e) => {
			const selectedColor = e.target.getAttribute("value");
			document.querySelector(".demo-color").style.backgroundColor =
				selectedColor;
			updateTextbox();
		});
	});

	// ========= alignment changer =========
	settingAlign.addEventListener("click", () => {
		changeAlignment();
	});

	// ========= remove highlight text ===========
	// document.addEventListener("mouseup", (e) => {
	// 	e.stopPropagation()
	// 	if (
	// 		!e.target.closest(".textbox") &&
	// 		!e.target.closest(".settings") &&
	// 		!e.target.closest(".more-edit") &&
	// 		!e.target.closest(".text-section")
	// 	) {
	// 		textboxes.forEach((tb) => tb.classList.remove("highlighted"));
	// 		settingsPanel.style.display = "none";
	// 		optionsPanel.style.display = "none";
	// 		overviewPanel.style.display = "flex";
	// 		activeTextbox.zIndex = "1";
	// 		activeTextbox = null;
	// 	}
	// });
};

//  funtion calls
document.addEventListener("DOMContentLoaded", () => {
	setNewTextbox();
	allEventlistner();
});
