class MenusController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[ index show ]
  before_action :set_menu, only: %i[ show edit update destroy ]
  before_action :require_admin, only: %i[ new create edit update destroy ]

  # GET /menus or /menus.json
  def index
    @menus = Menu.all
  end

  # GET /menus/1 or /menus/1.json
  def show
  end

  # GET /menus/new
  def new
    @menu = Menu.new
  end

  # GET /menus/1/edit
  def edit
  end

  # POST /menus or /menus.json
  def create
    @menu = Menu.new(menu_params)

    respond_to do |format|
      if @menu.save
        format.html { redirect_to @menu, notice: "Menu was successfully created." }
        format.json { render :show, status: :created, location: @menu }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @menu.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /menus/1 or /menus/1.json
  def update
    respond_to do |format|
      if @menu.update(menu_params)
        format.html { redirect_to @menu, notice: "Menu was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @menu }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @menu.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /menus/1 or /menus/1.json
  def destroy
    @menu.destroy!

    respond_to do |format|
      format.html { redirect_to menus_path, notice: "Menu was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menu
      @menu = Menu.find(params.expect(:id))
    end

    # Require admin access for destructive actions
    def require_admin
      unless user_signed_in? && current_user.admin?
        redirect_to menus_path, alert: "Accès refusé. Seuls les administrateurs peuvent effectuer cette action."
      end
    end

    # Only allow a list of trusted parameters through.
    def menu_params
      params.expect(menu: [ :name, :description, :price, :category, :available, :image ])
    end
end
