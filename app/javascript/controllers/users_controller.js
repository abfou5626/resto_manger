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

 delete(event) {
    event.preventDefault()
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return

    const url = event.currentTarget.href

    fetch(url, {
      method: "DELETE",
      headers: { "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content },
    })
      .then(response => {
        if (response.ok) {
          this.rowTarget.remove()  // supprime la ligne du tableau
        } else {
          alert("Erreur lors de la suppression")
        }
      })
      .catch(() => alert("Erreur réseau"))
  }

}
