# Portfolio Site

[scottleejason.com](http://www.scottleejason.com)

## Installation

```
git clone git@github.com:scottjason/portfolio.git && cd portfolio
```

```
touch env.json
```


In the env.json file, set the environmental variables for nodemailer (or remove nodemailer):

```
{
  "NODE_MAILER_EMAIL": "node mailer email",
  "NODE_MAILER_PASSWORD": "node mailer password"
}
```



```
npm install -g grunt-cli
```

```
npm install && bower install
```

## Usage

To develop: ```grunt server```

To build: ```grunt build```

## License

MIT