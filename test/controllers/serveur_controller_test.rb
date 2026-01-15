require "test_helper"

class ServeurControllerTest < ActionDispatch::IntegrationTest
  test "should get dashboard" do
    get serveur_dashboard_url
    assert_response :success
  end
end
