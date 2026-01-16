import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["search", "row"]

  search() {
    const value = this.searchTarget.value.toLowerCase()

    this.rowTargets.forEach(row => {
      row.style.display =
        row.innerText.toLowerCase().includes(value) ? "" : "none"
    })
  }
}
