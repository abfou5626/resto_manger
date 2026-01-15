class MenuPolicy < ApplicationPolicy
  def index?   ; true ; end
  def show?    ; true ; end
  def create?  ; user.admin? ; end
  def update?  ; user.admin? ; end
  def destroy? ; user.admin? ; end

  class Scope < Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if user.admin?
        scope.all
      else
        scope.where(available: true)
      end
    end
  end
end
