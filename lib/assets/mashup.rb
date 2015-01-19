# this file will prompt user for input on whether to get or post to twitter
# will need access token and apik api key
# call to twitter

######## MAIN: Authorizes the app ############# 
#require dependencies
require 'rubygems'
require 'oauth'
require 'json'
require 'openssl'

class Access


  def run!
  #introduction
  introduction
  
  #build access tokens and apikey
  consumer_key = OAuth::Consumer.new("fnCjxeY7S1z42zznv9Bvyg",
    "wKF4RZ5JPRIvzZ337T6aG1HZfVi0jiFUDqUyqnhQQ")
  access_token = OAuth::Token.new(
    "62972312-EvOQD1f0Puqn7xikzwpa6xMgt7yiWU0OILT1TuZxB",
    "NMM2rkAuDTz6U5g0iDCPEB0UUuhuQlRl30mAFdkerIAWH")

  #do action if geting
  address, request = build_req_string(user_response, count)

  # Set up HTTP.
  http             = Net::HTTP.new address.host, address.port
  http.use_ssl     = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  # Issue the request.
  request.oauth! http, consumer_key, access_token
  http.start
  response = http.request request

  # Parse and print the Tweet if the response code was 200
  tweet = nil
  if response.code == '200' then
    tweets = JSON.parse(response.body)
    puts "#{count} TWEETS".center(60)
    puts "-" * 60
    tweets.each {|t| puts "Tweet: #{t["text"]} \n\n".ljust(30)}
  else
    puts "Could not get the Tweets " +
    "Code:#{response.code} Body:#{response.body}\n\n"
  end

  #go execute action
  #conlcusion
  conclusion
end

def build_req_string(screen_name,count=10)
    baseurl = "https://api.twitter.com"
    path    = "/1.1/statuses/user_timeline.json"
    query   = URI.encode_www_form(
      "screen_name" => "#{screen_name.to_s}",
      "count" => count,
      )
    address = URI("#{baseurl}#{path}?#{query}")
    request = Net::HTTP::Get.new address.request_uri
    return address, request
  end
end

end