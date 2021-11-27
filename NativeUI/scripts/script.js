/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

const Textures = require('Textures');

const NativeUI = require('NativeUI');
const Patches = require('Patches');

Promise.all([
     Textures.findFirst('Flag1'),
     Textures.findFirst('Flag2'),
     Textures.findFirst('Flag3'),
     Textures.findFirst('Flag4'),

]).then(function(results)
{  
const Flag1 = results[0];
const Flag2 = results[1];
const Flag3 = results[2];
const Flag4 = results[3];

const picker = NativeUI.picker;

const config = {
    selectedIndex : 0,
    items : [
        {image_texture : Flag1},
        {image_texture : Flag2},
        {image_texture : Flag3},
        {image_texture : Flag4},

    ]
    
}
picker.configure(config);

picker.visible = true;

picker.selectedIndex.monitor().subscribe(function(eventValue)
{
      Diagnostics.log("selectedIndex" + eventValue.newValue);
      Patches.setScalarValue("selectedIndex",eventValue.newValue);
});



});