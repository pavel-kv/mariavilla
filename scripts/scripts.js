jQuery(function ($) {
	if ($) {

		// инициализация слайдера slick
		if ($(".slider").length !== 0) {
			$(document).ready(function () {
			$(".slider").slick({
				dots: true,
				arrows: true,
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed: 5000,
			});
			});
		}

		// инициализация Owl Carousel
		$(document).ready(function () {
		$(".owl-carousel").owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			dots: false,
			responsiveClass: true,
			responsive: {
				0: {
					items: 0,
				},
				480: {
					items: 3,
				},
				768: {
					items: 4,
				},
				1200: {
					items: 5,
				},
				1600: {
					items: 6,
				},
				2000: {
					items: 8,
				}
			}
		})

		// Заменяем стрелки перелистывания слайдов влево-вправо на карусели фотографий Owl Carousel
		let prevArrow = $(".owl-prev span");
		prevArrow.html('<span class="icon-left-open-big"></span>');
		let nextArrow = $(".owl-next span");
		nextArrow.html('<span class="icon-right-open-big"></span>');

		});
		

		// инициализация галлереи fancybox на странице gallery
		if ($('[data-fancybox="galleryperennials"]').length !== 0) {
			$('[data-fancybox="galleryperennials"]').fancybox({
				beforeShow: function (instance, slide) {
					// Заменяем элементы интерфейса по умолчанию (кнопки пролистывания фото влево и вправо)
					instance.$refs.navigation[0].children[0].children[0].innerHTML = '<span class="icon-left-open-big"></span>';
					instance.$refs.navigation[0].children[1].children[0].innerHTML = '<span class="icon-right-open-big"></span>';
				},
				caption: function (instance, item) {
					let caption = $(this).find('figcaption').html();
					return (caption.length ? caption + "<br>" : "") +
						"<span class='caption-index-count'>Изображение <span data-fancybox-index></span> из <span data-fancybox-count></span></span>";
				},
				infobar: false,
				loop: true,
			});
		}

		// инициализация галлереи fancybox на странице plant
		if ($('[data-fancybox="plantpreview"]').length !== 0) {
			$('[data-fancybox="plantpreview"]').fancybox({
				beforeShow: function (instance, slide) {
					// Заменяем элементы интерфейса по умолчанию (кнопки пролистывания фото влево и вправо)
					instance.$refs.navigation[0].children[0].children[0].innerHTML = '<span class="icon-left-open-big"></span>';
					instance.$refs.navigation[0].children[1].children[0].innerHTML = '<span class="icon-right-open-big"></span>';
				},
				infobar: true,
				smallBtn: true,
				loop: true,
			});
		}

		// инициализация галлереи fancybox на странице plant
		if ($('[data-fancybox="galleryplant"]').length !== 0) {
			$('[data-fancybox="galleryplant"]').fancybox({
				beforeShow: function (instance, slide) {
					// Заменяем элементы интерфейса по умолчанию (кнопки пролистывания фото влево и вправо)
					instance.$refs.navigation[0].children[0].children[0].innerHTML = '<span class="icon-left-open-big"></span>';
					instance.$refs.navigation[0].children[1].children[0].innerHTML = '<span class="icon-right-open-big"></span>';
				},
				infobar: true,
				smallBtn: true,
				loop: true,
			});
		}


		// Плавная прокрутка вверх страницы
		let scrollToTop = $("#btnScrollUp"); // выбираем кнопку скролла вверх страницы
		let body = $("html, body");

		$(window).on("scroll", function () {
			// определяем величину скролла страницы
			let winScrollTopValue = $(window).scrollTop();

			// высота viewport 
			let viewportHeight = $(window).innerHeight();

			if (winScrollTopValue > viewportHeight * 1.2) {
				scrollToTop.fadeIn(500);
			} else if (winScrollTopValue <= viewportHeight * 1.2) {
				scrollToTop.fadeOut(500);
			}
		});

		// Обработчик события по нажатию на кнопку скролла вверх страницы
		scrollToTop.on("click", scrollToTopClicked);

		//Плавная прокрутка на верх страницы
		function scrollToTopClicked(event) {
			body.animate({
				scrollTop: 0,
			}, 1000);
		}

		// Открыть меню мобильное
		let btnMobileMenu = $("#btnOpenMenu");
		btnMobileMenu.on("click", openMenu);

		function openMenu(event) {
			event.preventDefault();
			let mainMenu = $("#mainMenu");
			let mainMenuList = $(".menu .menu__list");

			mainMenu.fadeIn(500);
			mainMenu.addClass("menu_open");
			mainMenuList.animate({
				left: "0",
			}, 500);
		}

		// Закрыть меню мобильное
		let btnCloseMenu = $("#btnCloseMenu");
		btnCloseMenu.on("click", closeMenu);

		function closeMenu(event) {
			event.preventDefault();
			let mainMenu = $("#mainMenu");
			let mainMenuList = $(".menu .menu__list");

			mainMenuList.animate({
				left: "-300px",
			}, 500, function () {
				mainMenuList.removeAttr("style");
			});
			mainMenu.fadeOut(500, function () {
				mainMenu.removeClass("menu_open");
				mainMenu.removeAttr("style");
			});
		}

		// Смена изображения в главном меню при наведении на категории в подменю
		let subMenuItem = $(".submenu__item");
		subMenuItem.mouseover(toggleSubMenuImage);

		function toggleSubMenuImage() {
			let dataId = this.children[0].dataset.id;
			let subMenu = dataId.split("-").shift();

			let subMenuImages = $(".submenu__picture");
			for (let image of subMenuImages) {
				if (image.id.includes(subMenu)) {
					image.classList.remove("submenu__picture_show");
				}
			}

			let currentImage = document.getElementById(dataId);
			currentImage.classList.add("submenu__picture_show");
		}

	}
});


// Подчёркиваем активный пункт главного меню
let pageURL = document.URL.split("/").pop();
let menuLinks = document.querySelectorAll(".menu__link");

for (let link of menuLinks) {
	let menuLink = link.href.split("/").pop();

	if (pageURL === menuLink) {
		link.classList.add("menu__link_active");
	} else {
		link.classList.remove("menu__link_active");
	}
}


// Открыть модальное окно быстрого просмотра
function openModalWindow() {
	let shadow = document.querySelector(".quick-view-shadow");
	shadow.classList.add("quick-view-shadow_show");

	let modal = document.querySelector(".quick-view");
	modal.classList.add("quick-view_visible");


	let modalBox = document.querySelector(".quick-view__box");
	modalBox.classList.add("quick-view__box_open");
}

// Закрыть модальное окно быстрого просмотра
function closeModalWindow() {
	let modalBox = document.querySelector(".quick-view__box");
	modalBox.classList.remove("quick-view__box_open");

	let modal = document.querySelector(".quick-view");
	modal.classList.remove("quick-view_visible");

	let shadow = document.querySelector(".quick-view-shadow");
	shadow.classList.remove("quick-view-shadow_show");
}


// Показать/скрыть поле поиска
function toggleSearchField() {
	let searchField = document.getElementById("searchField");
	let btnSearchSubmt = document.getElementById("btnSearchSubmt");
	let btnSearchDelete = document.getElementById("btnSearchDelete");

	searchField.classList.toggle("search__field_show-transition");
	searchField.classList.toggle("search__field_show");
	btnSearchSubmt.classList.toggle("search__button_show");
	btnSearchDelete.classList.toggle("search__button_show");
}


// Показать подменю мобильное
function openSubMenu(element) {
	let subMenuCollection = document.getElementById("subMenuCollection");
	let subMenuBlog = document.getElementById("subMenuBlog");

	element.classList.toggle("icon-right-open-big");
	element.classList.toggle("icon-down-open-big");

	switch (element.id) {
		case "btnOpenCollection":
			subMenuCollection.classList.toggle("submenu_show");
			subMenuBlog.classList.remove("submenu_show");
			let openBlog = document.getElementById("btnOpenBlog");
			openBlog.classList.remove("icon-down-open-big");
			openBlog.classList.add("icon-right-open-big");

			break;
		case "btnOpenBlog":
			subMenuBlog.classList.toggle("submenu_show");
			subMenuCollection.classList.remove("submenu_show");
			let openCollection = document.getElementById("btnOpenCollection");
			openCollection.classList.remove("icon-down-open-big");
			openCollection.classList.add("icon-right-open-big");
	}
}


// показ большой картинки при щелчке на превью в модальном окне и на странице plant
function togglePreviewImage(element) {
	let plantThumbs = document.querySelectorAll(".plant-thumbs__thumb");
	for (let item of plantThumbs) {
		item.classList.remove("plant-thumbs__thumb_hide");
	}

	let plantPictures = document.querySelector(".plant-picture").children;
	for (let item of plantPictures) {
		item.classList.add("plant-picture_hide");
	}

	let idPicture = element.dataset.id;
	let showImage = document.getElementById(idPicture);
	showImage.classList.remove("plant-picture_hide");

	let parent = element.parentElement;
	parent.classList.add("plant-thumbs__thumb_hide");
}


// отображени информации при клике на меню на странице plant
function toggleDetailInfo(element) {
	let idLink = element.dataset.id;
	let showElement = document.getElementById(idLink);
	let tabElements = document.querySelectorAll(".detail-info__tab");
	let linkElements = document.querySelectorAll(".detail-menu__link");
	for (let item of linkElements) {
		item.classList.remove("detail-menu__link_active");
	}
	for (let item of tabElements) {
		item.classList.remove("detail-info__tab_aclive");
	}
	showElement.classList.add("detail-info__tab_aclive");
	element.classList.add("detail-menu__link_active");
}