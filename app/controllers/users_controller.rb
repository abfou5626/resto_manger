class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin, only: [:index, :new, :create, :edit, :update, :destroy]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    # Si aucun mot de passe n'est fourni via le formulaire, définir un mot de passe par défaut
    @user.password = "password123" if @user.password.blank?
    if @user.save
      redirect_to users_path, notice: "Utilisateur créé avec succès"
    else
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      redirect_to users_path, notice: "Utilisateur mis à jour"
    else
      render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to users_path, notice: "Utilisateur supprimé"
  end

  private

  def require_admin
    redirect_to root_path, alert: "Accès refusé" unless current_user.admin?
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :role, :phone, :password, :password_confirmation)
  end
end
