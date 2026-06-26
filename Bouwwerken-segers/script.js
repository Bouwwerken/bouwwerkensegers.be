function openLightbox(image){

    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");

    img.src = image;
    lightbox.style.display = "flex";

}

function closeLightbox(){

    document.getElementById("lightbox").style.display = "none";

}