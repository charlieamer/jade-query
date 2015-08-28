jade-query
==========
*A library that makes jade possible in browser by just typing `<x-jade>...</x-jade>`*

How to use
----------
First, you need to include `jade` standalone in yor browser (available [here](https://cdnjs.cloudflare.com/ajax/libs/jade/1.9.0/jade.min.js)) (*Note: since internationalization, jade 1.10.0 and above doesn't work for now. Version in the link is 1.9.0*), then you need `jquery` (available [here](http://code.jquery.com/jquery-2.1.1.min.js)), and then include `jq.js` from this repository, and you are good to go. You must include `jquery` and `jade.js` **before** `jq.js`. In order to use jade inside browser simply put:
```html
<x-jade id="hello">
    h1 Hello from jade
</x-jade>
```
- *Note:* this works stright away in your browser without the need of recompilation.
- *Note:* please note that for now you need to put some id to your jade element.

What about javascript runtime, variables and stuff ?
----------------------------------------------------
Although `<x-jade>` elements get compiled *automaticly* at the DOM ready event, you might still want to pass your own variables to jade in order to control `<x-jade>` elements.
In order to pass some variables to jade element. you should use `jq.reapply` function from your javascript:
```javascript
jq.reapply('id_of_element', {some_variable_name: some_variable_data})
```
*Note:* please note that in order for variables to be passed successfuly to jade element, you must use **dictionary** as second variable (like shown above).

Why would I use it ?
--------------------
It makes async stuff damn easier. Check out `finance.html` in `examples` directory.

Use jade inside jade ?
----------------------
Currently it is under development, but in near future it will be possible.

Use jade-query from server-side jade ?
--------------------------------------
Yes it is possible.
```jade
h1 this is server-side jade
x-jade#some_jade_div.
    h2 this is client-side jade
```
*Note:* Please note the dot at the end of second line. It is neccessary in order to tell server-side jade to literally write everything you write inside that jade element.

Simple example
--------------
```html
<x-jade id='content'>
  h1 Jade - node template engine
  #container.col
    if youAreUsingJade
      p You are amazing
    else
      p Get on it!
    p.
      Jade is a terse and simple templating language with a strong focus on performance and powerful features.
</x-jade>
<script>
  // this is not really necessary, but just to show example how to send variables to jade
  jq.reapply('content', {youAreUsingJade: true});
</script>
```
After browser DOM is ready, this will produce following code:
```html
<div id="jade_content">
    <h1>Jade - node template engine</h1>
    <div id="container" class="col">
        <p>You are amazing</p>
        <p>Jade is a terse and simple templating language with a
strong focus on performance and powerful features.
        </p>
    </div>
</div>
```

What you should know
--------------------
- When you do `jq.reapply('some_id')`, `jq` will put another div element after <x-jade> element called `jade_some_id`. To be more precise:
```html
<x-jade id="some_id">
    ...
</jade>
<div id="jade_some_id">
    ...
</div>
```
is what you get after jq reapplies.
- You don't need to worry if you `jq.reapply` more times same element.

Examples
--------
There are examples in example directory. Yes I know, they look ugly, but hey, I am developer not a designer :D. In order to run them you must first issue `bower install` command.
**Have fun ! ;)**
