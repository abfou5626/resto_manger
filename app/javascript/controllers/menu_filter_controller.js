import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="menu-filter"
export default class extends Controller {
  static targets = ["input", "item", "categoryBtn", "noResults"]
  static values = { category: String }

  connect() {
    this.activeCategory = "all"
    this.updateResultsCount()
  }

  search() {
    const searchTerm = this.inputTarget.value.toLowerCase().trim()
    this.filterItems(searchTerm, this.activeCategory)
  }

  filterByCategory(event) {
    const category = event.currentTarget.dataset.category
    this.activeCategory = category

    // Update active button style
    this.categoryBtnTargets.forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add("bg-blue-600", "text-white")
        btn.classList.remove("bg-gray-100", "text-gray-700")
      } else {
        btn.classList.remove("bg-blue-600", "text-white")
        btn.classList.add("bg-gray-100", "text-gray-700")
      }
    })

    const searchTerm = this.hasInputTarget ? this.inputTarget.value.toLowerCase().trim() : ""
    this.filterItems(searchTerm, category)
  }

  filterItems(searchTerm, category) {
    let visibleCount = 0

    this.itemTargets.forEach(item => {
      const text = item.textContent.toLowerCase()
      const itemCategory = item.dataset.category?.toLowerCase() || ""
      
      const matchesSearch = !searchTerm || text.includes(searchTerm)
      const matchesCategory = category === "all" || itemCategory === category.toLowerCase()
      
      const shouldShow = matchesSearch && matchesCategory
      item.style.display = shouldShow ? "" : "none"
      
      if (shouldShow) visibleCount++
    })

    this.updateResultsCount(visibleCount)
  }

  updateResultsCount(count = null) {
    if (!this.hasNoResultsTarget) return

    const totalCount = this.itemTargets.length
    const visibleCount = count !== null ? count : totalCount

    if (visibleCount === 0) {
      this.noResultsTarget.style.display = ""
      this.noResultsTarget.textContent = "Aucun résultat trouvé."
    } else {
      this.noResultsTarget.style.display = "none"
    }
  }

  clear() {
    if (this.hasInputTarget) {
      this.inputTarget.value = ""
    }
    this.activeCategory = "all"
    
    // Reset category buttons
    this.categoryBtnTargets.forEach(btn => {
      if (btn.dataset.category === "all") {
        btn.classList.add("bg-blue-600", "text-white")
        btn.classList.remove("bg-gray-100", "text-gray-700")
      } else {
        btn.classList.remove("bg-blue-600", "text-white")
        btn.classList.add("bg-gray-100", "text-gray-700")
      }
    })
    
    this.filterItems("", "all")
  }
}
