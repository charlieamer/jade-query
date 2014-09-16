jade-query
==========
*A library that makes jade possible in browser by just typing <jade>...</jade>*

How to use
----------
First, you need to include `jade` runtime in yor browser (available [here](https://raw.githubusercontent.com/visionmedia/jade/master/runtime.js)), then you need `jquery` (available [here](http://code.jquery.com/jquery-2.1.1.min.js)), and then include `jq.js` from this repository, and you are good to go. In order to use jade inside browser simply put. You must include `jquery` and `jade.js` **before** `jq.js`.
```html
<jade id="hello">
    h1 Hello from jade
</jade>
```
*Note:* please note that for now you need to put some id to your jade element.

What about javascript runtime, variables and stuff ?
----------------------------------------------------
In order to pass some variables to jade element. you should use `jq.reapply` function from your javascript:
```javascript
jq.reapply('id_of_element', {some_variable_name: some_variable_data})
```
*Note:* please note that in order for variables to be passed successfuly to jade element, you must use **dictionary** as second variable (like shown above).

Simple example
--------------
```html
<jade id='content'>
  h1 Jade - node template engine
  #container.col
    if youAreUsingJade
      p You are amazing
    else
      p Get on it!
    p.
      Jade is a terse and simple templating language with a strong focus on performance and powerful features.
</jade>
<script>
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
- The <jade> element still exists in browser DOM, but on document ready, we tell every <jade> element to hide
- When you do `jq.reapply('some_id')`, `jq` will put another div element after <jade> element called `jade_some_id`. To be more precise:
```html
<jade id="some_id">
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
