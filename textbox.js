document.addEventListener("DOMContentLoaded", () => {
	let isDragging = false;
	let activeTextbox = null;
	let offsetX = 0,
		offsetY = 0;
	let selectedTextSection = null;


	// Add event listeners for all text sections
	document.querySelectorAll(".text-section").forEach((textSection) => {
		const textbox = textSection.querySelector(".textbox");
		const dragHandle = textSection.querySelector(".drag-handle");

		// Select and highlight the textbox on click
		textbox.addEventListener("click", (e) => {
			e.stopPropagation(); // Prevent drag handle click from triggering text selection
			// Deselect previously selected text sections
			document
				.querySelectorAll(".text-section")
				.forEach((section) => section.classList.remove("selected"));
			// Select the clicked section and show the drag handle
			textSection.classList.add("selected");
			selectedTextSection = textSection;
		});

		// Start dragging when the drag handle is clicked
		dragHandle.addEventListener("mousedown", (e) => {
			e.stopPropagation(); // Prevent text selection on drag handle click
			isDragging = true;
			activeTextbox = textbox;

			// Calculate offset position
			offsetX = e.clientX - textSection.offsetLeft;
			offsetY = e.clientY - textSection.offsetTop;

			dragHandle.style.cursor = "grabbing"; // Change cursor to grabbing
		});

		// Stop dragging when mouse is released
		document.addEventListener("mouseup", () => {
			if (isDragging) {
				isDragging = false;
				activeTextbox = null;
				dragHandle.style.cursor = "grab"; // Change cursor back to grab
			}
		});

		// Handle drag movement
		document.addEventListener("mousemove", (e) => {
			if (isDragging && activeTextbox) {
				const page = textSection.closest(".page");

				// Calculate new position of the text section
				let newLeft = e.clientX - offsetX;
				let newTop = e.clientY - offsetY;

				// Constrain the drag within page bounds
				newLeft = Math.max(
					0,
					Math.min(newLeft, page.offsetWidth - textSection.offsetWidth)
				);
				newTop = Math.max(
					0,
					Math.min(newTop, page.offsetHeight - textSection.offsetHeight)
				);

				// Apply new position to text section
				textSection.style.left = newLeft + "px";
				textSection.style.top = newTop + "px";
			}
		});

		// Auto-resize the text size based on textbox size
		const resizeTextbox = () => {
			const width = textSection.offsetWidth;
			const height = textSection.offsetHeight;
			const fontSize = Math.min(width / 10, height / 4); // Adjust font size based on size of textbox

			textbox.style.fontSize = `${fontSize}px`;
		};

		// Trigger resize logic when textbox is resized
		new ResizeObserver(resizeTextbox).observe(textbox);
	});

	// Hide drag handle and deselect text section when clicked outside
	document.addEventListener("click", (e) => {
		if (!selectedTextSection || !selectedTextSection.contains(e.target)) {
			// Deselect and hide drag handle
			selectedTextSection?.classList.remove("selected");
			const dragHandle = selectedTextSection?.querySelector(".drag-handle");
			if (dragHandle) {
				dragHandle.style.display = "none";
			}
		}
	});
});
