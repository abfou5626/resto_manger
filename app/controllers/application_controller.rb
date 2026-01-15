class ApplicationController < ActionController::Base
  include ::Pundit
  before_action :authenticate_user!

  # Redirection après connexion Devise
  def after_sign_in_path_for(user)
    case user.role
    when 'admin'
      admin_dashboard_path   # à créer, page d’admin
    when 'cuisinier'
      chef_dashboard_path    # à créer, page du cuisinier
    when 'serveur'
      orders_path            # page des commandes pour serveur
    else
      root_path              # fallback
    end
  end

  # Redirection après déconnexion
  def after_sign_out_path_for(_user)
    root_path
  end

  private

  def user_not_authorized
    flash[:alert] = "Accès refusé."
    redirect_to(root_path)
  end
end
