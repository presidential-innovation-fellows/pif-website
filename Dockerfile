FROM ruby:3.2.11-slim

RUN apt-get update \
 && apt-get install --no-install-recommends -y \
      build-essential \
      locales \
 && sed -i 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
 && locale-gen en_US.UTF-8 \
 && rm -rf /var/lib/apt/lists/*

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US \
    LC_ALL=en_US.UTF-8

RUN useradd --create-home --shell /bin/bash jekyll

WORKDIR /app
RUN chown -R jekyll:jekyll /app
USER jekyll

COPY --chown=jekyll:jekyll Gemfile Gemfile.lock /app/
RUN bundle install

EXPOSE 4000
