import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="search"
export default class extends Controller {
  static targets = ["input", "item", "noResults"]

  connect() {
    this.updateResultsCount()
  }

  filter() {
    const searchTerm = this.inputTarget.value.toLowerCase().trim()
    let visibleCount = 0

    this.itemTargets.forEach(item => {
      const text = item.textContent.toLowerCase()
      const matches = text.includes(searchTerm)
      
      item.style.display = matches ? "" : "none"
      if (matches) visibleCount++
    })

    this.updateResultsCount(visibleCount)
  }

  updateResultsCount(count = null) {
    if (!this.hasNoResultsTarget) return

    const totalCount = this.itemTargets.length
    const visibleCount = count !== null ? count : totalCount

    if (visibleCount === 0) {
      this.noResultsTarget.style.display = ""
      this.noResultsTarget.textContent = "Aucun résultat trouvé pour votre recherche."
    } else {
      this.noResultsTarget.style.display = "none"
    }
  }

  clear() {
    this.inputTarget.value = ""
    this.filter()
  }
}
