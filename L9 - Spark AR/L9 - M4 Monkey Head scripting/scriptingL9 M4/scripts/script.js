const Animation = require('Animation');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');

const sceneRoot = Scene.root;

Promise.all([
    sceneRoot.findFirst('Suzanne'),
    sceneRoot.findFirst('planeTracker0'),
    sceneRoot.findFirst('placer')
])
.then(function(objects){
    const base = objects[0];
    const planeTracker = objects[1];
    const placer = objects[2];


    const baseDriverParameters = {
        durationMilliseconds : 400,
        loopCount : Infinity,
        mirror : true
    };
    
    const baseDriver = Animation.timeDriver(baseDriverParameters);
    baseDriver.start();

    const baseSampler = Animation.samplers.easeInQuint(0.7,1);

    const baseAnimation = Animation.animate(baseDriver,baseSampler);

    const baseTransform = base.transform;

    baseTransform.scaleX = baseAnimation;
    baseTransform.scaleY = baseAnimation;
    baseTransform.scaleZ = baseAnimation;

    TouchGestures.onPan().subscribe(function(gesture) {
        planeTracker.trackPoint(gesture.location, gesture.state);
    });
    
    const placerTransform = placer.transform;
    
    TouchGestures.onPinch().subscribeWithSnapshot( {
        'lastScaleX' : placerTransform.scaleX,
        'lastScaleY' : placerTransform.scaleY,
        'lastScaleZ' : placerTransform.scaleZ 
    }, function (gesture, snapshot) {
        placerTransform.scaleX = gesture.scale.mul(snapshot.lastScaleX);
        placerTransform.scaleY = gesture.scale.mul(snapshot.lastScaleY);
        placerTransform.scaleZ = gesture.scale.mul(snapshot.lastScaleZ);
    });
    TouchGestures.onRotate().subscribeWithSnapshot( {
        'lastRotationY' : placerTransform.rotationY,
    }, function (gesture, snapshot) {
        const correctRotation = gesture.rotation.mul(-1);
        placerTransform.rotationY = correctRotation.add(snapshot.lastRotationY);
    });
});




