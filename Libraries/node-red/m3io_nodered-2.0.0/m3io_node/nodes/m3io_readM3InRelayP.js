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
  function m3io_readM3InRelayP(config){
    RED.nodes.createNode(this,config);
    var node=this;
    node.on('input',function(msg) {
      var name = config.name;
      var unit = Number(msg.unit || config.unit);
      var slot = Number(msg.slot || config.slot);
	  var pos = Number(msg.position || config.pos);
      var thr = config.thr;
      var ret = 0;

      var aval = [0];
      ret=m3io.readm3inrelayp(unit,slot,pos,aval);
      if( ret != 0 ){
        node.error("get some function error...");
        return;
      }
      msg.payload = aval[0];
      msg.topic = unit+","+slot+","+pos;
      msg.label = null;
      if( thr ){
         msg.position = (msg.position || pos);
      }else{
         msg.position = null;
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("readM3InRelayP",m3io_readM3InRelayP);
}
