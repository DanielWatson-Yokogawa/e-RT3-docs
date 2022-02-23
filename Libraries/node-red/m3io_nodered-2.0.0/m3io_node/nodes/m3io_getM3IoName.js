/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2021 Yokogawa Technologies Solutions India Pvt. Ltd.
 * 
 * All rights reserved.
 * 
 * Licensed under the MIT License. See LICENSE FILE in the project root for
 * license information.
 * --------------------------------------------------------------------------
 */

module.exports=function(RED){
  var m3io=require('m3io');
  function m3io_getM3IoName(config){
    RED.nodes.createNode(this,config);
    var node=this;
    node.on('input',function(msg) {
      var name = config.name;
      var unit = Number(msg.unit || config.unit);
      var slot = Number(msg.slot || config.slot);

      msg.payload=m3io.getm3ioname(unit,slot);
//      msg.payload = "["+name+"]  unit:"+unit+" , slot:"+slot;
      node.send(msg);
    });
  }
  RED.nodes.registerType("getM3IoName",m3io_getM3IoName);
}
