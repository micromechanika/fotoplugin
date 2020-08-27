const figures = {
    full: {src: 'img/full.jpg', alt: 'full'},
    maximum: {src: 'img/maximum.jpg', alt: 'maximum'},
    super: {src: 'img/super.jpg', alt: 'super'},
    good: {src: 'img/good.jpg', alt: 'good'},
    middle: {src: 'img/middle.jpg', alt: 'middle'},
    normal: {src: 'img/normal.jpg', alt: 'normal'},
    improved: {src: 'img/improved.jpg', alt: 'improved'},
    minimum: {src: 'img/minimum.jpg', alt: 'minimum'},
}

class SmartFotoPlugin {
    constructor(settings) {
        this._settings = Object.assign(SmartFotoPlugin.getDefaultSettings(), settings);
        this.init
    }

    get init() {
        this.pluginClass = document.querySelector('.SmartFotoPlugin')
        this.width = 0
        this.defaultFigure = this._settings.figures.minimum
        this.figure = this._settings.figures.minimum
        this._setEvents
    }

    get _setEvents() {
        document.addEventListener('DOMContentLoaded', this.renderTemplate)
        // document.addEventListener('load', this.postRenderTemplate)
        window.addEventListener('resize', this.postRenderTemplate)
    }

    get suitablePicture() {
        switch (true) {
            case this.width > 1365:
                return this._settings.figures.full
            case this.width > 1000:
                return this._settings.figures.maximum
            case this.width > 827:
                return this._settings.figures.super
            case this.width > 719:
                return this._settings.figures.good
            case this.width > 639:
                return this._settings.figures.middle
            case this.width > 479:
                return this._settings.figures.normal
            case this.width > 319:
                return this._settings.figures.improved
            default:
                return this._settings.figures.minimum
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
        const element = this.pluginClass.getBoundingClientRect()
        this.width = element.width
        this.figure = this.suitablePicture
        console.log('w:',this.width,'path:',this.figure )
        this.renderTemplate
    }


    static getDefaultSettings() {
        return {
            figures: {
                full: {src: 'img/full.jpg', alt: 'full'},
                maximum: {src: 'img/maximum.jpg', alt: 'maximum'},
                super: {src: 'img/super.jpg', alt: 'super'},
                good: {src: 'img/good.jpg', alt: 'good'},
                middle: {src: 'img/middle.jpg', alt: 'middle'},
                normal: {src: 'img/normal.jpg', alt: 'normal'},
                improved: {src: 'img/improved.jpg', alt: 'improved'},
                minimum: {src: 'img/minimum.jpg', alt: 'minimum'},
            }
        }
    }
}

new SmartFotoPlugin({figures})