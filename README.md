# coding-test

[![Build Status](https://travis-ci.org/yharish991/coding-test.svg?branch=master)](https://travis-ci.org/yharish991/coding-test)

DB used : Cloudant

## Setup

1. Install NodeJS (Check your node version with `node -v`)

2. Install yarn `npm install -g yarn`

2. Install basic packages by running `yarn install`

3. Add environment variables to your particular shell.

    `export CLOUDANT_USERNAME="{CLOUDANT_USERNAME}"`

    `export CLOUDANT_PASSWORD="{CLOUDANT_PASSWORD}"`
  
    or

    Add the credentials in the .env file

4. To start the app `node app.js`


## Gulp tasks

To run the unit tests `gulp test`

To run lint tests `gulp lint`


## API Documentation

Run swagger on local machine and the open the file `coding-test.yml` in the swagger editor.

## Load testing

Open `coding-test.jmx` in jmeter and run it or run via command line. 
