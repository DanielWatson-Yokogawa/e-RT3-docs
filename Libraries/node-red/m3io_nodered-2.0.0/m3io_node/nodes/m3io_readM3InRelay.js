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
  function m3io_readM3InRelay(config){
    RED.nodes.createNode(this,config);
    var node=this;
    node.on('input',function(msg) {
      var name = config.name;
      var unit = Number(config.unit);
      var slot = Number(config.slot);
      var pos = Number(config.pos);
      var blk = Number(config.blk);
      var thr = config.thr;
      var binout = config.bin;
      var aval = [0,0,0,0];
      var i = 0;
      var ret = 0;
      if( unit<0 || unit>7 ){
        node.error("unit no is between 0 and 7.");
        return;
      }
      if( slot<1 || slot>16 ){
        node.error("slot no is between 1 and 16.");
        return;
      }
      if( blk<1 || blk>4 ){
        node.error("num block is between 1 and 4.");
        return;
      }
      if( pos != 1 && pos != 17 && pos != 33 && pos !=49 ){
        node.error("position no is 1,17,33 or 49.");
        return;
      }
      ret=m3io.readm3inrelay(unit,slot,pos,blk,aval);
      if( ret != 0 ){
        node.error("get some function error...");
        return;
      }
      if( binout ){
        msg.payload = ('0000000000000000'+aval[0].toString(2)).slice(-16);
        for(i=1;i<blk;i++){
          msg.payload = ('0000000000000000'+aval[i].toString(2)).slice(-16)+msg.payload;
        }
      }else{
        msg.payload = "0x"+aval[0].toString(16);
        for(i=1;i<blk;i++){
          msg.payload = msg.payload+",0x"+aval[i].toString(16);
        }
      }
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
  RED.nodes.registerType("readM3InRelay",m3io_readM3InRelay);
}
