// Elements
const verifyButton = document.getElementById("verifyCaptcha");
const refreshButton = document.getElementById("refreshCaptcha");
const storyText = document.getElementById("histoire");
const imageContainer = document.getElementById("images_captcha");
const captchaMessage = document.getElementById("captchaMessage");

// Liste des personnages
const characters = [
    { nom: "Alice", determinant: "elle" },
    { nom: "Xavier", determinant: "il" },
    { nom: "Bob", determinant: "il" },
    { nom: "Nicole", determinant: "elle" },
    { nom: "Henry", determinant: "il" },
    { nom: "Robert", determinant: "il" },
    { nom: "Dominique", determinant: "il" }
];

// Liste des histoires
const stories = [
    {
        template: "{nom} veut aller à la pêche. Aidez-{le_la} à choisir ce dont {determinant} a besoin.",
        correctImage: "canne_a_peche.png",
        images: ["voiture.png", "canne_a_peche.png", "fusil.png", "pioche.png"]
    },
    {
        template: "{nom} prépare un gâteau. Quel objet doit-{determinant} utiliser ?",
        correctImage: "fouet.png",
        images: ["fouet.png", "marteau.png", "tournevis.png", "livre.png"]
    },
    {
        template: "{nom} a soif et veut boire un jus d'orange. Que doit-{determinant} utiliser ?",
        correctImage: "verre.png",
        images: ["bouteille.png", "verre.png", "assiette.png", "couteau.png"]
    }
];

// Initialisation
let currentStory;

// Fonction pour charger un nouveau CAPTCHA
function loadCaptcha() {
    // Randomiser le personnage
    const characterChosen = characters[Math.floor(Math.random() * characters.length)];
    const le_la = characterChosen.determinant === "il" ? "le" : "la";

    // Randomiser l'histoire
    const storyTemplate = stories[Math.floor(Math.random() * stories.length)];
    currentStory = {
        ...storyTemplate,
        story: storyTemplate.template
            .replace("{nom}", characterChosen.nom)
            .replace("{le_la}", le_la)
            .replace(/{determinant}/g, characterChosen.determinant)
    };

    // Mettre à jour le texte de l'histoire
    storyText.textContent = currentStory.story;

    // Effacer les images précédentes
    imageContainer.innerHTML = "";

    // Mélanger les images
    const shuffledImages = currentStory.images.sort(() => Math.random() - 0.5);

    // Ajouter les nouvelles images
    shuffledImages.forEach(imageSrc => {
        const img = document.createElement("img");
        img.src = `ressources/media/captcha_images/${imageSrc}`;
        img.alt = imageSrc;
        img.className = "captcha-image";
        img.addEventListener("click", () => {
            // Effacer les sélections précédentes
            document.querySelectorAll(".captcha-image").forEach(img => img.classList.remove("selected"));
            // Sélectionner l'image cliquée
            img.classList.add("selected");
        });
        imageContainer.appendChild(img);
    });
}

// Afficher ou cacher la boîte CAPTCHA
function showCaptcha() {
    const captchaBox = document.getElementById("captcha_game_box");
    if (document.getElementById("checkbutton").checked) {
        captchaBox.removeAttribute("hidden");
        loadCaptcha(); // Charger un nouveau CAPTCHA lorsqu'il est affiché
    } else {
        captchaBox.setAttribute("hidden", true);
    }
}

// Vérifier l'image sélectionnée
verifyButton.addEventListener("click", () => {
    const selectedImage = document.querySelector(".captcha-image.selected");

    if (!selectedImage) {
        captchaMessage.textContent = "Veuillez sélectionner une image.";
        captchaMessage.style.color = "red";
        return;
    }

    if (selectedImage.alt === currentStory.correctImage) {
        captchaMessage.textContent = "CAPTCHA Vérifié ! Vous n'êtes pas un robot.";
        captchaMessage.style.color = "green";
        window.location.href="./pages/target.html";
    } else {
        captchaMessage.textContent = "Réponse incorrecte. Essayez encore.";
        captchaMessage.style.color = "red";
    }
});

// Actualiser le CAPTCHA
refreshButton.addEventListener("click", () => {
    loadCaptcha(); // Recharger un nouveau CAPTCHA
});
