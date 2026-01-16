import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="user-modal"
export default class extends Controller {
  static targets = ["modal", "content"]

  async showUser(event) {
    event.preventDefault()
    const userId = event.currentTarget.dataset.userId
    
    try {
      const response = await fetch(`/users/${userId}`, {
        headers: {
          'Accept': 'text/html',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      
      if (response.ok) {
        const html = await response.text()
        this.showModal(html, 'view')
      }
    } catch (error) {
      console.error('Error loading user:', error)
    }
  }

  async editUser(event) {
    event.preventDefault()
    const userId = event.currentTarget.dataset.userId
    
    try {
      const response = await fetch(`/users/${userId}/edit`, {
        headers: {
          'Accept': 'text/html',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      
      if (response.ok) {
        const html = await response.text()
        this.showModal(html, 'edit')
      }
    } catch (error) {
      console.error('Error loading edit form:', error)
    }
  }

  showModal(content, mode) {
    // Remove existing modal if any
    const existingModal = document.getElementById('user-modal')
    if (existingModal) {
      existingModal.remove()
    }

    // Create modal
    const modal = document.createElement('div')
    modal.id = 'user-modal'
    modal.className = "fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
    modal.innerHTML = `
      <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <button id="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div id="modal-content">
          ${content}
        </div>
      </div>
    `
    
    document.body.appendChild(modal)
    
    // Add event listeners
    document.getElementById('close-modal').addEventListener('click', () => this.closeModal())
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal()
      }
    })

    // Escape key to close
    this.escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.closeModal()
      }
    }
    document.addEventListener('keydown', this.escapeHandler)

    // If edit mode, handle form submission
    if (mode === 'edit') {
      const form = modal.querySelector('form')
      if (form) {
        form.addEventListener('submit', (e) => this.handleFormSubmit(e))
      }
    }
  }

  async handleFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'text/html'
        }
      })
      
      if (response.ok) {
        // Close modal and reload page to see changes
        this.closeModal()
        window.location.reload()
      } else {
        // Show errors in modal
        const html = await response.text()
        const modalContent = document.getElementById('modal-content')
        if (modalContent) {
          modalContent.innerHTML = html
          // Reattach form submit handler
          const newForm = modalContent.querySelector('form')
          if (newForm) {
            newForm.addEventListener('submit', (e) => this.handleFormSubmit(e))
          }
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  closeModal() {
    const modal = document.getElementById('user-modal')
    if (modal) {
      modal.remove()
    }
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler)
    }
  }
}
