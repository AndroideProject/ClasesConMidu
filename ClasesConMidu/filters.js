
//filtrar datos por tecnologia, modalidad y nivel

const filterData = document.querySelector(".search-filters");

filterData?.addEventListener('change', function (e) {



    const jobs = document.querySelectorAll('.job-listing-card');

    const value = e.target.value;

    jobs.forEach(job =>{
        const regex = new RegExp(value, 'gi');

        //testear si la data de cada trabajo coincide con el valor del filtro
        const modalidad = regex.test(job.dataset.modalidad);
        const nivel = regex.test(job.dataset.nivel);
        const technology = regex.test(job.dataset.technology);

        const isShown = value ==='' || modalidad === true || nivel === true || technology === true;
        job.classList.toggle('is-hidden', isShown === false);
    })
})

//filtrar datos por busqueda de Titulo desde el input a tiempo real

const searchForm = document.querySelector('#empleos-search-input');
searchForm?.addEventListener('input', function(){

    const text = searchForm.value.toLowerCase();

    const jobs = document.querySelectorAll('.job-listing-card');

    jobs.forEach(job =>{
        const jobTextH3 = job.querySelector('h3');
        const jobText = jobTextH3.textContent.toLowerCase();
        const isShown = jobText.includes(text);
        job.classList.toggle('is-hidden', isShown === false);
    })
    
    console.log(text);
})

//filtrar datos por busqueda de Titulo al presionar Enter
searchForm?.addEventListener('keydown', function(e){

    if(e.key === 'Enter') {

        const text = searchForm.value.toLowerCase();
        const jobs = document.querySelectorAll('.job-listing-card');


        jobs.forEach(job =>{
            const jobTextH3 = job.querySelector('h3');
            const jobText = jobTextH3.textContent.toLowerCase();
            const isShown = jobText.includes(text);
            job.classList.toggle('is-hidden', !isShown);
        });

    };


    
})