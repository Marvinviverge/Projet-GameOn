document.addEventListener("DOMContentLoaded", function () {

  // Création d'une fonction principale "main" qui va appeler les autres fonctions
  async function main() {
    const modalBtn = document.querySelectorAll(".modal-btn");
    const close = document.querySelector(".close");
    const confirmationClose = document.querySelector(".confirmation-close");

    modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
    close.addEventListener("click", closeModal);
    confirmationClose.addEventListener("click", closeModalConfirmation);
    validate();
  }

  main();

  // Fonction d'origine qui permets d'afficher le menu topnav en responsive via le CSS selon la taille de l'écran.
  function editNav() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  // Création de la fonction pour lancer le modal et son formulaire.
  function launchModal() {
    const modalbg = document.querySelector(".bground");
    const confirmationbg = document.querySelector(".confirmation");

    modalbg.style.display = "block";
    confirmationbg.style.display = "none";
  }

  // Création de la fonction pour fermer le modal et son formulaire lorsque l'on clique sur l'icône de la croix avant la validation.
  function closeModal() {
    const confirmationbg = document.querySelector(".confirmation");
    const modalbg = document.querySelector(".bground");
    modalbg.style.display = "none"

    if (confirmationbg.style.display == 'block') {
      closeModalConfirmation()
    }
  }

  // Création de la fonction pour fermer le modal et son formulaire lorsque l'on clique sur le bouton fermer ou la croix après la validation.
  function closeModalConfirmation() {

    let form = document.querySelector(".form");
    const modalbg = document.querySelector(".bground");
    form.querySelectorAll('input').forEach((input) => {
      if (input.getAttribute('type') == 'checkbox' || input.getAttribute('type') == 'radio') {
        input.checked = false;
      } else {
        input.value = ''
      }
    })
    modalbg.style.display = "none";
    form.style.display = 'block';
  }

  // Création d'une fonction de test de validation du formulaire.
  function validationForm(form) {

    // Initialisation de nos variables de test.
    const stringRegex = /^[a-zA-Z-]+$/;
    const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+).(.\w{2,3})+$/;
    const birthdateRegex = /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
    let control = true;

    // Initialisation des variables permettant de cibler les éléments dans le DOM.
    const formDataFirstName = form.firstName.parentNode;
    const formDataLastName = form.lastName.parentNode;
    const formDataEmail = form.email.parentNode;
    const formDataBirthdate = form.birthdate.parentNode;
    const formDataQuantity = form.quantity.parentNode;
    const formDataLocation = document.getElementById('location1').parentNode;
    const formDataCheckbox = form.conditions.parentNode;


    // Si une des valeurs dans nos inputs de notre Form on affiche un message d'erreur.
    if (!form.firstName.value.match(stringRegex) || form.firstName.textLength < 2) {

      formDataFirstName.setAttribute("data-error-visible", true);
      formDataFirstName.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");

      control = false;
      // Sinon on affiche rien
    } else {
      formDataFirstName.setAttribute("data-error-visible", false);
    }

    if (!form.lastName.value.match(stringRegex) || form.lastName.textLength < 2) {
      formDataLastName.setAttribute("data-error-visible", true);
      formDataLastName.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");

      control = false;
      // Sinon on affiche rien
    } else {
      formDataLastName.setAttribute("data-error-visible", false);
    }

    if (!form.email.value.match(emailRegex)) {
      formDataEmail.setAttribute("data-error-visible", true);
      formDataEmail.setAttribute("data-error", "Veuillez entrer une adresse email valide.");
      control = false;
      // Sinon on affiche rien
    } else {
      formDataEmail.setAttribute("data-error-visible", false);
    }

    if (!form.birthdate.value.match(birthdateRegex)) {
      formDataBirthdate.setAttribute("data-error-visible", true);
      formDataBirthdate.setAttribute("data-error", "Vous devez entrer votre date de naissance.");
      control = false;
      // Sinon on affiche rien
    } else {
      formDataBirthdate.setAttribute("data-error-visible", false);
    }

    if (!Number.isInteger(parseInt(form.quantity.value)) || parseInt(form.quantity.value) < 0) {
      formDataQuantity.setAttribute("data-error-visible", true);
      formDataQuantity.setAttribute("data-error", "Veuillez entrer une quantité valide.");
      control = false;
      // Sinon on affiche rien
    } else {
      formDataQuantity.setAttribute("data-error-visible", false);
    }

    if (!form.location.value) {
      formDataLocation.setAttribute("data-error-visible", true);
      formDataLocation.setAttribute("data-error", "Vous devez choisir une option.");
      control = false;
      // Sinon on affiche rien
    } else {
      formDataLocation.setAttribute("data-error-visible", false);
    }

    if (!form.conditions.checked) {
      formDataCheckbox.setAttribute("data-error-visible", true);
      formDataCheckbox.setAttribute("data-error", "Vous devez vérifier que vous acceptez les termes et conditions.");
      control = false;
      // Sinon on affiche rien
    } else {
      formDataCheckbox.setAttribute("data-error-visible", false);
    }

    if (control) {
      return true; //si control est à true, alors le formulaire est validé.
    } else {
      return false; //si non, il ne l'est pas.
    }
  }

  // Création d'une fonction qui envoie le formulaire si celui-ci est valide.
  function validate() {

    let validationBtn = document.querySelector(".btn-submit");

    validationBtn.addEventListener("click", function (e) {
      let form = document.querySelector(".form");
      let confirmation = document.querySelector(".confirmation");
      e.preventDefault();

      if (validationForm(form)) { // Si la fonction validationForm(form) est à true, alors le formulaire a bien été rempli et peut donc être submit.
        form.style.display = 'none';
        confirmation.style.display = 'block';

      } else { // Le formulaire a été mal rempli, on ne le submit pas.
        e.preventDefault();
        alert("Le formulaire est mal rempli, veuillez le vérifier.")
      }
    })

  }

})