require "test_helper"

class ChefControllerTest < ActionDispatch::IntegrationTest
  test "should get dashboard" do
    get chef_dashboard_url
    assert_response :success
  end
end
