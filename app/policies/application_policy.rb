class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?; false; end
  def show?; false; end
  def create?; false; end
  def new?; create?; end
  def update?; false; end
  def edit?; update?; end
  def destroy?; false; end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.none
    end
  end
end
class MenuPolicy < ApplicationPolicy
  def index?   ; true ; end
  def show?    ; true ; end
  def create?  ; user.admin? ; end
  def update?  ; user.admin? ; end
  def destroy? ; user.admin? ; end

  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(available: true)
      end
    end
  end
end
