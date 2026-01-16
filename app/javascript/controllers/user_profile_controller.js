import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="user-profile"
export default class extends Controller {
  static targets = ["section"]
  static values = {
    userId: Number
  }

  connect() {
    console.log("User profile controller connected", this.userIdValue)
  }

  toggleSection(event) {
    const sectionId = event.currentTarget.dataset.section
    const section = this.element.querySelector(`[data-section="${sectionId}"]`)
    
    if (section) {
      section.classList.toggle('hidden')
      
      // Toggle icon
      const icon = event.currentTarget.querySelector('svg')
      if (icon) {
        icon.classList.toggle('rotate-180')
      }
    }
  }

  editField(event) {
    const fieldName = event.currentTarget.dataset.field
    const display = this.element.querySelector(`[data-display="${fieldName}"]`)
    const input = this.element.querySelector(`[data-input="${fieldName}"]`)
    
    if (display && input) {
      display.classList.add('hidden')
      input.classList.remove('hidden')
      input.focus()
    }
  }

  cancelEdit(event) {
    const fieldName = event.currentTarget.dataset.field
    const display = this.element.querySelector(`[data-display="${fieldName}"]`)
    const input = this.element.querySelector(`[data-input="${fieldName}"]`)
    
    if (display && input) {
      display.classList.remove('hidden')
      input.classList.add('hidden')
    }
  }

  async saveField(event) {
    event.preventDefault()
    const fieldName = event.currentTarget.dataset.field
    const inputElement = this.element.querySelector(`[data-input="${fieldName}"] input`)
    const newValue = inputElement.value
    
    // Ici, vous pouvez ajouter une requête AJAX pour sauvegarder
    console.log(`Saving ${fieldName}: ${newValue}`)
    
    // Simuler une sauvegarde
    const display = this.element.querySelector(`[data-display="${fieldName}"]`)
    if (display) {
      display.textContent = newValue
      this.cancelEdit({ currentTarget: { dataset: { field: fieldName } } })
    }
  }

  showChangePassword() {
    const modal = document.getElementById('change-password-modal')
    if (modal) {
      modal.classList.remove('hidden')
      modal.classList.add('flex')
    }
  }

  hideChangePassword() {
    const modal = document.getElementById('change-password-modal')
    if (modal) {
      modal.classList.add('hidden')
      modal.classList.remove('flex')
    }
  }
}
