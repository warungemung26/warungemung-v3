// character3d.js - low-poly generic GLB loader with fallback image and simple idle + wave animations
document.addEventListener('DOMContentLoaded', ()=>{
  const canvas = document.getElementById('neng3d');
  const img = document.getElementById('nengImage');
  const modelPath = 'assets/models/neng.glb';

  // try HEAD first
  fetch(modelPath, {method:'HEAD'}).then(res=>{
    if(res.ok){
      initThreeModel(modelPath, canvas);
      img.classList.add('hidden');
      canvas.classList.remove('hidden');
    } else {
      img.classList.remove('hidden');
      canvas.classList.add('hidden');
    }
  }).catch(err=>{
    console.warn('Error fetching model, fallback to image.', err);
    img.classList.remove('hidden');
    canvas.classList.add('hidden');
  });

  function initThreeModel(path, canvasEl){
    Promise.all([
      import('https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js'),
      import('https://cdn.jsdelivr.net/npm/three@0.159.0/examples/jsm/loaders/GLTFLoader.js')
    ]).then(mods=>{
      const THREE = mods[0];
      const { GLTFLoader } = mods[1];
      const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha:true, antialias:true });
      renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, canvasEl.clientWidth / canvasEl.clientHeight, 0.1, 100);
      camera.position.set(0,1.2,2.8);
      const hLight = new THREE.DirectionalLight(0xffffff, 1.0);
      hLight.position.set(1,2,1);
      scene.add(hLight);
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const loader = new GLTFLoader();
      loader.load(path, gltf=>{
        const model = gltf.scene;
        model.scale.set(1.0,1.0,1.0);
        model.position.set(0,-1.0,0);
        scene.add(model);

        // try to find animation clips (idle/wave) and play first if available
        let mixer = null;
        if(gltf.animations && gltf.animations.length>0){
          mixer = new THREE.AnimationMixer(model);
          // play all clips softly
          gltf.animations.forEach((clip, i)=>{
            const action = mixer.clipAction(clip);
            action.play();
            action.setEffectiveWeight(0.8);
          });
        }

        function animate(){
          requestAnimationFrame(animate);
          if(mixer) mixer.update(0.016);
          model.rotation.y += 0.002; // very slow rotation to give life
          renderer.render(scene, camera);
        }
        animate();
      }, undefined, err=>{
        console.error('Failed to load glb, fallback to image.', err);
        canvasEl.classList.add('hidden');
        img.classList.remove('hidden');
      });
      window.addEventListener('resize', ()=> {
        renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight);
        camera.aspect = canvasEl.clientWidth / canvasEl.clientHeight;
        camera.updateProjectionMatrix();
      });
    }).catch(e=>{
      console.error('Failed to load three modules', e);
      img.classList.remove('hidden');
      canvas.classList.add('hidden');
    });
  }

});
