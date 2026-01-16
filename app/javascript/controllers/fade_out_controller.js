import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="fade-out"
export default class extends Controller {
  static values = {
    delay: { type: Number, default: 300 }
  }

  remove() {
    this.element.style.transition = `opacity ${this.delayValue}ms ease-out`
    this.element.style.opacity = '0'
    
    setTimeout(() => {
      this.element.remove()
    }, this.delayValue)
  }

  hide() {
    this.element.style.transition = `all ${this.delayValue}ms ease-out`
    this.element.style.opacity = '0'
    this.element.style.transform = 'translateX(-20px)'
    
    setTimeout(() => {
      this.element.style.display = 'none'
    }, this.delayValue)
  }
}
