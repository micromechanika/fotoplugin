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
        this.defaultFigure = this._settings.figures.min
        this.figure = this._settings.figures.min
        this.setEvents
    }

    get setEvents() {
        document.addEventListener('DOMContentLoaded', this.renderTemplate)
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


    get renderTemplate() {
            this.pluginClass.innerHTML = `
            <figure style="background-image: url(${this.defaultFigure.src})">
                 <img
                     decoding="async"
                     src="${this.figure.src}"
                     srcset="${this.figure.src}"
                     alt="${this.figure.alt}"
                 />
            </figure>`
    }


    get postRenderTemplate() {
        this.width = document.documentElement.clientWidth
        this.figure = this.suitablePicture(this._settings.figures)
        this.renderTemplate
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