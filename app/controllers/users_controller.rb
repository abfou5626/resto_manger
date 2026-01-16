class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin, only: [ :index, :new, :create, :edit, :update, :destroy ]
  before_action :authorize_user_access, only: [ :show ]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html do
        if request.xhr?
          render partial: "show_modal", locals: { user: @user }, layout: false
        else
          render :show
        end
      end
    end
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

    respond_to do |format|
      format.html do
        if request.xhr?
          render partial: "edit_modal", locals: { user: @user }, layout: false
        else
          render :edit
        end
      end
    end
  end

  def update
    @user = User.find(params[:id])

    # Ne pas mettre à jour le mot de passe si vide
    if user_params[:password].blank?
      params[:user].delete(:password)
      params[:user].delete(:password_confirmation)
    end

    if @user.update(user_params.reject { |k, v| v.blank? && k.in?([ "password", "password_confirmation" ]) })
      respond_to do |format|
        format.html do
          if request.xhr?
            head :ok
          else
            redirect_to users_path, notice: "Utilisateur mis à jour"
          end
        end
      end
    else
      respond_to do |format|
        format.html do
          if request.xhr?
            render partial: "edit_modal", locals: { user: @user }, layout: false, status: :unprocessable_entity
          else
            render :edit
          end
        end
      end
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

  def authorize_user_access
    @user = User.find(params[:id])
    unless current_user.admin? || current_user.id == @user.id
      redirect_to root_path, alert: "Vous ne pouvez voir que votre propre profil"
    end
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :role, :phone, :password, :password_confirmation)
  end
end
