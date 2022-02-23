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
  function m3io_SysLED(config){
    RED.nodes.createNode(this,config);
    var node=this;
    node.on('input',function(msg) {
      var name = config.name;
      var ret = 0;
      var onoff = 0;
      if( typeof(msg.payload) === "boolean" ){
        if( msg.payload === true ){
          onoff = 1;
        }
      }else if( typeof(msg.payload) === "number" ){
        if( msg.payload == 1 ){
          onoff = 1;
        }
      }
      switch(config.ledname){
        case 'RUN':
          ret=m3io.setm3runled(onoff);
        break;
        case 'ALM':
          ret=m3io.setm3almled(onoff);
        break;
        case 'U1':
          ret=m3io.setm3u1led(onoff);
        break;
        case 'U2':
          ret=m3io.setm3u2led(onoff);
        break;
        case 'U3':
          ret=m3io.setm3u3led(onoff);
        break;
      }
      if( ret != 0 ){
        node.error("m3io function gets some error...");
      }
//      msg.payload=m3io.getm3ioname(unit,slot);
//      node.send(msg);
    });
  }
  RED.nodes.registerType("SysLED",m3io_SysLED);
}
