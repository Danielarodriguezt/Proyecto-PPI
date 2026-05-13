import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import './CircularGallery.css';

function lerp(p1, p2, t) {
    return p1 + (p2 - p1) * t;
}

class Media {
    constructor({ gl, image, index, length, scene, viewport, bend }) {
        this.gl = gl;
        this.image = image;
        this.index = index;
        this.length = length;
        this.scene = scene;
        this.viewport = viewport;
        this.bend = bend;
        this.extra = 0;

        this.createShader();
        this.createMesh();
        this.onResize();
    }

    createShader() {
        const texture = new Texture(this.gl);
        this.program = new Program(this.gl, {
            vertex: `
                attribute vec3 position;
                attribute vec2 uv;
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragment: `
                precision highp float;
                uniform sampler2D tMap;
                varying vec2 vUv;
                void main() {
                    gl_FragColor = texture2D(tMap, vUv);
                }
            `,
            uniforms: { tMap: { value: texture } }
        });

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.image;
        img.onload = () => {
            texture.image = img;
            this.imageAspect = img.naturalWidth / img.naturalHeight;
            this.onResize();
        };
    }

    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: new Plane(this.gl),
            program: this.program
        });
        this.plane.setParent(this.scene);
    }

    update(scroll) {
        this.plane.position.x = this.x - scroll.current - this.extra;
        const x = this.plane.position.x;
        const H = this.viewport.width / 2;

        if (this.bend !== 0) {
            const B = Math.abs(this.bend);
            const R = (H * H + B * B) / (2 * B);
            const effectiveX = Math.min(Math.abs(x), H);
            const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
            this.plane.position.y = this.bend > 0 ? -arc : arc;
            this.plane.rotation.z = (this.bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(effectiveX / R);
        }

        const planeOffset = this.plane.scale.x / 2;
        const viewportOffset = this.viewport.width / 2;

        if (this.plane.position.x + planeOffset < -viewportOffset) {
            this.extra -= this.widthTotal;
        } else if (this.plane.position.x - planeOffset > viewportOffset) {
            this.extra += this.widthTotal;
        }
    }

    onResize({ viewport } = {}) {
        if (viewport) this.viewport = viewport;
        const baseHeight = this.viewport.height * 0.35;
        const aspect = this.imageAspect || 1;

        this.plane.scale.y = baseHeight;
        this.plane.scale.x = baseHeight * aspect;
        this.padding = 0.5;

        this.width = this.plane.scale.x + this.padding;
        this.widthTotal = this.width * this.length;
        this.x = this.width * this.index;
    }
}

class App {
    constructor(container, { items, bend = 1 } = {}) {
        this.container = container;
        this.items = items;
        this.bend = bend;
        this.isDestroyed = false;

        this.scroll = { current: 0, target: 0, last: 0, ease: 0.05 };
        this.mouse = { isDown: false, x: 0, lastX: 0 };

        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createMedias();
//this.initEvents();
        this.update();
    }

    createRenderer() {
        this.renderer = new Renderer({ antialias: true, alpha: true });
        this.gl = this.renderer.gl;
        this.container.appendChild(this.gl.canvas);
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.position.z = 5; // Más cerca para que se vea más grande
    }

    createScene() {
        this.scene = new Transform();
    }

    createMedias() {
        const defaultItems = [
            { image: '/GaleriaCirc1.jpg' },
            { image: '/GaleriaCirc2.jpg' },
            { image: '/GaleriaCirc3.jpg' },
            { image: '/GaleriaCirc2.jpg' },
            { image: '/GaleriaCirc2.jpg' },
            { image: '/GaleriaCirc2.jpg' },
            { image: '/GaleriaCirc2.jpg' },
            { image: '/GaleriaCirc2.jpg' },
        ];

        const galleryItems = this.items && this.items.length ? this.items : defaultItems;

        this.medias = galleryItems.map((item, i) => new Media({
            gl: this.gl,
            image: item.image,
            index: i,
            length: galleryItems.length,
            scene: this.scene,
            viewport: this.viewport,
            bend: this.bend
        }));
    }

    onResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.renderer.setSize(width, height);
        this.camera.perspective({ aspect: width / height });

        const fov = (this.camera.fov * Math.PI) / 180;
        const viewHeight = 2 * Math.tan(fov / 2) * this.camera.position.z;
        this.viewport = { width: viewHeight * this.camera.aspect, height: viewHeight };

        if (this.medias) this.medias.forEach(m => m.onResize({ viewport: this.viewport }));
    }

    update() {
        if (this.isDestroyed) return;
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        if (this.medias) this.medias.forEach(m => m.update(this.scroll));

        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        requestAnimationFrame(() => this.update());
    }

    destroy() {
        this.isDestroyed = true;
        window.removeEventListener('resize', this.onResizeEvent);
        // Limpieza básica de eventos y canvas si es necesario
    }
}

export default function CircularGallery({ items, bend = 1.5 }) {
    const ref = useRef();

    useEffect(() => {
        let app;
        // Esperamos a que el layout se asiente
        const timeout = setTimeout(() => {
            app = new App(ref.current, { items, bend });
        }, 100);

        return () => {
            clearTimeout(timeout);
            if (app) app.destroy();
        };
    }, [items, bend]);

    return (
        <div className="gallery-wrapper" ref={ref}>

            <h1 className="titulo-overlay">
                Conocenos
            </h1>

        </div>
    );
}

