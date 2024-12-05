document.addEventListener("DOMContentLoaded", () => {
	const settingsPanel = document.querySelector(".settings");
	const overviewPanel = document.querySelector(".overview");
	const optionsPanel = document.querySelector(".options");
	const textboxes = document.querySelectorAll(".textbox");
	const contentInput = document.querySelector(".setting-textbox-content"); 
	let activeTextbox = null;

  // ================ show textbox ================
	const showSettings = (textbox) => {
		settingsPanel.style.display = "flex";
		overviewPanel.style.display = "none";
		optionsPanel.style.display = "none";
		activeTextbox = textbox;

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

	// ============== event listners ==================
	document.getElementById("language").addEventListener("change", updateTextbox);
	document.getElementById("font").addEventListener("change", updateTextbox);
	document.getElementById("bold").addEventListener("change", updateTextbox);
	document.getElementById("size").addEventListener("change", updateTextbox);



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

	// alignment changer
	let settingAlign = document.querySelector("#align");
	settingAlign.addEventListener("click", () => {
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
	});

	// Add event listeners to textboxes for selection
	textboxes.forEach((textbox) => {
		textbox.addEventListener("click", () => {
			textboxes.forEach((tb) => tb.classList.remove("highlighted"));
			textbox.classList.add("highlighted");

			showSettings(textbox);
		});

		textbox.addEventListener("input", () => {
			textbox.style.height = "auto";

			textbox.style.height = `${textbox.scrollHeight}px`;
    });

    textbox.addEventListener("change", () => {
			updateTextbox()
		});
    
	});

	document.addEventListener("click", (e) => {
		if (!e.target.closest(".textbox") && !e.target.closest(".settings")) {
			textboxes.forEach((tb) => tb.classList.remove("highlighted"));
			settingsPanel.style.display = "none";
			optionsPanel.style.display = "none";
			overviewPanel.style.display = "flex";
			activeTextbox = null;
		}
	});
});
