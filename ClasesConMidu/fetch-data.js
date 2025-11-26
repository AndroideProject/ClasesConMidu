// ================================
//  ELEMENTOS Y VARIABLES GLOBALES
// ================================
const container = document.querySelector('.jobs-listings')
const loading = document.querySelector('#jobs-loading')
const pagination = document.querySelector('.pagination')

let jobsData = []
let currentPage = 1
const jobsPerPage = 5


// ================================
//  ICONOS SVG
// ================================
const ICON_PREV = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 6l-6 6l6 6" />
  </svg>
`

const ICON_NEXT = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 6l6 6l-6 6" />
  </svg>
`


// ================================
//  RENDER DE LA PAGINACIÓN
// ================================
function renderPagination(totalPages) {
  pagination.innerHTML = ''

  for (let i = 0; i <= totalPages + 1; i++) {
    const link = document.createElement('a')
    link.href = '#'
    link.dataset.page = i

    link.innerHTML =
      i === 0 ? ICON_PREV :
      i > totalPages ? ICON_NEXT : i

    if (i === currentPage) link.classList.add('is-active')

    link.addEventListener('click', onPageClick)
    pagination.appendChild(link)
  }
}

function onPageClick(e) {
  e.preventDefault()
  const totalPages = Math.ceil(jobsData.length / jobsPerPage)
  const clicked = Number(e.currentTarget.dataset.page)

  if (clicked === 0) {
    if (currentPage > 1) currentPage--
  } else if (clicked > totalPages) {
    if (currentPage < totalPages) currentPage++
  } else {
    currentPage = clicked
  }

  renderJobs()
}


// ================================
//  RENDER DE TRABAJOS
// ================================
function renderJobs() {
  container.innerHTML = ''

  const start = (currentPage - 1) * jobsPerPage
  const jobsToRender = jobsData.slice(start, start + jobsPerPage)

  const totalPages = Math.ceil(jobsData.length / jobsPerPage)
  renderPagination(totalPages)

  jobsToRender.forEach(job => {
    const article = document.createElement('article')
    article.className = 'job-listing-card'
    article.dataset.modalidad = job.data.modalidad
    article.dataset.nivel = job.data.nivel
    article.dataset.technology = job.data.technology

    article.innerHTML = `
      <div>
        <h3>${job.titulo}</h3>
        <small>${job.empresa} | ${job.ubicacion}</small>
        <p>${job.descripcion}</p>
      </div>
      <button class="button-apply-job">Aplicar</button>
    `

    container.appendChild(article)
  })
}


// ================================
//  FETCH INICIAL
// ================================
fetch('./data.json')
  .then(res => res.json())
  .then(jobs => {
    if (loading) loading.remove()

    if (jobs.length === 0) {
      container.innerHTML = '<p>No hay empleos disponibles por ahora.</p>'
      return
    }

    jobsData = jobs
    renderJobs()
  })
  .catch(err => {
    if (loading) loading.textContent = 'No se pudieron cargar los empleos'
    console.error(err)
  })
