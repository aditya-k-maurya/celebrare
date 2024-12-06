// const textboxes = document.querySelectorAll(".textbox");
const textboxSections = document.querySelectorAll(".text-section");

textboxSections.forEach((textbox) => {
	let dragHandle = textbox.querySelector(".drag-handle");
	textbox.addEventListener("click", (e) => {
		dragHandle.style.display = "flex";
		e.stopPropagation();
	});

	// dragHandle.addEventListener("click", (e) => {
	// 	e.stopPropagation();
	// });

	//   document.addEventListener("mouseup", (e) => {
	//     e.stopPropagation();
	// 		if (!textbox.contains(e.target) && !dragHandle.contains(e.target)) {
	// 			dragHandle.style.display = "none";
	// 		}
	//  });

	let isDragging = false;
	let offsetX, offsetY;

	dragHandle.addEventListener("mousedown", (e) => {
		// e.preventDefault(); // Prevent focus loss on drag handle click
		isDragging = true;
		offsetX = e.clientX - textbox.offsetLeft;
		offsetY = e.clientY - textbox.offsetTop;
	});

	document.addEventListener("mousemove", (e) => {
		if (!isDragging) return;

		let newX = e.clientX - offsetX;
		let newY = e.clientY - offsetY;

		const page = document.querySelector(".swiper-slide");
		const pageWidth = page.offsetWidth;
		const pageHeight = page.offsetHeight;

		newX = Math.max(0, Math.min(newX, pageWidth - textbox.offsetWidth));
		newY = Math.max(0, Math.min(newY, pageHeight - textbox.offsetHeight));

		textbox.style.left = newX + "px";
		textbox.style.top = newY + "px";
		console.log("dragging");
	});

	document.addEventListener("mouseup", () => {
		isDragging = false;
	});
});
