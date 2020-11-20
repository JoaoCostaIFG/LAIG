# LAIG 2020/2021

## Group T03-G05

| Name                        | Number    | E-Mail               |
| --------------------------- | --------- | -------------------- |
| Ana Inês Oliveira de Barros | 201806593 | up201806593@fe.up.pt |
| João de Jesus Costa         | 201806560 | up201806560@fe.up.pt |

---

## Projects

### [TP1 - Scene Graph](TP1)

- Detailed scene.
- Uses at least one instance of all the primitives.
- Has multiple cameras, lights, materials and textures.
- Scene
  - A skybox with a colored Star War's X-Wing ship model and death star.
  - [Link to the Scene](./TP1/scenes/LAIG_TP1_XML_T3_G05_v01.xml)

---

### [TP2 - Animations](TP2)

- Detailed scene.
- Uses at least one instance of all the primitives (including the new ones).
- Has multiple cameras, lights, materials and textures.
- Scene:
  - A skybox with colored Star War's X-Wing and tie-fighter ship models and
    death star.
  - The word "Horse" (_spritetext_ primitive) with a running horse animation.
  - [Link to the Scene](./scenes/LAIG_TP1_XML_T3_G05_v01.xml)
- Animations:
  - The X-Wing performs a 'barrel roll' maneuver and shoots two projectiles
    three times.
  - The tie-fighter flies forward and is shot by the X-Wing, losing part of its
    right wing.
  - The death star spins.
  - The text floats around with the running horse animation.
- Extras :
  - Extra interface controls for better debugging: show/hide vertexes' normals
    and show/hide light objects.
  - Cameras reset to initial position upon switching between them.
  - Default texture that is applied when no texture is applied and one is requested.
  - Sprite sheets are bound to a different _uSampler_, which allows an object
    to show its texture on the transparent spots of the sprite. This helps simulate
    transparency by using the parents texture when **null** is used.

---

### [TP3 - ...](TP3)

- (items briefly describing main strong points)
