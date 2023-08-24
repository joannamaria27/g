document.addEventListener("DOMContentLoaded", function () {
    const masonry = new Masonry(".grid", {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
    });
    imagesLoaded(".grid", function () {
        masonry.layout();
    });
});

function scrollAndOpenModal(target, modalId) {
    document.querySelector(target).scrollIntoView({ behavior: "smooth" });
    setTimeout(function () {
        var myModal = new bootstrap.Modal(document.getElementById(modalId));
        myModal.show();
    }, 500);
}

function searchText() {
    var searchText = document.getElementById('searchInput').value;
    var regex = new RegExp(searchText, 'gi'); 
    var elementsWithText = document.querySelectorAll('*:not(script):not(style):not(html):not(head)');
    elementsWithText.forEach(function (element) {
        var textContent = element.textContent;
        if (regex.test(textContent)) {
            console.log(element);
            element.scrollIntoView({ behavior: 'smooth',  block: 'center' }); 
            document.getElementById('searchInput').value="";
            return;
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const imageUrls = [  
        "./image/projects_10.png", 
        "./image/projects_11.png",
        "./image/projects_12.png",
        "./image/projects_13.png",
        "./image/projects_14.png", 
        "./image/projects_15.png",
    ];
    
    const photoContainer = document.getElementById('grid');
    const gridSizer = document.getElementById('grid-sizer');
    const expandButton = document.getElementById('expand-button');
    const titleContainer = document.getElementById('title'); 
    const section = document.getElementById('projects'); 
    let expanded = false;

    function addAllImages() {
        imageUrls.forEach(element => {
            const divItem = document.createElement('div');
            divItem.classList.add('grid-item', 'col-6', 'col-sm-4', 'p-3');
            divItem.id='new';

            const img = document.createElement('img');
            img.src = element;
            img.classList.add('img-fluid','container-fluid');
            img.getAttribute('data-bs-toggle','data-bs-target', 'data-image-index');
            img.setAttribute('data-bs-toggle','modal');
            img.setAttribute('data-bs-target','#modalProjectsGallery');
            const parts = element.split('_');
            if (parts.length >= 2) {
                const x = parts[1].split('.')[0];
            img.setAttribute('data-image-index', x-1);
            }

            divItem.appendChild(img);
            gridSizer.appendChild(divItem);
            photoContainer.appendChild(gridSizer);
        });
 
        const style = document.head.appendChild(document.createElement("style"));
        style.innerHTML = "#grid::before { z-index: -1 }";

        const totalHeight = titleContainer.clientHeight + photoContainer.clientHeight;
        section.style.minHeight = totalHeight + 'px';
      
        expandButton.innerHTML = '<span>Zwiń <i class="bi bi-arrow-up"></i></span>';
        expandButton.classList.add('btn-primary')   
        expanded = true;
        
        const masonry = new Masonry(photoContainer, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });
        imagesLoaded(".grid", function () {
            masonry.layout();
        });
    }

    function deleteImages() {
        const existingImages = photoContainer.querySelectorAll('#new');
        console.log(existingImages)
        existingImages.forEach(image => {
        gridSizer.removeChild(image);
        });

        const style = document.head.appendChild(document.createElement("style"));
        style.innerHTML = "#grid::before { z-index: 500 }";
    
        const totalHeight = titleContainer.clientHeight + photoContainer.clientHeight;
        section.style.minHeight = totalHeight + 'px';
      
        expandButton.innerHTML = '<span>Rozwiń <i class="bi bi-arrow-down"></i></span>'   
          
        expanded = false;
        
        const masonry = new Masonry(photoContainer, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });
        imagesLoaded(".grid", function () {
            masonry.layout();
        });
    }
    expandButton.addEventListener('click', function () {
        if(!expanded)
            addAllImages(); 
        else{
            deleteImages();
            expandButton.scrollIntoView({ behavior: 'smooth' });
        }
    });

});

document.addEventListener("DOMContentLoaded", function () {
    var modalImage = document.getElementById('modalImage');

    document.getElementById('modalProjectsGallery').addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var imageIndex = parseInt(button.getAttribute('data-image-index'));
        var imagePath = `./image/projects_${imageIndex + 1}.png`;
        modalImage.setAttribute('src', imagePath);

        var currentImageIndex = imageIndex;
        var imageButtons = document.querySelectorAll('[data-bs-target="#modalProjectsGallery"]');

        document.getElementById('nextButton').addEventListener('click', function () {
            currentImageIndex = (currentImageIndex + 1) % imageButtons.length;
            updateModalImage();
        });
        document.getElementById('prevButton').addEventListener('click', function () {
            currentImageIndex = (currentImageIndex - 1 + imageButtons.length) % imageButtons.length;
            updateModalImage();
        });

        function updateModalImage() {
            var button = imageButtons[currentImageIndex];
            var imageIndex = parseInt(button.getAttribute('data-image-index'));
            var imagePath = `./image/projects_${imageIndex + 1}.png`;
            modalImage.setAttribute('src', imagePath);
        }
    });
});
