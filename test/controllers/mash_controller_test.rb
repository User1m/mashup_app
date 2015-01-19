require 'test_helper'

class MashControllerTest < ActionController::TestCase
  test "should get mash" do
    get :mash
    assert_response :success
  end

end
