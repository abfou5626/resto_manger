import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="delete-confirm"
export default class extends Controller {
  static values = {
    url: String,
    name: String,
    message: String
  }

  show(event) {
    event.preventDefault()
    
    // Get data from the clicked element
    const button = event.currentTarget
    this.currentUrl = button.dataset.deleteUrl
    this.currentName = button.dataset.deleteName || "cet élément"
    this.currentMessage = button.dataset.deleteMessage || `Êtes-vous sûr de vouloir supprimer "${this.currentName}" ?`
    
    // Show or create modal
    this.showModal()
  }

  showModal() {
    // Remove existing modal if any
    const existingModal = document.getElementById('delete-confirm-modal')
    if (existingModal) {
      existingModal.remove()
    }

    // Create modal HTML
    const modal = document.createElement('div')
    modal.id = 'delete-confirm-modal'
    modal.className = "fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center"
    modal.innerHTML = `
      <div class="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white animate-scale-in">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-5">Confirmer la suppression</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              ${this.currentMessage}
            </p>
            <p class="text-xs text-gray-400 mt-2">Cette action est irréversible.</p>
          </div>
          <div class="flex gap-3 px-4 py-3">
            <button id="delete-cancel-btn"
                    class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Annuler
            </button>
            <button id="delete-confirm-btn"
                    class="flex-1 px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    `
    
    document.body.appendChild(modal)
    
    // Add event listeners
    document.getElementById('delete-cancel-btn').addEventListener('click', (e) => this.cancel(e))
    document.getElementById('delete-confirm-btn').addEventListener('click', (e) => this.confirm(e))
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.cancel(e)
      }
    })
  }

  cancel(event) {
    event.preventDefault()
    this.hideModal()
  }

  confirm(event) {
    event.preventDefault()
    
    if (this.currentUrl) {
      // Create and submit a form for DELETE request
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = this.currentUrl
      
      // Add CSRF token
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content
      const csrfInput = document.createElement('input')
      csrfInput.type = 'hidden'
      csrfInput.name = 'authenticity_token'
      csrfInput.value = csrfToken
      form.appendChild(csrfInput)
      
      // Add _method for DELETE
      const methodInput = document.createElement('input')
      methodInput.type = 'hidden'
      methodInput.name = '_method'
      methodInput.value = 'delete'
      form.appendChild(methodInput)
      
      document.body.appendChild(form)
      form.submit()
    }
    
    this.hideModal()
  }

  hideModal() {
    const modal = document.getElementById('delete-confirm-modal')
    if (modal) {
      modal.remove()
    }
  }
}
