jq = {
  compiled: {},
  textTransform: function(text) {
    var old_lines = text.split('\n');
    var lines = [];
    old_lines.forEach(function(f){
      if (f.trim() !== "")
        lines.push(f);
    });
    var begin = /^(\W*)\w/.exec(lines[0])[1];
    var rep = new RegExp("^" + begin);
    var ret = [];
    lines.forEach(function(f) {
      ret.push(f.replace(rep, ""));
    });
    return ret.join('\n');
  },
  rebuild: function rebuild(id) {
    if (!id)
      $("jade").each(function(index, element){
        id = $(element).attr('id');
        if (!id)
        {
          console.error('jade element doesn\'t contain id, it will be ignored');
          console.debug('this one:', element);
        }
        else
          rebuild($(element).attr('id'));
      });
    else
    {
      if ($("#" + id).length === 0)
        throw new Error("Element with ID: " + id + " doesn't exist");
      $("#" + id).hide();
      if (!jq.compiled[id])
        jq.compiled[id] = {};
      jq.compiled[id].templ = jade.compile(jq.textTransform($("#" + id).html()));
      console.debug('Compiled jade element ' + id);
      if ($("#jade_" + id).length === 0)
      {
        $("#" + id).after("<div id='jade_" + id + "'></div>");
      }
      try {
        jq.reapply(id);
      } catch(err) {
        console.warn('Couldn\'t display jade with id:', id);
        console.warn('Probably needs some data');
      }
      return jq.compiled[id].templ;
    }
  },
  reapply: function reapply(id, data) {
    if (!id)
      $("jade").each(function(index, element){
        reapply($(element).attr('id'), data);
      });
    else
    {
      if ($("#" + id).length === 0)
        throw new Error("Element with ID: " + id + " doesn't exist");
      if (!jq.compiled[id]) jq.rebuild(id);
      var fn = jq.compiled[id].templ;
      if (typeof data !== "undefined")
        jq.compiled[id].data = data;
      $("#jade_" + id).html(fn(jq.compiled[id].data));
    }
  }
};

$(document).ready(function(){
  jq.rebuild();
});
