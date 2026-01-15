class User < ApplicationRecord
  # Devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Rôles possibles
  ROLES = %w[admin serveur cuisinier].freeze

  # Validation
  validates :role, inclusion: { in: ROLES }

  # Définir des méthodes pratiques pour les rôles
  def admin? ; role == 'admin' ; end
  def serveur? ; role == 'serveur' ; end
  def cuisinier? ; role == 'cuisinier' ; end

  # Attribuer un rôle par défaut si aucun rôle n’est fourni
  after_initialize :set_default_role, if: :new_record?

  private

  def set_default_role
    self.role ||= 'serveur'  # Tous les nouveaux utilisateurs par défaut sont serveurs
  end
end
