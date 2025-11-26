const jobsListing = document.querySelector('.jobs-listings');

jobsListing?.addEventListener('click', function (event) {

    const element = event.target;

    if (element.classList.contains('button-apply-job')) {

        element.textContent = 'Aplicado';
        element.classList.add('is-applied');
        element.disable = true;
    }
})