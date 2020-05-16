# html5-video-overlay
 
Sport Buff Vide overlay plugin written in vanillaJS compatible with any HTML5 video player.

#### Preview:

![Preview](https://i.imgur.com/2JwsZBJ.jpg)


### Install and Build:

``` 

$ npm install && npm run build

```

### Usage:

Add the following Javascript and CSS file at the beginning your webpage.

```

<link rel="stylesheet" href="../src/assets/style.css" />
<script src="../build-browser/index.js"></script>

```

You can init the BuffGame with adding the next code sample at the end of your page:

```

<script>
    window.onload = () => {
        BuffVideo('#player', {}); // VideoPlayer elementID , OptionalConfigs
    };
</script>


```

#### TODO:
- [ ] Reduce bundle size
- [ ] Build CSS into the bundle
- [ ] More customization with configurations
- [ ] Add E2E tests
