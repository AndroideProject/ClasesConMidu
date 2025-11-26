

class DevJobsAvatar extends HTMLElement {
    constructor() {
        super(); // Llamada al constructor de HTMLElement

        this.attachShadow({ mode: 'open' });
    }

    createUrl(service, username) {
        return `https://unavatar.io/${service}/${username}`;

    }

    render() {

        const service = this.getAttribute('service') ?? 'github';
        const username = this.getAttribute('username') ?? 'midudev';
        const size = this.getAttribute('size') ?? '45';

        const url = this.createUrl(service, username);


        this.shadowRoot.innerHTML = `

        <style>
            img {
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                object-fit: cover;
            }
        </style>

        <img
           src=${url}
            alt="Username de ${username}"
            class="avatar"          
        />
        `
    }
    connectedCallback() {
        this.render();
    }
}


customElements.define('devjobs-avatar', DevJobsAvatar);