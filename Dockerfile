FROM ruby:2.6.6

ENV LC_ALL=C.UTF-8
WORKDIR /app

COPY Gemfile* ./
RUN gem install bundler -v '1.17.3'
RUN bundle install

CMD bundle exec \
  jekyll serve --host 0.0.0.0 --incremental --livereload