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
  function m3io_readM3IoRegister(config){
    RED.nodes.createNode(this,config);
    var node=this;
    node.on('input',function(msg) {
      var name = config.name;
      var unit = Number(msg.unit || config.unit);
      var slot = Number(msg.slot || config.slot);
      var reg = Number(msg.register || config.reg);
      var thr = config.thr;
      var ust = config.ust;
      var ret = 0;
      var aval = [0];
      if( ust ){
        ret=m3io.readm3ioregister(unit,slot,reg,1,aval,1);
      }else{
        ret=m3io.readm3ioregister(unit,slot,reg,1,aval);
      }
      if( ret != 0 ){
        node.error("get some function error...");
        return;
      }
      msg.payload = aval[0];
      msg.topic = unit+","+slot+","+reg;
      msg.label = null;
      if( thr ){
         msg.register = (msg.register || reg);
      }else{
         msg.register = null;
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("readM3IoRegister",m3io_readM3IoRegister);
}
