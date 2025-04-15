set -0 errexit

bundle install
bundle exec rails assest:precompile
bundle exec rails assets:clean
