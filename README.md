# marq [![Build Status](https://travis-ci.org/helpscout/marq.svg?branch=master)](https://travis-ci.org/helpscout/marq) [![Coverage Status](https://coveralls.io/repos/github/helpscout/marq/badge.svg?branch=master)](https://coveralls.io/github/helpscout/marq?branch=master)

Generate markdown posts from JSON API responses!

![Magic](https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif)

Note: Currently only setup to do parsing on a static CURL return file.

Not actually hitting HubSpot's API, **YET**!


## Install

```
npm install marq --save-dev
```

## Basic Usage

**Note: These features aren't developed yet. Just writing down docs for future use**

```js
import marq from 'marq';

const config = {
  hubspot: {
    key: 'demo',
  },
  dest: './_posts/',
  template: './template.js',
};

marq(config);
```

### Options

#### hubspot

| Type | Description |
| --- | --- |
| `object` | API credentials for Hubspot. |


#### dest

| Type | Default | Description |
| --- | --- | --- |
| `string` | `./_posts` | Directory for marq to save posts in. |


#### template

| Type | Description |
| --- | --- |
| `string` | Location of the markdown template for marq to use. |



## API Notes

Check out **[HubSpot's API docs](https://developers.hubspot.com/docs/methods/blogv2/get_blog_posts)**
