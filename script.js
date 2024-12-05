document.addEventListener("DOMContentLoaded", () => {
	const settingSection = document.querySelector(".settings");
	const overviewSection = document.querySelector(".overview");
	const optionSection = document.querySelector(".options");

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

});
