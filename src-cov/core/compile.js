/* automatically generated by JSCoverage - do not edit */
try {
  if (typeof top === 'object' && top !== null && typeof top.opener === 'object' && top.opener !== null) {
    // this is a browser window that was opened from another window

    if (! top.opener._$jscoverage) {
      top.opener._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null) {
    // this is a browser window

    try {
      if (typeof top.opener === 'object' && top.opener !== null && top.opener._$jscoverage) {
        top._$jscoverage = top.opener._$jscoverage;
      }
    }
    catch (e) {}

    if (! top._$jscoverage) {
      top._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null && top._$jscoverage) {
    _$jscoverage = top._$jscoverage;
  }
}
catch (e) {}
if (typeof _$jscoverage !== 'object') {
  _$jscoverage = {};
}
if (! _$jscoverage['core/compile.js']) {
  _$jscoverage['core/compile.js'] = [];
  _$jscoverage['core/compile.js'][13] = 0;
  _$jscoverage['core/compile.js'][15] = 0;
  _$jscoverage['core/compile.js'][19] = 0;
  _$jscoverage['core/compile.js'][20] = 0;
  _$jscoverage['core/compile.js'][26] = 0;
  _$jscoverage['core/compile.js'][27] = 0;
  _$jscoverage['core/compile.js'][33] = 0;
  _$jscoverage['core/compile.js'][34] = 0;
  _$jscoverage['core/compile.js'][37] = 0;
  _$jscoverage['core/compile.js'][40] = 0;
  _$jscoverage['core/compile.js'][42] = 0;
  _$jscoverage['core/compile.js'][43] = 0;
  _$jscoverage['core/compile.js'][44] = 0;
  _$jscoverage['core/compile.js'][45] = 0;
  _$jscoverage['core/compile.js'][48] = 0;
  _$jscoverage['core/compile.js'][58] = 0;
  _$jscoverage['core/compile.js'][62] = 0;
  _$jscoverage['core/compile.js'][63] = 0;
  _$jscoverage['core/compile.js'][64] = 0;
  _$jscoverage['core/compile.js'][68] = 0;
  _$jscoverage['core/compile.js'][69] = 0;
  _$jscoverage['core/compile.js'][76] = 0;
  _$jscoverage['core/compile.js'][77] = 0;
  _$jscoverage['core/compile.js'][79] = 0;
  _$jscoverage['core/compile.js'][80] = 0;
  _$jscoverage['core/compile.js'][81] = 0;
  _$jscoverage['core/compile.js'][82] = 0;
  _$jscoverage['core/compile.js'][87] = 0;
  _$jscoverage['core/compile.js'][88] = 0;
  _$jscoverage['core/compile.js'][89] = 0;
  _$jscoverage['core/compile.js'][91] = 0;
  _$jscoverage['core/compile.js'][103] = 0;
  _$jscoverage['core/compile.js'][105] = 0;
  _$jscoverage['core/compile.js'][109] = 0;
  _$jscoverage['core/compile.js'][110] = 0;
  _$jscoverage['core/compile.js'][118] = 0;
  _$jscoverage['core/compile.js'][119] = 0;
  _$jscoverage['core/compile.js'][121] = 0;
  _$jscoverage['core/compile.js'][122] = 0;
  _$jscoverage['core/compile.js'][125] = 0;
  _$jscoverage['core/compile.js'][126] = 0;
  _$jscoverage['core/compile.js'][130] = 0;
  _$jscoverage['core/compile.js'][140] = 0;
}
_$jscoverage['core/compile.js'].source = ["/**","* Compile","* (c) 2013 Bill, BunKat LLC.","*","* Compiles a schedule definition into a form from which instances can be","* efficiently calculated from.","*","* Later is freely distributable under the MIT license.","* For all details and documentation:","*     http://github.com/bunkat/later","*/","","later.compile = function(schedDef) {","","  var constraints = [],","      constraintsLen = 0,","      tickConstraint;","","  for(var key in schedDef) {","    var nameParts = key.split('_'),","        name = nameParts[0],","        mod = nameParts[1],","        vals = schedDef[key],","        constraint = mod ? later.modifier[mod](later[name], vals[0]) : later[name];","","    constraints.push({constraint: constraint, vals: vals});","    constraintsLen++;","  }","","  // sort constraints based on their range for best performance (we want to","  // always skip the largest block of time possible to find the next valid","  // value)","  constraints.sort(function(a,b) {","    return a.constraint.range &lt; b.constraint.range;","  });","","  console.log(constraints);","","  // this is the smallest constraint which we will use to tick this schedule","  tickConstraint = constraints[constraintsLen-1].constraint;","","  function compareFn(dir) {","    return dir === 'next' ?","      function(a,b) { return a &gt; b; } :","      function(a,b) { return b &gt; a; };","  }","","  return {","","    /**","    * Calculates the start of the next valid occurrence of a particular schedule","    * that occurs on or after the specified start time.","    *","    * @param {String} dir: Direction to search in ('next' or 'prev')","    * @param {Date} startDate: The first possible valid occurrence","    */","    start: function(dir, startDate) {","      var next = startDate,","          nextVal = later.array[dir],","          done = false;","","      while(!done &amp;&amp; next) {","        console.log('start next=' + next.toUTCString());","        done = true;","","        // verify all of the constraints in order since we want to make the","        // largest jumps possible to find the first valid value","        for(var i = 0; i &lt; constraintsLen; i++) {","          var constraint = constraints[i].constraint,","              curVal = constraint.val(next),","              vals = constraints[i].vals,","              extent = constraint.extent(next),","              newVal = nextVal(curVal, vals, extent),","              testVal = extent[0] !== 0 ? newVal || extent[1] : newVal;","","          console.log('curVal=' + curVal);","          console.log('newVal=' + newVal);","","          if(curVal !== testVal) {","            next = constraint[dir](next, newVal);","            done = false;","            break;","          }","        }","      }","","      if(next) {","        console.log('next=' + next.toUTCString());","        console.log('next start=' + tickConstraint.start(next).toUTCString());","      }","      return next ? tickConstraint.start(next) : undefined;","    },","","    /**","    * Given a valid start time, finds the next schedule that is invalid.","    * Returns the start time if it is actually invalid. Useful for finding the","    * end of a valid time range.","    *","    * @param {String} dir: Direction to search in ('next' or 'prev')","    * @param {Date} startDate: The first possible valid occurrence","    */","    end: function(dir, startDate) {","      dir = 'next';","","      var nextInvalidVal = later.array[dir + 'Invalid'],","          compare = compareFn(dir),","          result;","","      for(var i = constraintsLen-1; i &gt;= 0; i--) {","        var constraint = constraints[i].constraint,","            curVal = constraint.val(startDate),","            vals = constraints[i].vals,","            extent = constraint.extent(startDate),","            nextVal = nextInvalidVal(curVal, vals, extent),","            testVal = extent[0] !== 0 ? nextVal || extent[1] : nextVal,","            next;","","        if(testVal === curVal) { // startDate is invalid, use that","          next = startDate;","        }","        else if(nextVal !== undefined) { // constraint has invalid value, use that","          next = constraint[dir](startDate, nextVal);","        }","","        if(next &amp;&amp; (!result || compare(result, next))) {","          result = next;","        }","      }","","      return result;","    },","","    /**","    * Ticks the date by the minimum constraint in this schedule","    *","    * @param {String} dir: Direction to search in ('next' or 'prev')","    * @param {Date} date: The start date to tick from","    */","    tick: function(dir, date) {","      return new Date(dir === 'next' ?","        tickConstraint.end(date).getTime() + later.SEC :","        tickConstraint.start(date).getTime() - later.SEC);","    }","","  };","};"];
_$jscoverage['core/compile.js'][13]++;
later.compile = (function (schedDef) {
  _$jscoverage['core/compile.js'][15]++;
  var constraints = [], constraintsLen = 0, tickConstraint;
  _$jscoverage['core/compile.js'][19]++;
  for (var key in schedDef) {
    _$jscoverage['core/compile.js'][20]++;
    var nameParts = key.split("_"), name = nameParts[0], mod = nameParts[1], vals = schedDef[key], constraint = (mod? (later.modifier[mod])(later[name], vals[0]): later[name]);
    _$jscoverage['core/compile.js'][26]++;
    constraints.push({constraint: constraint, vals: vals});
    _$jscoverage['core/compile.js'][27]++;
    (constraintsLen++);
}
  _$jscoverage['core/compile.js'][33]++;
  constraints.sort((function (a, b) {
  _$jscoverage['core/compile.js'][34]++;
  return (a.constraint.range < b.constraint.range);
}));
  _$jscoverage['core/compile.js'][37]++;
  console.log(constraints);
  _$jscoverage['core/compile.js'][40]++;
  tickConstraint = constraints[(constraintsLen - 1)].constraint;
  _$jscoverage['core/compile.js'][42]++;
  function compareFn(dir) {
    _$jscoverage['core/compile.js'][43]++;
    return ((dir === "next")? (function (a, b) {
  _$jscoverage['core/compile.js'][44]++;
  return (a > b);
}): (function (a, b) {
  _$jscoverage['core/compile.js'][45]++;
  return (b > a);
}));
}
  _$jscoverage['core/compile.js'][48]++;
  return ({start: (function (dir, startDate) {
  _$jscoverage['core/compile.js'][58]++;
  var next = startDate, nextVal = later.array[dir], done = false;
  _$jscoverage['core/compile.js'][62]++;
  while (((! done) && next)) {
    _$jscoverage['core/compile.js'][63]++;
    console.log(("start next=" + next.toUTCString()));
    _$jscoverage['core/compile.js'][64]++;
    done = true;
    _$jscoverage['core/compile.js'][68]++;
    for (var i = 0; (i < constraintsLen); (i++)) {
      _$jscoverage['core/compile.js'][69]++;
      var constraint = constraints[i].constraint, curVal = constraint.val(next), vals = constraints[i].vals, extent = constraint.extent(next), newVal = nextVal(curVal, vals, extent), testVal = ((extent[0] !== 0)? (newVal || extent[1]): newVal);
      _$jscoverage['core/compile.js'][76]++;
      console.log(("curVal=" + curVal));
      _$jscoverage['core/compile.js'][77]++;
      console.log(("newVal=" + newVal));
      _$jscoverage['core/compile.js'][79]++;
      if ((curVal !== testVal)) {
        _$jscoverage['core/compile.js'][80]++;
        next = (constraint[dir])(next, newVal);
        _$jscoverage['core/compile.js'][81]++;
        done = false;
        _$jscoverage['core/compile.js'][82]++;
        break;
      }
}
}
  _$jscoverage['core/compile.js'][87]++;
  if (next) {
    _$jscoverage['core/compile.js'][88]++;
    console.log(("next=" + next.toUTCString()));
    _$jscoverage['core/compile.js'][89]++;
    console.log(("next start=" + tickConstraint.start(next).toUTCString()));
  }
  _$jscoverage['core/compile.js'][91]++;
  return (next? tickConstraint.start(next): undefined);
}), end: (function (dir, startDate) {
  _$jscoverage['core/compile.js'][103]++;
  dir = "next";
  _$jscoverage['core/compile.js'][105]++;
  var nextInvalidVal = later.array[(dir + "Invalid")], compare = compareFn(dir), result;
  _$jscoverage['core/compile.js'][109]++;
  for (var i = (constraintsLen - 1); (i >= 0); (i--)) {
    _$jscoverage['core/compile.js'][110]++;
    var constraint = constraints[i].constraint, curVal = constraint.val(startDate), vals = constraints[i].vals, extent = constraint.extent(startDate), nextVal = nextInvalidVal(curVal, vals, extent), testVal = ((extent[0] !== 0)? (nextVal || extent[1]): nextVal), next;
    _$jscoverage['core/compile.js'][118]++;
    if ((testVal === curVal)) {
      _$jscoverage['core/compile.js'][119]++;
      next = startDate;
    }
    else {
      _$jscoverage['core/compile.js'][121]++;
      if ((nextVal !== undefined)) {
        _$jscoverage['core/compile.js'][122]++;
        next = (constraint[dir])(startDate, nextVal);
      }
    }
    _$jscoverage['core/compile.js'][125]++;
    if ((next && ((! result) || compare(result, next)))) {
      _$jscoverage['core/compile.js'][126]++;
      result = next;
    }
}
  _$jscoverage['core/compile.js'][130]++;
  return result;
}), tick: (function (dir, date) {
  _$jscoverage['core/compile.js'][140]++;
  return new Date(((dir === "next")? (tickConstraint.end(date).getTime() + later.SEC): (tickConstraint.start(date).getTime() - later.SEC)));
})});
});