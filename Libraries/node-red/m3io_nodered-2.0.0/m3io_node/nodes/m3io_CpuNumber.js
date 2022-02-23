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
  function m3io_CpuNumber(config){
    RED.nodes.createNode(this,config);
    var node=this;
    node.on('input',function(msg) {
      msg.payload=m3io.getm3cpunumber();
      node.send(msg);
    });
  }
  RED.nodes.registerType("CpuNumber",m3io_CpuNumber);
}
