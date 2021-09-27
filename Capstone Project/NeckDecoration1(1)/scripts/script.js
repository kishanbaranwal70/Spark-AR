
const Scene = require('Scene');
const Patches = require('Patches');
const Reactive = require('Reactive');
const FaceTracking = require('FaceTracking');
const face0 = FaceTracking.face(0);
const NativeUI = require('NativeUI');
const Textures = require('Textures');

export const Diagnostics = require('Diagnostics');
  
Promise.all([
   
  
      Scene.root.findFirst('bustA'),
      Scene.root.findFirst('bustB'),
      Scene.root.findFirst('bustC'),

      Textures.findFirst('te0'),
      Textures.findFirst('te1'),
      Textures.findFirst('te2'),
      Textures.findFirst('te3'),
      Textures.findFirst('te4'),
      Textures.findFirst('te5'),


      Scene.root.findFirst('Necklace0'),
      Scene.root.findFirst('Necklace1'),
      Scene.root.findFirst('Necklace2'),
      Scene.root.findFirst('nosering0'),
      Scene.root.findFirst('earring_0'),
      Scene.root.findFirst('earring_1'),

      
]).then(onReady);
  
function onReady(assets) {

      const bustA = assets[0];
      const bustB = assets[1];
      const bustC = assets[2];
  
      const bustAtra = bustA.transform.toSignal();
      const bustBtra = bustB.transform.toSignal();
      const bustCtra = bustC.transform.toSignal();
  
      const faceTra = face0.cameraTransform.applyTo(bustAtra).applyTo(bustBtra).applyTo(bustCtra);
  
      const FaceOffset = Reactive.point(0,0,0.535);

      const neckPos = faceTra.position.add(FaceOffset).expSmooth(70);
  
      Patches.inputs.setVector('neck', neckPos);

      const button1 = assets[3];
      const button2 = assets[4];
      const button3 = assets[5];
      const button4 = assets[6];
      const button5 = assets[7];
      const button6 = assets[8];

      const Obj0 = assets[9];
      const Obj1 = assets[10];
      const Obj2 = assets[11];
      const Obj3 = assets[12];
      const Obj4 = assets[13];
      const Obj5 = assets[14];
      Obj1.hidden = true;
      Obj2.hidden = true;
      Obj3.hidden = true;
      Obj4.hidden = true;
      Obj5.hidden = true;

      const configuration = {

            selectedIndex: 3,
      
      // These are the image textures to use as the buttons in the NativeUI Picker
              
            items: [
      
              {image_texture: button1},
              {image_texture: button2},
              {image_texture: button3},
              {image_texture: button4},
              {image_texture: button5},
              {image_texture: button6},
      
            ]
          };

      const picker = NativeUI.picker;

      picker.configure(configuration);
  
      picker.visible  = true;
    
      
   // This is a monitor that watches for the picker to be used.
      
      picker.selectedIndex.monitor().subscribe(function(val) {
        Diagnostics.log("selectedIndex" + val.newValue);
        switch(val.newValue) {
  
          case 0: {
  
             Obj0.hidden = false;
             Obj1.hidden = true;
             Obj2.hidden = true;
             Obj3.hidden = true;
             Obj4.hidden = true;
             Obj5.hidden = true;
             break;
  
          }
  
          case 1: {
  
            Obj0.hidden = true;
            Obj1.hidden = false;
            Obj2.hidden = true;
            Obj3.hidden = true;
            Obj4.hidden = true;
            Obj5.hidden = true;
             break;
  
          }

          case 2: {
  
            Obj0.hidden = true;
            Obj1.hidden = true;
            Obj2.hidden = false;
            Obj3.hidden = true;
            Obj4.hidden = true;
            Obj5.hidden = true;
            
             break;
  
          }

          case 3: {
  
            Obj0.hidden = true;
            Obj1.hidden = true;
            Obj2.hidden = true;
            Obj3.hidden = false;
            Obj4.hidden = true;
            Obj5.hidden = true;
            
             break;
  
          }
          case 4: {
  
            Obj0.hidden = true;
            Obj1.hidden = true;
            Obj2.hidden = true;
            Obj3.hidden = true;
            Obj4.hidden = false;
            Obj5.hidden = false;
             break;
  
          }
          case 5: {
  
            Obj0.hidden = false;
            Obj1.hidden = true;
            Obj2.hidden = true;
            Obj3.hidden = false;
            Obj4.hidden = false;
            Obj5.hidden = false;
             break;
  
          }

  
        }
  
  
      });
}