/*
#widths for minimization

    minimum: 320
    improved: 480
    normal: 640
    middle: 720
    good: 828
    super: 1024
    maximum: 2560
    full: 3840

*/


class SmartFotoPlugin {
    constructor(settings) {
        this._settings = Object.assign(SmartFotoPlugin.getDefaultSettings(), settings);
        this.init
    }

    get init() {
        this.pluginClass = document.querySelector(`${this._settings.imageContainerClass}`)
        this.width = 0
        this.defaultFigure = this._settings.figures.minimum
        this.figure = this._settings.figures.minimum
        this.newFigure = document.createElement('figure')
        this.newImage = document.createElement('img')
        this.makeConstruction
        this.renderAttributeImage
        this.addEvents
    }

    get addEvents() {
        this.newImage.onload = this.postRenderTemplate
        window.onresize = this.postRenderTemplate

        // document.querySelector('body').onresize = this.postRenderTemplate

        // setTimeout(this.postRenderTemplate, 3000)

        // window.addEventListener('load',()=>{
        //     this.postRenderTemplate
        // })

        // window.addEventListener('resize',()=>{
        //     this.postRenderTemplate
        // })
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

    get makeConstruction() {
        const fig = this.pluginClass.appendChild(this.newFigure)
        fig.appendChild(this.newImage)
        this.unchangedAttributesFigure
        this.unchangedAttributesImage
    }

    get unchangedAttributesFigure() {
        this.newFigure.setAttribute('style', `
        width: auto;
        height: auto;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-image: url(${this.defaultFigure.src})`
        )
    }

    get unchangedAttributesImage() {
        this.newImage.setAttribute('style', `width: 100%; height: 100%; object-fit: cover;`)
        this.newImage.setAttribute('decoding', 'async')
    }

    get renderAttributeImage() {
        this.newImage.setAttribute('src', `${this.figure.src}`)
        this.newImage.setAttribute('srcset', `${this.figure.src}`)
        this.newImage.setAttribute('alt', `${this.figure.alt}`)
    }

    get postRenderTemplate() {
        const element = this.pluginClass.getBoundingClientRect()
        this.width = element.width
        this.figure = this.suitablePicture
        this.renderAttributeImage
    }

    static getDefaultSettings() {
        return {
            imageContainerClass: '.SmartFotoPlugin',
            figures: {
                "full": {
                    "alt": "full",
                    "src": "img/0ad17b4c4bb067deaaa1cce28cbe57a1/full.jpg"
                },
                "good": {
                    "alt": "good",
                    "src": "img/0ad17b4c4bb067deaaa1cce28cbe57a1/good.jpg"
                },
                "super": {
                    "alt": "super",
                    "src": "img/0ad17b4c4bb067deaaa1cce28cbe57a1/super.jpg"
                },
                "normal": {
                    "alt": "normal",
                    "src": "img/0ad17b4c4bb067deaaa1cce28cbe57a1/normal.jpg"
                },
                "improved": {
                    "alt": "improved",
                    "src": "img/0ad17b4c4bb067deaaa1cce28cbe57a1/improved.jpg"
                },
                "middle": {
                    "alt": "middle",
                    "src": "img/0ad17b4c4bb067deaaa1cce28cbe57a1/middle.jpg"
                },
                "maximum": {
                    "alt": "maximum",
                    "src": "img/0ad17b4c4bb067deaaa1cce28cbe57a1/maximum.jpg"
                },
                "minimum": {
                    "alt": "minimum",
                    "src": "img/0ad17b4c4bb067deaaa1cce28cbe57a1/minimum.jpg"
                }
            }
        }
    }
}

class ManagedSmartFotoPlugin {
    constructor() {
        this.width = 0
        this.init
    }

    get init() {
        this.setevents
    }

    get setevents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.width = this.Width
        }, true)

        window.addEventListener('load', () => {
            this.width = this.Width
        }, true)

        window.addEventListener('resize', () => {
            this.width = this.Width
        }, true)
    }

    get Width() {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
        );
    }

}


fetch('images.json')
    .then(responce => responce.json())
    .then(images => {
        for (let i = 1; i != images.length; i++) {
            let imageContainerClass = `.somImage${i}`
            let figures = images[i]
            new SmartFotoPlugin({
                imageContainerClass,
                figures
            })
        }
    })
    .catch(err => console.error(err))


