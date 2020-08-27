const figures = {
    max: {src: 'img/max.jpg', alt: 'roadster3840'},
    mid: {src: 'img/middle.jpg', alt: 'roadster1440'},
    nor: {src: 'img/normal.jpg', alt: 'roadster800'},
    min: {src: 'img/min.jpg', alt: 'roadster400'},
}

class SmartFotoPlugin {
    constructor(settings) {
        this._settings = Object.assign(SmartFotoPlugin.getDefaultSettings(), settings);
        this.init
    }

    get init() {
        this.pluginClass = document.querySelector('.SmartFotoPlugin')
        this.width = 0
        this.setEvents
    }

    get setEvents() {
        document.addEventListener('DOMContentLoaded', this.renderTemplate())
        document.addEventListener('load', this.postRenderTemplate)
        document.addEventListener('resize', this.postRenderTemplate)
    }

    suitablePicture(figures) {
        switch (true) {
            case this.width > 1401:
                return figures.max
            case this.width > 801:
                return figures.mid
            case this.width > 601:
                return figures.nor
            default:
                return figures.min
        }
    }


     renderTemplate(data=this._settings.figures.min) {
            this.pluginClass.innerHTML = `
            <figure style="background-image: url(${this._settings.figures.min.src})">
                 <img
                     decoding="async"
                     src="${data.src}"
                     srcset="${data.src}"
                     alt="${data.alt}"
                 />
            </figure>`
    }


    get postRenderTemplate() {
        this.width = document.documentElement.clientWidth
        const data = this.suitablePicture(this._settings.figures)
        this.renderTemplate(data)
    }


    static getDefaultSettings() {
        return {
            figures: {
                max: {src: 'img/max.jpg', alt: 'roadster3840'},
                mid: {src: 'img/middle.jpg', alt: 'roadster1440'},
                nor: {src: 'img/normal.jpg', alt: 'roadster800'},
                min: {src: 'img/min.jpg', alt: 'roadster400'},
            }
        }
    }
}

new SmartFotoPlugin({figures})