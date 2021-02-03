FROM ruby:2.6.5

ENV LC_ALL=C.UTF-8
WORKDIR /app

COPY Gemfile* ./
RUN gem install sassc-rails
RUN gem install mini_racer
RUN bundle install

CMD bundle exec \
  jekyll serve --host 0.0.0.0 --incremental --livereload