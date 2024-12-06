const textboxSections = document.querySelectorAll(".text-section");

textboxSections.forEach((textbox) => {
	let dragHandle = textbox.querySelector(".drag-handle");
	let isDragging = false;
	let offsetX, offsetY;

	// // Show drag handle when the textbox is clicked
	// textbox.addEventListener("click", () => {
	// 	dragHandle.style.display = "flex";
	// });

	// // Prevent propagation when clicking the drag handle
	// dragHandle.addEventListener("click", (e) => {
	// 	e.stopPropagation();
	// });

	// Hide drag handle when clicking outside the textbox and drag handle
	document.addEventListener("mouseup", (e) => {
		if (!textbox.contains(e.target) && !dragHandle.contains(e.target)) {
			dragHandle.style.display = "none";
		}
	});

	// Start dragging on mousedown
	textbox.addEventListener("mousedown", (e) => {
		e.preventDefault(); // Prevent focus loss on drag handle click
		isDragging = true;

		// Adjust offsets based on the drag-handle's position
		offsetX = e.clientX - textbox.offsetLeft;
		offsetY = e.clientY - textbox.offsetTop;
	});

	// Dragging logic
	document.addEventListener("mousemove", (e) => {
		if (!isDragging) return;

		let newX = e.clientX - offsetX;
		let newY = e.clientY - offsetY;

		const page = document.querySelector(".swiper-slide");
		const pageWidth = page.offsetWidth;
		const pageHeight = page.offsetHeight;

		// Ensure the textbox stays within page boundaries
		newX = Math.max(0, Math.min(newX, pageWidth - textbox.offsetWidth));
		newY = Math.max(0, Math.min(newY, pageHeight - textbox.offsetHeight));

		textbox.style.left = newX + "px";
		textbox.style.top = newY + "px";
	});

	// Stop dragging on mouseup
	document.addEventListener("mouseup", () => {
		isDragging = false;
	});
});
