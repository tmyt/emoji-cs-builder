'use strict';

const fs = require('fs');

fs.readFile('./node_modules/emoji-datasource/emoji.json', (err, json) => {
  let emoji = JSON.parse(json);
  console.log('new Dictionary<string,string>{');
  for(var i = 0; i < emoji.length; ++i){
    var u = emoji[i].unified;
    if(emoji[i].variations.length > 0) u = emoji[i].variations[0];
    u = '\\u' + u.replace(/-/g, '\\u');
    u = u.replace(/u([A-F0-9]{5})/g, (m, p1) => {
     var uni = parseInt(`0x${p1}`);
     var hi = Math.floor((uni - 0x10000) / 0x400 + 0xD800);
     var lo = (uni - 0x10000) % 0x400 + 0xDC00;
     return `u${hi.toString('16')}\\u${lo.toString('16')}`;
    }); 
    for(var j = 0; j < emoji[i].short_names.length; ++j){
     console.log(`{"${emoji[i].short_names[j]}", "${u}"},`);
    }
  }
  console.log('}');
});

