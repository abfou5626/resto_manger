import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toast"
export default class extends Controller {
  static values = {
    duration: { type: Number, default: 3000 },
    message: String,
    type: { type: String, default: "success" } // success, error, warning, info
  }

  connect() {
    this.show()
  }

  show() {
    // Add show animation
    setTimeout(() => {
      this.element.classList.add('translate-x-0', 'opacity-100')
      this.element.classList.remove('translate-x-full', 'opacity-0')
    }, 100)

    // Auto hide after duration
    if (this.durationValue > 0) {
      this.timeout = setTimeout(() => {
        this.hide()
      }, this.durationValue)
    }
  }

  hide() {
    this.element.classList.add('translate-x-full', 'opacity-0')
    this.element.classList.remove('translate-x-0', 'opacity-100')
    
    setTimeout(() => {
      this.element.remove()
    }, 300)
  }

  close(event) {
    event.preventDefault()
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.hide()
  }

  disconnect() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }
}

