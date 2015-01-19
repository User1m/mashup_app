# Get Path to current directory

ROOT = File.dirname(__FILE__)

# call to instanciate startup program

$:.unshift(File.join(ROOT,'lib'))
require 'access'

tweet = Access.new
tweet.run!

